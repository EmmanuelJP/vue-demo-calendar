<template>
  <section>
    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <b-field label="Selected date">
            <p class="subtitle is-5">{{ model.date | date }}</p>
          </b-field>
        </div>
      </div>
      <div class="level-item">
        <div class="has-text-centered">
          <p class="title is-1">
            {{ title }}
          </p>
          <a @click="setToday" class="subtitle has-text-primary">Today</a>
        </div>
      </div>
      <div class="level-right">
        <p class="level-item">
          <b-field label="Month">
            <b-select v-model="model.month" placeholder="Select a month">
              <option
                v-for="(item, key) in optionsMonths"
                :value="item"
                :key="key"
              >
                {{ item | month }}
              </option>
            </b-select>
          </b-field>
        </p>
        <p class="level-item">
          <b-field label="Year">
            <b-select v-model="model.year" placeholder="Select a ayer">
              <option
                v-for="(item, key) in optionsYears"
                :value="item"
                :key="key"
              >
                {{ item }}
              </option>
            </b-select>
          </b-field>
        </p>
      </div>
    </nav>
    <hr />
    <div class="card">
      <div class="columns seven-cols navbar is-primary is-gapless">
        <div class="column is-1" :key="key" v-for="(day, key) in weekDays">
          <p class="mt-3 has-text-white">{{ day }}</p>
        </div>
      </div>
      <div>
        <div class="columns is-multiline seven-cols is-gapless">
          <div
            :key="key"
            v-for="(date, key) in calendarDates"
            class="column is-1"
          >
            <calendar-date :date.sync="date" @select="onSelectDate" />
          </div>
        </div>
        <b-modal
          v-model="isModalActive"
          has-modal-card
          trap-focus
          :destroy-on-hide="true"
          aria-role="dialog"
          aria-label="Example Modal"
          aria-modal
        >
          <template #default="props">
            <calendar-reminder :date="model" @save="onSaveReminder" @close="onCloseReminder"/>
          </template>
        </b-modal>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Helpers from "@/core/helpers";
import CalendarYear from "@/models/CalendarYear";
import CalendarMonth from "@/models/CalendarMonth";
import CalendarDate from "@/models/CalendarDate";
import CalendarReminder from "@/models/CalendarReminder";
import CalendarDateComponent from "./CalendarDate.vue";
import CalendarReminderComponent from "./CalendarReminder.vue";
import { mapState } from "vuex";
@Component({
  components: {
    "calendar-date": CalendarDateComponent,
    "calendar-reminder": CalendarReminderComponent,
  },
  computed:mapState(['reminders'])
})
export default class Calendar extends Vue {
  @Prop() title!: string;

  optionsYears = Helpers.getOptionsYears();
  optionsMonths = Helpers.getOptionsMonths();
  weekDays = Helpers.days;
  isModalActive = false;
  model = new CalendarDate(new Date());
  reminders!:CalendarReminder[]
  setToday() {
    this.model = new CalendarDate(new Date());
  }
  get calendarYear() {
    return new CalendarYear(this.model.year);
  }

  get calendarMonth() {
    return new CalendarMonth(this.model.month, this.model.year);
  }

  get previousDates() {
    let dates = [];
    let firstDay = this.calendarMonth.days[0];
    for (let index = firstDay.weekDay; index > 0; index--) {
      let previousDate = new Date(firstDay.date);
      previousDate.setDate(firstDay.date.getDate() - index);
      let date = new CalendarDate(previousDate);
      date.isOutOfMonth = true;
      dates.push(date);
    }
    return dates;
  }
  get nextDates() {
    let dates = [];
    let lastDay = this.calendarMonth.days[this.calendarMonth.days.length - 1];
    let startDays = 7 - (lastDay.weekDay + 1);
    for (let i = 1; i <= startDays; i++) {
      var lastDate = new Date(lastDay.date);
      lastDate.setDate(lastDate.getDate() + i);
      let date = new CalendarDate(lastDate);
      date.isOutOfMonth = true;
      dates.push(date);
    }
    return dates;
  }
  get calendarDates() {
    let currentDates = this.calendarMonth.days.map(
      (x) => new CalendarDate(x.date)
    );
    return this.previousDates.concat(currentDates).concat(this.nextDates);
  }

  onSelectDate(item: CalendarDate) {
    this.model = item;
    this.isModalActive = true;
  }
  onCloseReminder(){
    this.isModalActive = false;
    this.model = new CalendarDate(new Date());
  }
  onSaveReminder(value: CalendarReminder) {
  }
}
</script>

<style scoped>
@media (min-width: 768px) {
  .seven-cols .is-1 {
    width: 100%;
    *width: 100%;
  }
}

@media (min-width: 992px) {
  .seven-cols .is-1 {
    width: 14.285714285714285714285714285714%;
    *width: 14.285714285714285714285714285714%;
  }
}

/**
 *  The following is not really needed in this case
 *  Only to demonstrate the usage of @media for large screens
 */
@media (min-width: 1200px) {
  .seven-cols .is-1 {
    width: 14.285714285714285714285714285714%;
    *width: 14.285714285714285714285714285714%;
  }
}
</style>