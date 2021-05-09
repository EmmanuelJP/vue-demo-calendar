<template>
  <section>
    
  </section>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import CalendarDate from "@/models/CalendarDate";
import CalendarReminder from "@/models/CalendarReminder";
@Component
export default class CalendarReminderComponent extends Vue {
  @Prop() date!: CalendarDate;
 model = new CalendarReminder(this.date.date);
 
}
</script>

<style scoped>

</style>