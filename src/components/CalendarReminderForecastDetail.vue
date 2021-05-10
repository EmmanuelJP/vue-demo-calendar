<template>
  <section>
    <div class="notification is-primary">
      <nav class="level mb-0">
        <div class="level-item has-text-centered">
          <figure class="image is-32x32">
            <img src="../assets/icons/cloud.svg" alt="cloudiness" />
          </figure>
          <span class="cloudiness__value">{{ model.clouds }}</span
          >&percnt;
        </div>
        <div class="level-item has-text-centered">
          <figure class="image is-32x32">
            <img src="../assets/icons/wind.svg" alt="wind speed" />
          </figure>
          <span class="wind__value">{{ model.wind_speed }}</span
          >m/s
        </div>
        <div class="level-item has-text-centered">
          <figure class="image is-32x32">
            <img src="../assets/icons/humidity.svg" alt="humidity" />
          </figure>
          <span class="humidity__value">{{ model.humidity }}</span
          >&percnt;
        </div>
      </nav>
      <div class="">
        <figure class="image weather-image margin-o-auto">
          <img
            v-if="isThunderstorm"
            src="../assets/icons/weather/thunderstorm.svg"
            :alt="model.weather[0].description"
          />
          <img
            v-else-if="isDrizzle || isRain"
            src="../assets/icons/weather/rain.svg"
            :alt="model.weather[0].description"
          />
          <img
            v-else-if="isSnow"
            src="../assets/icons/weather/snow.svg"
            :alt="model.weather[0].description"
          />
          <img
            v-else
            src="../assets/icons/weather/cloud.svg"
            :alt="model.weather[0].description"
          />
        </figure>
        <p class="subtitle">
          {{ model.weather[0].description }}
        </p>
        <p class="title is-7 has-text-left mb-0">Temperatures</p>
           <hr class="mb-2 mt-1">
        <div class="columns">
            <div class="column">
              <p class="title is-7">{{model.temp.morn| round}} &percnt;</p>
              <p class="subtitle is-7">Morning</p>
            </div>
            <div class="column">
              <p class="title is-7">{{model.temp.day| round}} &percnt;</p>
              <p class="subtitle is-7">Day</p>
            </div>
            <div class="column">
              <p class="title is-7">{{model.temp.eve| round}} &percnt;</p>
              <p class="subtitle is-7">Evening</p>
            </div>
            <div class="column">
              <p class="title is-7">{{model.temp.night | round}} &percnt;</p>
              <p class="subtitle is-7">Nigth</p>
            </div>
          </div>
           <p class="title is-7 has-text-left mb-0">Feels like</p>
           <hr class="mb-2 mt-1">
        <div class="columns">
            <div class="column">
              <p class="title is-7">{{model.feels_like.morn| round}} &percnt;</p>
              <p class="subtitle is-7">Morning</p>
            </div>
            <div class="column">
              <p class="title is-7">{{model.feels_like.day| round}} &percnt;</p>
              <p class="subtitle is-7">Day</p>
            </div>
            <div class="column">
              <p class="title is-7">{{model.feels_like.eve| round}} &percnt;</p>
              <p class="subtitle is-7">Evening</p>
            </div>
            <div class="column">
              <p class="title is-7">{{model.feels_like.night | round}} &percnt;</p>
              <p class="subtitle is-7">Nigth</p>
            </div>
          </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { IWeather } from "@/core/weather";
import { Daily, IWeatherForecast } from "@/core/weatherForecast";
import { Component, Vue, Prop } from "vue-property-decorator";
import CalendarReminderWeather from "./CalendarReminderWeather.vue";

@Component({
  components: {
    "calendar-reminder-weather": CalendarReminderWeather,
  },
})
export default class CalendarReminderForecastDetail extends Vue {
  @Prop() model!: Daily;

  get isThunderstorm() {
    const id = this.model.weather[0].id;
    return id > 199 && id < 233;
  }
  get isDrizzle() {
    const id = this.model.weather[0].id;
    return id > 299 && id < 322;
  }
  get isRain() {
    const id = this.model.weather[0].id;
    return id > 499 && id < 532;
  }
  get isSnow() {
    const id = this.model.weather[0].id;

    return id > 599 && id < 623;
  }
}
</script>

<style scoped>
</style>