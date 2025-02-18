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


export type maintenanceExpensesReport = {
  id: number;
  payment_date: string;
  apartment: number;
  shortlet_name: string;
  category: string;
  item: string;
  description_of_work: string;
  total_amount: string;
  status: string;
};

export type  bookingsReport= {
  id: number;
  customer_name: string;
  shortlet_name: string;
  amount: string;
  status: string;
  check_in_date: string;
  check_out_date: string;
};


export type  generatorRuntimeReport= {
  id: number;
  date: string;
  shortlet_name: string;
  time_on: string;
  time_off: string;
  run_time: string;
};