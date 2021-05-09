export default class CalendarReminder {
  public time: string | Date;

  constructor(
    public date: Date,
    public text?: string,
    public city?: string,
    public color: string = "#000000"
  ) {
    this.time = date;
  }
  public id?: string;

  public setId() {
    this.id = `${this.date.toString()}-${this.text}-${this.time}-${this.city}-${
      this.color
    }`;
  }
}
