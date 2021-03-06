export default class CalendarDate {
  public day: number;
  public month: number;
  public year: number;
  public isOutOfMonth = false;
  public isModalActive = false;
  constructor(public date: Date) {
    this.day = date.getDate();
    this.month = date.getMonth();
    this.year = date.getFullYear();
  }
  get isToday() {
    const current = new Date();
    return (
      this.day === current.getDate() &&
      this.month === current.getMonth() &&
      this.year === current.getFullYear()
    );
  }
}
