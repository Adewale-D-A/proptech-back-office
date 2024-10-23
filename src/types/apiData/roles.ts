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
    guard_name: string;
    created_at: string;
    updated_at: string;
    pivot: {
      role_id: number;
      permission_id: number;
    };
  }[];
};
