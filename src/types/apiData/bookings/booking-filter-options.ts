export interface BookingFilterPayload {
  channel: string;
  currency: string;
  room_option: string;
  payment_method: string;
  status: string;
  user_verification?: string;
}
