import Helpers from "@/core/helpers";
import CalendarDay from "./CalendarDay";

export default class CalendarMonth {
  constructor(public month: number, public year: number) {}

  get name() {
    return Helpers.months[this.month];
  }
  get days(): CalendarDay[] {
    let days = [];
    let current = new Date(this.year, this.month, 1);
    while (current.getMonth() === this.month) {
      let date = new Date(
        current.getFullYear(),
        current.getMonth(),
        current.getDate(),
        0,
        0,
        0
      );
      let day = new CalendarDay(date);
      days.push(day);
      current.setDate(current.getDate() + 1);
    }
    return days;
  }
}
