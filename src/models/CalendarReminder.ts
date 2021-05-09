export default class CalendarReminder {
  constructor(
    public date: Date,
    public text?: string,
    public time?: string,
    public city?: string,
    public color?: string
  ) {}
}
