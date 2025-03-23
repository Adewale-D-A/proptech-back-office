import { customersById } from "./customers";

export interface ratingsAndReviews {
  id: number;
  booking_id: number;
  user_id: number;
  shortlet_id: number;
  rating: number;
  review: string;
  is_deleted: number;
  deleted_at: null;
  created_at: string;
  updated_at: string;
  question: null;
  user: customersById;
}
