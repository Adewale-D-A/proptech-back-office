import { apartmentById } from "./apartment";
import { bookingsById } from "./bookings";
import { customersById } from "./customers";

export interface referrals {
  id: number;
  user_id: number;
  referred_user: customersById;
  referral_code: string;
  booking_id: number;
  shortlet_id: number;
  is_deleted: number;
  deleted_at: null;
  created_at: string;
  updated_at: string;
  user: customersById;
  booking: bookingsById;
  shortlet: apartmentById;
}
