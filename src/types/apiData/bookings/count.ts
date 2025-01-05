export type bookingCount = {
  date: string;
  count: number;
}[];

export type visitorCount = {
  visitors_today: string;
  visitors_this_month: string;
  visitors_last_month: string;
  turnout: number;
};

export type bookingForecast = {
  total_bookings: number;
  nights_booked: number;
  nights_available: number;
  occupancy_rate: number;
};
