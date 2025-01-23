import { customersById } from "./customers";

export interface requisitionRequest {
  id: number;
  user: customersById;
  shortlet: {
    id: number;
    name: string;
  };
  amount: number;
  currency: string;
  request_date: string;
  status: string;
  created_at: string;
}
