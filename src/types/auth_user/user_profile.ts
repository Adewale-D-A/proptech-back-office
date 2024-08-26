export type auth_user = {
  id: number;
  role_id: string;
  name: string;
  email: string;
  phone_number: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
  institution_id: string;
  institution: string;
  deleted_at: string;
  faculty: string;
  type: string;
  role: {
    id: string;
    name: string;
    deleted_at: string;
    created_at: string;
    updated_at: string;
    created_by: string;
    type: string;
    role_has_permissions: {
      id: number;
      permission_id: string;
      role_id: string;
      created_at: string;
      updated_at: string;
      permission: {
        id: number;
        name: string;
        description: string;
        deleted_at: string;
        created_at: string;
        updated_at: string;
      };
    }[];
  };
  permissions: {
    sn: number;
    id: number;
    resource_name: string;
    permissions: {
      all: boolean;
      read: boolean;
      create: boolean;
      update: boolean;
      delete: boolean;
    };
  }[];
  approvals: {
    resource_name: string;
    permissions: { all: boolean; approve: boolean; decline: boolean };
  }[];
};
