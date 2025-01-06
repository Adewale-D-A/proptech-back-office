export type revenueReportList = {
  date: string;
  rooms_sold: number;
  nights_booked: string;
  nights_available: number;
  occupancy_rate: string;
  adr: number;
  revpar: number;
  ibe_revenue: number;
  ota_revenue: number;
  taxes: number;
  caution_fee: number;
};

export type dailyRoomReportList = {
  id: string;
  type: string;
  apartment: string;
  customer: string;
  guest: string;
  rate: string;
  meal: string;
  channel: string;
  checkIn: string;
};

export type occupancyTimeReportList = {
  date: string;
  shortlet_id: number;
  shortlet_name: string;
  occupancy_status: string;
  occupant_name: string;
  number_of_guests: string;
  check_in_date: string;
  check_out_date: string;
};
