import { apartmentById } from "../apartment";
import { customersById } from "../customers";

export interface building {
  id: number;
  owner_id: number;
  name: string;
  slug: string;
  address: string;
  city: string;
  state: string;
  country: string;
  latitude: string;
  longitude: string;
  is_deleted: 0 | 1;
  deleted_at: string;
  created_at: string;
  updated_at: string;
  owner: customersById;
  shortlets: apartmentById[];
}
