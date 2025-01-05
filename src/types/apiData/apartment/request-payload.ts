export type requestPayload = {
  name: string;
  description: string;
  location: string;
  currency: string;
  price: string;
  caution_fee: string;
  tax_fee: string;
  no_of_bedrooms: string;
  no_of_bathrooms: string;
  max_guests: string;
  point_of_interest: string;
  cancellation_policy: string;
  availability_status: string;
  rules: string[];
  amenities: string[];
  room_option: string;
  safeties: string[];
  images: { preview: string; id?: number }[];
  extra_option_items: string[];
  location_group: string; //ID
  city: string;
  state: string;
  country: string;
  longitude: number;
  latitude: number;
};
