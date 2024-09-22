export type revenueReportList = {
  id: string;
  date: string;
  roomSold: string;
  nightBook: string;
  totalBooking: string;
  occupancy: string;
  ibeRevenue: string;
  refunds: string;
  otaRevenue: string;
  adr: string;
  revipar: string;
  taxes: string;
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
  id: string;
  dateTime: string;
  apartment: string;
  status: string;
  customer: string;
  guest: string;
  checkIn: string;
  checkOut: string;
};
