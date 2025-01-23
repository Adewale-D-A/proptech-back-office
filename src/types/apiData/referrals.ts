import { customersById } from "./customers";

export interface referrals {
  id: number;
  user: customersById;
  referred_by: string;
  referral_date: string;
  created_at: number;
  status: string;
}
