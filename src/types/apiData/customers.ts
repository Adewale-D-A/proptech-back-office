export type customers = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
  is_deleted: number;
  deleted_at: string;
};

export type customersists = {
  id: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  country: string;
  bookings: string;
}[];

export type customersById = {
		"id": number,
		"first_name": string,
		"last_name": string,
		"email": string,
		"phone": string,
		"profile_photo": string,
		"dob": string,
		"gender": string,
		"identity_verification_document": string,
		"identity_verification_status": string,
		"has_set_password": boolean,
		"identity_verified": string,
		"email_verified_at": string
		"is_deleted": number,
		"deleted_at": string,
		"created_at":string,
		"updated_at": string,
		"stripe_id": number,
		"pm_type": string,
		"pm_last_four": string,
		"trial_ends_at": string,
		"delete_reason": string,
		"referral_code":string,
		"referred_by": string,
		"country": string,
		"state": string,
		"city": string,
		"address": string,
		"place_of_birth": string,
		"id_type": string,
		"id_number": string,
		"notes": string,
		"company_name": string,
		"vat_id": string,
		"company_email": string,
		"company_id": string,
		"company_country": string,
		"company_state": string,
		"company_city": string,
		"company_address": string,
		"is_sales_channel": string,
		"sales_channel_name": string,
		"commission_per_booking": string,
		"calculate_commission_on": string,
		"apply_commission_on": string,
		"total_bookings": number
	}