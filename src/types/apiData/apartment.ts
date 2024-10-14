export type apartment = {
  id: number;
  name: string;
  slug: string;
  description: string;
  location: string;
  currency: string;
  price: number;
  caution_fee: number;
  tax_fee: number;
  no_of_bedrooms: number;
  no_of_bathrooms: number;
  min_guests: string;
  max_guests: number;
  point_of_interest: string;
  cancellation_policy: string;
  availability_status: string;
  created_at: string;
  updated_at: string;
  room_option_id: number;
  bookings_count: number;
  last_booking_date: string;
  no_of_bookings: number;
};
export type apartmentLists = {
  id: string;
  image: string;
  name: string;
  location: string;
  noOfGuests: number;
  category: string;
  characteristics: string;
  units: number;
  availabilityStatus: "Available" | "Not Available";
}[];

export type apartmentById = {
  id: number;
  name: string;
  description: string;
  location: string;
  currency: string;
  price: number;
  caution_fee: number;
  tax_fee: number;
  no_of_bedrooms: number;
  no_of_bathrooms: number;
  max_guests: number;
  room_option: string;
  extra_option: string;
  safety_and_security: string;
  point_of_interest: string;
  cancellation_policy: string;
  availability_status: string;
  created_at: string;
  updated_at: string;
  amenities: {
    id: number;
    name: string;
    slug: string;
    description: string;
    image: string;
    ordering_position: number;
    created_at: string;
    updated_at: string;
    pivot: {
      shortlet_id: number;
      amenity_id: number;
    };
  }[];
  images: {
    id: number;
    shortlet_id: number;
    path: string;
    order: number;
    created_at: string;
    updated_at: string;
  }[];
  rules: {
    id: number;
    name: string;
    slug: string;
    ordering_position: number;
    created_at: string;
    updated_at: string;
    pivot: {
      shortlet_id: number;
      rule_id: number;
    };
  }[];
  room_options: {
    id: number;
    name: string;
    slug: string;
    description: string;
    created_at: string;
    updated_at: string;
    pivot: {
      shortlet_id: number;
      room_option_id: number;
    };
  }[];
  extra_options: {
    id: number;
    name: string;
    slug: string;
    description: string;
    created_at: string;
    updated_at: string;
    pivot: {
      shortlet_id: number;
      extra_option_id: number;
    };
  }[];
  safeties: {
    id: number;
    name: string;
    slug: string;
    description: string;
    image: string;
    created_at: string;
    updated_at: string;
    pivot: {
      shortlet_id: number;
      safety_id: number;
    };
  }[];
};
