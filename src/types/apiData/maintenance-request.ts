

export interface maintenanceRequest {
  id: number;
 admin_id: number;
  shortlet_id: number;
  category_id: number;
  amount: number;
  currency: string;
  request_date: string;
  status: string;
  created_at: string;
  item:string;  
  frequency:string;
  note:string;
  close_reason:string;
  admin:{
    id:number;
    first_name:string;
    last_name:string;
    profile_photo:string;
  }
  category:{
    id:number;
    name:string;
  }
  shortlet:{
    id:number;
    name:string;
  }
}

export interface maintenanceRequestsById {
    id: number;
 admin_id: number;
  shortlet_id: number;
  category_id: number;
  amount: number;
  currency: string;
  request_date: string;
  status: string;
  created_at: string;
  item:string;  
  frequency:string;
  note:string;
  close_reason:string;
  admin:{
    id:number;
    first_name:string;
    last_name:string;
      profile_photo:string;
      email:string;
  }
  category:{
    id:number;
    name:string;
  }
  shortlet:{
    id:number;
    name:string;
  }
}
