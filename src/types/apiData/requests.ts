import { bookingsById } from "./bookings";
import { customersById } from "./customers";

export type requests = {
  id: number;
  user_id: number;
  shortlet_id: number;
  request_id: string;
  status: string;
  subject: string;
  description: string;
  is_escalated: number;
  escalation_reason: string;
  created_at: string;
  updated_at: string;
  shortlet: {
    id: number;
    name: string;
  };
  user: customersById;
  booking: bookingsById;
};
export type requestLists = {
  id: string;
  customerName: string;
  apartnmentName: string;
  date: string;
  type: string;
  description: string;
  isEscalated: string;
  status: string;
}[];

export type requestById = {
  id: string;
  customerName: string;
  apartnmentName: string;
  date: string;
  type: string;
  description: string;
  isEscalated: string;
  status: string;
};

export interface requestLogs {
  id: number;
  admin_id: number;
  maintenance_request_id: number;
  requisition_request_id: number;
  message: string;
  created_at: string;
  updated_at: string;
  admin: {
    id: number;
    first_name: string;
    last_name: string;
    department: string;
    profile_photo: string;
  };
}
