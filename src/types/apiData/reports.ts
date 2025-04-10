import { apartment } from "./apartment";
import { locationGrouping } from "./apartment/locationGroupings";
import { requestCategories } from "./request-categories";

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

export type bookingsReport = {
  id: number;
  customer_name: string;
  shortlet_name: string;
  amount: string;
  status: string;
  check_in_date: string;
  check_out_date: string;
};

export type generatorRuntimeReport = {
  id: number;
  date: string;
  shortlet_name: string;
  time_on: string;
  time_off: string;
  run_time: string;
};

interface monthlies {
  jan: number;
  feb: number;
  mar: number;
  apr: number;
  may: number;
  jun: number;
  jul: number;
  aug: number;
  sep: number;
  oct: number;
  nov: number;
  dec: number;
}
export interface ownersReport {
  id: number;
  building_id: number;
  building: locationGrouping;
  shortlet_id: number;
  shortlet: apartment;
  expense_category_id: number;
  expense_category: requestCategories;
  amount: number;
  currency: string;
  date: string;
  note: string;
  monthly_amount: monthlies;
}
export interface ownerReportSummaries {
  monthly_totals: monthlies;
  monthly_revenue: monthlies;
  monthly_management_fee: monthlies;
  monthly_profit: monthlies;
}

export interface ownerReportSpreadsheetResponse {
  period: {
    start_date: string;
    end_date: string;
  };
  management_fee_percentage: number;
  monthly_breakdown: {
    month: string;
    revenue: number;
    management_fee: number;
    expenses: {
      category: string;
      amount: number;
    }[];
    total_expenses: number;
    profit: number;
  }[];
  totals: {
    total_revenue: number;
    total_management_fee: number;
    total_expenses: number;
    total_net_income: number;
  };
}

export interface ownerReportSpreadsheet {
  data: {
    expense_name: string;
    monthly_total_expenses: {
      month: number;
      total: number;
    }[];
  }[];
  monthlySummaries: {
    revenue: number;
    management_fee: number;
    total_expenses: number;
    profit: number;
  }[];
}
