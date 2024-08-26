import { createSlice } from "@reduxjs/toolkit";
import { auth_user } from "../../types/auth_user/user_profile";

export const profile = createSlice({
  name: "user profile",
  initialState: {
    value: {
      status: false,
      data: {
        id: 0,
        role_id: "",
        name: "",
        email: "",
        phone_number: "",
        email_verified_at: "",
        created_at: "",
        updated_at: "",
        institution_id: "",
        institution: "",
        deleted_at: "",
        faculty: "",
        type: "",
        role: {
          id: "",
          name: "",
          deleted_at: "",
          created_at: "",
          updated_at: "",
          created_by: "",
          type: "",
          role_has_permissions: [],
        },
        permissions: [],
        approvals: [],
      } as auth_user,
    },
  },
  reducers: {
    updateProfile: (state, action) => {
      state.value.status = true;
      state.value.data = action?.payload;
    },
    clearProfile: (state) => {
      state.value.status = false;
      state.value.data = {
        id: 0,
        role_id: "",
        name: "",
        email: "",
        phone_number: "",
        email_verified_at: "",
        created_at: "",
        updated_at: "",
        institution_id: "",
        institution: "",
        deleted_at: "",
        faculty: "",
        type: "",
        role: {
          id: "",
          name: "",
          deleted_at: "",
          created_at: "",
          updated_at: "",
          created_by: "",
          type: "",
          role_has_permissions: [],
        },
        permissions: [],
        approvals: [],
      };
    },
  },
});

export const { updateProfile, clearProfile } = profile.actions;

export default profile.reducer;
