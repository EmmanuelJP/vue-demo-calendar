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
        <div v-for="(reminder, key) in myReminders">
          <calendar-reminder-item
            :reminder="reminder"
            @edit="(value) => $emit('edit', value)"
          />
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
import { mapState } from "vuex";
import CalendarReminder from "@/models/CalendarReminder";
import { DELETE_REMINDERS_ASYNC } from "@/core/actions";
import moment from "moment";
import CalendarReminderItem from "./CalendarReminderItem.vue";

@Component({
  components: { "calendar-reminder-item": CalendarReminderItem },
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

  async removeAllReminders() {
    await this.$store.dispatch(DELETE_REMINDERS_ASYNC, this.myReminders);
    this.$buefy.toast.open({
      message: "Reminders removed",
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
}
</script>

<style scoped>

[data-badge]::after {
  z-index: 30;
}
</style>