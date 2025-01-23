export interface dateGeneratorUtilResponse {
  currentMonth: boolean;
  date: Date;
  isoStringDate: string;
  month: number;
  day: number;
  weekday: string;
  selected: boolean;
  year: number;
  highlight: boolean;
  notAvailable: boolean;
  booked: boolean;
  blocked: boolean;
  maintenance: boolean;
}
