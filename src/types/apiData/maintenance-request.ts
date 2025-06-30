import { requestLogs } from "./requests";
import { roles } from "./roles";

export interface maintenanceRequest {
  id: number;
  admin_id: number;
  shortlet_id: number;
  category_id: number;
  amount: number;
  currency: string;
  request_date: string;
  status: string;
  created_at: string;
  item: string;
  frequency: string;
  note: string;
  close_reason: string;
  admin: {
    id: number;
    first_name: string;
    last_name: string;
    profile_photo: string;
  };
  category: {
    id: number;
    name: string;
  };
  shortlet: {
    id: number;
    name: string;
  };
}

export interface maintenanceRequestsById {
  id: number;
  admin_id: number;
  shortlet_id: number;
  category_id: number;
  amount: number;
  currency: string;
  request_date: string;
  status: string;
  created_at: string;
  item: string;
  frequency: string;
  note: string;
  close_reason: string;
  admin: {
    id: number;
    first_name: string;
    last_name: string;
    profile_photo: string;
    email: string;
    role: roles;
  };
  category: {
    id: number;
    name: string;
  };
  shortlet: {
    id: number;
    name: string;
  };
  images: {
    id: number;
    maintenance_request_id: number;
    image: string;
    is_featured: number;
    is_deleted: number;
    deleted_at: string;
    created_at: string;
    updated_at: string;
  }[];
  request_logs: requestLogs[];
}
