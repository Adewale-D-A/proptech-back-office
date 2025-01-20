export interface reformedApartmentCalendar {
  name: string;
  blocked: {
    date: string;
    reason: string;
    attribute: string;
  }[];
  booked: {
    date: string;
    reason: string;
    attribute: string;
  }[];
}
