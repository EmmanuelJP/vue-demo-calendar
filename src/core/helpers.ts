import CalendarYear from "@/models/CalendarYear";

export default class Helpers {
  static days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  static months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  static getOptionsYears() {
    const year = new Date().getFullYear();
    const min = year - 100;
    const max = year + 20;

    let result: number[] = [];
    let count = min;
    while (count < max) {
      result.push(count);
      count++;
    }
    return result;
  }

  static getOptionsMonths() {
    let result: number[] = [];
    let count = 0;
    while (count < this.months.length) {
      result.push(count);
      count++;
    }
    return result;
  }
}
