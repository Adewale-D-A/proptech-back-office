import { customersById } from "./customers";

export interface referrals {
  id: number;
  user_id: number;
  referred_user: customersById;
  referral_code: string;
  is_deleted: number;
  deleted_at: null;
  created_at: string;
  updated_at: string;
  user: customersById;
}
