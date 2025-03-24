import { customersById } from "./customers";

export interface requisitionRequest {
  id: number;
  admin_id: number;
  shortlet_id: number;
  category_id: number;
  maintenance_request_id: number;
  currency: string;
  amount: number;
  status: string;
  item: string;
  frequency: string;
  note: string;
  request_date: string;
  vendor_name: string;
  vendor_bank: string;
  account_name: string;
  account_number: string;
  invoice_file_path: string;
  date_paid: string;
  is_paid: 1 | 0;
  is_deleted: 0 | 0;
  deleted_at: string;
  created_at: string;
  updated_at: string;
  admin: {
    id: number;
    first_name: string;
    last_name: string;
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
    requisition_request_id: number;
    image: string;
    is_featured: number;
    is_deleted: number;
    deleted_at: string;
    created_at: string;
    updated_at: string;
  }[];
}

export interface requisitionRequestFormMain {
  admin_id: number;
  shortlet_id: number;
  category_id: number;
  request_date: string;
  amount: number;
  currency: string;
  item: string;
  frequency: string;
  note: string;
  images: {
    name: string;
    size: number;
    preview: string;
    id?: number;
    is_local?: boolean;
  }[];
}

export interface requisitionRequestFormSecondary {
  vendor_name: string;
  vendor_bank: string;
  account_name: string;
  account_number: string;

  is_paid?: "yes" | "no";
  invoice_file?: {
    name: string;
    size: number;
    preview: string;
    id?: number;
    is_local?: boolean;
  };
}
