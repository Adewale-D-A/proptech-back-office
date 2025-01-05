export type auth_user = {
  "id": number,
  "first_name": string,
  "last_name":string,
  "email": string,
  "role": {
    "id": number,
    "name": string,
    "slug": string,
    "guard_name": string,
    "created_at": string,
    "updated_at": string,
    "permissions": {
      "id": number,
      "name": string,
      "slug": string,
      "guard_name": string,
      "created_at": string,
      "updated_at": string,
      "pivot": {
        "role_id": number,
        "permission_id": number
      }
    } []  },
  "created_at": string,
  "updated_at": string,
  "role_id": number
};
