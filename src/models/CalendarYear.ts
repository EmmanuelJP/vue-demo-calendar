import CalendarMonth from "./CalendarMonth";
import Helpers from "@/core/helpers";
export default class CalendarYear {
  constructor(public year: number) {}

  get months(): CalendarMonth[] {
    let months = [];
    for (let index: number = 0; index < Helpers.months.length; index++) {
      let month = new CalendarMonth(index, this.year);
      months.push(month);
    }
    return months;
  }
}
