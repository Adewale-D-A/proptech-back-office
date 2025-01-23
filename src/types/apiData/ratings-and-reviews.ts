import { customersById } from "./customers";

export interface ratingsAndReviews {
  id: number;
  user: customersById;
  question: string;
  created_at: string;
  rating: number;
  comment: string;
}
