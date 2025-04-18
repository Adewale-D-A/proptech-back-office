export type roles = {
  id: number;
  name: string;
  slug: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  permissions: {
    id: number;
    name: string;
    slug: string;
    identifier: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
    pivot: {
      role_id: number;
      permission_id: number;
    };
  }[];
};

export interface permissions {
  manage: boolean; //serve as selecting all for this usecase
  view: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
  export: boolean;
}

export type systemResources =
  | "admin-dashboard"
  | "admin"
  | "admin-email"
  | "user-chat"
  | "user"
  | "user-email"
  | "user-request"
  | "user-request-email"
  | "service-type"
  | "amenity"
  | "extra-option"
  | "rule"
  | "safety"
  | "shortlet"
  | "room-option"
  | "exchange-rate"
  | "view-calendar"
  | "calendar"
  | "calendar-update"
  | "role"
  | "tax"
  | "additional-service-email"
  | "additional-service"
  | "offer"
  | "coupon"
  | "rate-list"
  | "location-group"
  | "booking"
  | "booking-email"
  | "invoice"
  | "special-price"
  | "restriction"
  | "report-dashboard"
  | "revenue-report"
  | "occupancy-report"
  | "blocked-date"
  | "blocked-date-reason"
  | "maintenance-request-category"
  | "maintenance-request"
  | "requisition-request"
  | "building"
  | "referral"
  | "rating"
  | "management-fee"
  | "expense-category"
  | "owner-report-entry"
  | "cancelation-policy";
