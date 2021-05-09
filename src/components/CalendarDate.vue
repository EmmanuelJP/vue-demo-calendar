<template>
  <section>
    <div class="card-content">
      <b-button
        @click="selectDate"
        :class="{ 'has-text-grey-lighter': date.isOutOfMonth }"
        :type="date.isToday ? 'is-primary' : 'is-ghost'"
      >
        {{ date.day }}
      </b-button>
      <div class="mt-1">
        <div
          v-for="(reminder, key) in myReminders"
          class="tags mb-0 has-addons"
        >
          <b-tooltip
            v-if="reminder.text.length >= 12"
            multilined
            :delay="1000"
          >
            <template v-slot:content>
              <p class="has-text-breaked">
              {{ reminder.text }}
              </p>
            </template>
            <span class="tag is-size-7" :style="{ color: reminder.color }">
              {{ reminder.text | dots(12) }}
            </span>
          </b-tooltip>
          <span v-else class="tag is-size-7" :style="{ color: reminder.color }">
            {{ reminder.text }}
          </span>
          <a
            role="button"
            aria-label="Close tag"
            tabindex="0"
            class="tag is-delete"
            @click="removeReminder(reminder)"
          ></a>
        </div>
        <a
          v-show="myReminders.length > 1"
          class="is-size-7 has-text-danger"
          @click="confirmRemoveAllReminders"
          >Quit all</a
        >
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import CalendarDate from "@/models/CalendarDate";
import CalendarReminderComponent from "./CalendarReminder.vue";
import { mapState } from "vuex";
import CalendarReminder from "@/models/CalendarReminder";
import { DELETE_REMINDERS_ASYNC, DELETE_REMINDER_ASYNC } from "@/core/actions";
import moment from "moment";

@Component({
  components: { "calendar-reminder": CalendarReminderComponent },
  computed: mapState(["reminders"]),
})
export default class CalendarDateComponent extends Vue {
  @Prop() date!: CalendarDate;
  reminders!: CalendarReminder[];

  selectDate() {
    this.$emit("select", this.date);
  }

  get myReminders() {
    let reminders = this.reminders.filter(
      (x) =>
        new Date(x.date).toLocaleString() === this.date.date.toLocaleString()
    );
    var ordered = reminders.sort((x, y) => {
      return new Date(x.time).getTime() - new Date(y.time).getTime();
    });
    return ordered;
  }

  async removeReminder(reminder: CalendarReminder) {
    await this.$store.dispatch(DELETE_REMINDER_ASYNC, reminder);
    this.$buefy.toast.open({
      message: "Reminder removed",
      type: "is-success",
    });
  }
  confirmRemoveAllReminders() {
    this.$buefy.dialog.confirm({
      title: `Deleting reminders of ${moment(this.date.date).format("L")}`,
      message: `Are you sure you want to delete this <b>${this.myReminders.length}</b> reminders?`,
      confirmText: "Delete reminders",
      type: "is-danger",
      hasIcon: true,
      onConfirm: () => this.removeAllReminders(),
    });
  }
  async removeAllReminders() {
    await this.$store.dispatch(DELETE_REMINDERS_ASYNC, this.myReminders);
    this.$buefy.toast.open({
      message: "Reminders removed",
      type: "is-success",
    });
  }
}
</script>

<style scoped>
.has-text-breaked{
word-break: break-all;
}
.is-clickable {
  cursor: pointer;
}

[data-badge]::after {
  z-index: 30;
}
</style>