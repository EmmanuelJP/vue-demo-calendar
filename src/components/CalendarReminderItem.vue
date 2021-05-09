<template>
  <div class="tags mb-0 has-addons">
    <b-tooltip v-if="reminder.text.length >= 12" multilined :delay="1000">
      <template v-slot:content>
        <p class="has-text-breaked">
          {{ reminder.text }}
        </p>
      </template>
      <span
        @click="editReminder(reminder)"
        class="tag has-cursor-pointer"
        :style="{ color: reminder.color }"
      >
        {{ reminder.text | dots(12) }}
      </span>
    </b-tooltip>
    <span
      v-else
      @click="editReminder(reminder)"
      class="tag has-cursor-pointer"
      :style="{ color: reminder.color }"
    >
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
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import CalendarReminder from "@/models/CalendarReminder";
import { DELETE_REMINDER_ASYNC } from "@/core/actions";

@Component
export default class CalendarReminderItem extends Vue {
  @Prop() reminder!: CalendarReminder;

  editReminder(reminder: CalendarReminder) {
    this.$emit("edit", reminder);
  }
  async removeReminder(reminder: CalendarReminder) {
    await this.$store.dispatch(DELETE_REMINDER_ASYNC, reminder);
    this.$buefy.toast.open({
      message: "Reminder removed",
      type: "is-success",
    });
  }
}
</script>

<style scoped>
</style>