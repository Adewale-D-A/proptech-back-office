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
  slug: string;
  description: string;
  location: string;
  currency: string;
  price: number;
  caution_fee: number;
  tax_fee: number;
  no_of_bedrooms: number;
  no_of_bathrooms: number;
  min_guests: number;
  max_guests: number;
  point_of_interest: string;
  cancellation_policy: string;
  availability_status: string;
  is_deleted: number;
  deleted_at: string;
  created_at: string;
  updated_at: string;
  room_option_id: number;
  city: string;
  state: string;
  country: string;
  longitude: string;
  latitude: string;
  location_group_id: number;
  average_rating: number;
  amenities: {
    id: number;
    name: string;
    slug: string;
    description: string;
    image: string;
    ordering_position: number;
    is_deleted: 0 | 1;
    deleted_at: string;
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
    is_featured: number;
    ordering_position: number;
    is_deleted: 0 | 1;
    deleted_at: string;
    created_at: string;
    updated_at: string;
  }[];
  rules: {
    id: number;
    name: string;
    slug: string;
    ordering_position: number;
    is_deleted: 0 | 1;
    deleted_at: string;
    created_at: string;
    updated_at: string;
    pivot: {
      shortlet_id: number;
      rule_id: number;
    };
  }[];
  room_option: {
    id: number;
    name: string;
    number_of_rooms: number;
    slug: string;
    description: string;
    is_deleted: 0 | 1;
    deleted_at: string;
    created_at: string;
    updated_at: string;
  };
  extra_option_items: {
    id: number;
    extra_option_id: number;
    name: string;
    slug: string;
    description: string;
    ordering_position: number;
    is_deleted: 0 | 1;
    deleted_at: string;
    created_at: string;
    updated_at: string;
    pivot: {
      shortlet_id: number;
      extra_option_item_id: number;
    };
    extra_option: {
      id: number;
      name: string;
      slug: string;
      description: string;
      ordering_position: number;
      is_deleted: 0 | 1;
      deleted_at: null;
      created_at: string;
      updated_at: string;
    };
  }[];
  safeties: {
    id: number;
    name: string;
    slug: string;
    description: string;
    ordering_position: number;
    is_deleted: 0 | 1;
    deleted_at: string;
    created_at: string;
    updated_at: string;
    pivot: {
      shortlet_id: number;
      safety_id: number;
    };
  }[];
  location_group: {
    id: number;
    name: string;
    is_deleted: 0 | 1;
    deleted_at: string;
    deleted_by: string;
    created_at: string;
    updated_at: string;
  };
};
