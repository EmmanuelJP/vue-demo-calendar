<template>
  <section>
    <div class="card">
      <header class="modal-card-head">
        <p class="modal-card-title">Reminder details</p>
        <button type="button" class="delete" @click="$emit('close')" />
      </header>
      <section class="modal-card-body">
        <b-tabs v-model="activeTab">
          <b-tab-item label="Weather forecast">
            <calendar-reminder-weather-forecast
              :value="value"
            />
          </b-tab-item>
          <b-tab-item label="Edit">
            <calendar-reminder-edit
              :value="value"
              ref="edit"
              @saved="$emit('saved')"
              @close="$emit('close')"
            />
          </b-tab-item>
        </b-tabs>
      </section>
      <footer class="modal-card-foot">
        <b-button label="Close" @click="$emit('close')" />
        <b-button
          v-show="activeTab === 1"
          label="Save"
          type="is-primary"
          @click="valid"
        />
      </footer>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import CalendarReminder from "@/models/CalendarReminder";
import CalendarReminderEdit from "./CalendarReminderEdit.vue";
import CalendarReminderWeatherForecast from "./CalendarReminderWeatherForecast.vue";

@Component({
  components: {
    "calendar-reminder-edit": CalendarReminderEdit,
    "calendar-reminder-weather-forecast": CalendarReminderWeatherForecast,
  },
})
export default class CalendarReminderInfo extends Vue {
  @Prop() value!: CalendarReminder;
  activeTab = 0;
  
  valid() {
    const editComponent = this.$refs["edit"] as CalendarReminderEdit;
    editComponent.valid();
  }
  get city() {
    return this.value.city;
  }
}
</script>

<style scoped>
</style>