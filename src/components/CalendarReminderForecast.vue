<template>
  <section>
    <b-table
      v-if="loaded && model"
      :data="model.daily"
      paginated
      per-page="10"
      detailed
      detail-key="dt"
    >
      <b-table-column field="dt" label="Date" v-slot="props">
        {{ props.row.dt |unix | date }}
      </b-table-column>
      <b-table-column field="clouds" label="Clouds" v-slot="props">
        <span>{{ props.row.clouds | round }}</span
        >&percnt;
      </b-table-column>
      <b-table-column field="id" label="Min temp" v-slot="props">
        <span>{{ props.row.temp.min | round}}</span
        >&percnt;
      </b-table-column>
      <b-table-column field="id" label="Max temp" v-slot="props">
        <span>{{ props.row.temp.max | round}}</span
        >&percnt;
      </b-table-column>
      <template #detail="props">
        <calendar-reminder-forecast-detail :model="props.row"/> 
      </template>
    </b-table>
  </section>
</template>
<script lang="ts">
import { IWeather } from "@/core/weather";
import { Daily, IWeatherForecast } from "@/core/weatherForecast";
import { Component, Vue, Prop } from "vue-property-decorator";
import CalendarReminderForecastDetail from "./CalendarReminderForecastDetail.vue";

@Component({
  components: {
    "calendar-reminder-forecast-detail": CalendarReminderForecastDetail
  },
})
export default class CalendarReminderForecast extends Vue {
  @Prop() model!: IWeatherForecast;
  @Prop() loaded!: boolean;
}
</script>

<style scoped>
</style>