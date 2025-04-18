export interface reformedApartmentCalendar {
  id: number;
  name: string;
  blocked: calendarDates[];
  booked: calendarDates[];
}

export interface calendarDates {
  date: string;
  reason: string;
  attribute: string;
  hex_code: string;
}
