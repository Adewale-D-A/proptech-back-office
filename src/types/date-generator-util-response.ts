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
  booked_reason: string;
  booked_hex_code: string;
  blocked: boolean;
  blocked_reason: string;
  blocked_hex_code: string;
  maintenance: boolean;
}
