import CalendarYear from "@/models/CalendarYear";

export default class Helpers {
  static watherForecastApiId = "1b302e588e89f484b6c38907915b4b7f";
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

  static getCurrentWeatherApiUrl(city: string) {
    return `https://api.openweathermap.org/data/2.5/weather?q=${city}&cnt=1&APPID=${this.watherForecastApiId}&units=metric`;
  }
  static getWeatherForecastApiUrl(lat: number, lon: number) {
    return `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${this.watherForecastApiId}&units=metric`;
  }
}
