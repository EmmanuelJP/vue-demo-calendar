<template>
  <section style="min-width: 600px">
    <b-tabs v-model="activeTab" position="is-right" type="is-boxed" expanded>
      <b-tab-item :label="labelOne">
        <calendar-reminder-weather :model="weather" :loading="loading" />
      </b-tab-item>
      <b-tab-item :label="labelTwo">
        <calendar-reminder-forecast :model="forecast"  :loaded="loadedForecast"/>
      </b-tab-item>
    </b-tabs>
  </section>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import CalendarReminderWeather from "./CalendarReminderWeather.vue";
import CalendarReminderrForecast from "./CalendarReminderForecast.vue";
import {
  GET_CURRENT_WEATHER_ASYNC,
  GET_WEATHER_FORECAST_ASYNC,
} from "@/core/actions";
import CalendarReminder from "@/models/CalendarReminder";
import { Coord, IWeather } from "@/core/weather";
import { IWeatherForecast } from "@/core/weatherForecast";

@Component({
  components: {
    "calendar-reminder-weather": CalendarReminderWeather,
    "calendar-reminder-forecast": CalendarReminderrForecast,
  },
})
export default class CalendarReminderWeatherForecast extends Vue {
  @Prop() value!: CalendarReminder;
  activeTab = 0;
  labelOne = `Current weather in ${this.value.city}`;
  labelTwo = `Weather forecast in ${this.value.city} `;

  created() {
    this.getWeatherInfo();
  }
  loading = false;
  weather: IWeather | null = null;
  forecast: IWeatherForecast | null = null;
  async getWeatherInfo() {
    if (!this.value.city) {
      this.$buefy.toast.open({
        message: "Invalid city name",
        type: "is-danger",
      });
    }
    try {
      this.loading = true;
      const responde = await this.$store.dispatch(
        GET_CURRENT_WEATHER_ASYNC,
        this.value.city
      );
      this.weather = (await responde.json()) as IWeather;
      this.getForecastInfo(this.weather.coord);
    } catch (error) {
      this.weather = null;
    } finally {
      this.loading = false;
    }
  }

  loadedForecast = false;
  async getForecastInfo(coord: Coord) {
    try {
      const responde = await this.$store.dispatch(
        GET_WEATHER_FORECAST_ASYNC,
        coord
      );
      this.forecast = (await responde.json()) as IWeatherForecast;
    } catch (error) {
      console.log(error);
    } finally {
      this.loadedForecast = true;
    }
  }
}
</script>

<style scoped>
</style>