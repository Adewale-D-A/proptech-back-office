import { useCallback, useEffect, useState } from "react";
import useAxios from "../useHooks/useAxios";
import { customersById } from "../types/apiData/customers";
import { useAppDispatch } from "../stores/hooks";
import {
  updateCustomerCompany,
  updateCustomerDetails,
  updateCustomerInfoId,
  updateCustomerSalesChannel,
  updateCustomerVerification,
} from "../stores/inAppDataInterations/addEditCustomerInfo";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetCustomerById(id?: string) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [isFailed, setIsFailed] = useState(false);

  const [data, setData] = useState<customersById>({} as any);

  const getCustomer = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/admin/user/${id}`);
      const { user } = response?.data?.data;
      const {
        type,
        id: resp_id,
        first_name,
        last_name,
        email,
        phone,
        profile_photo,
        dob,
        gender,
        identity_verification_document,
        identity_verification_status,
        has_set_password,
        identity_verified,
        email_verified_at,
        is_deleted,
        deleted_at,
        created_at,
        updated_at,
        stripe_id,
        pm_type,
        pm_last_four,
        trial_ends_at,
        delete_reason,
        referral_code,
        referred_by,
        country,
        state,
        city,
        address,
        place_of_birth,
        id_type,
        id_number,
        notes,
        company_name,
        vat_id,
        company_email,
        company_id,
        company_country,
        company_state,
        company_city,
        company_address,
        is_sales_channel,
        sales_channel_name,
        commission_per_booking,
        calculate_commission_on,
        apply_commission_on,
        total_bookings,
      } = user;
      setData(user);
      dispatch(updateCustomerInfoId({ id: id }));
      dispatch(
        updateCustomerDetails({
          type,
          first_name,
          last_name,
          email,
          phone,
          profile_photo: { id: 1000, preview: profile_photo },
          gender: gender || "Male",
          dob: new Date(dob)?.toISOString()?.slice(0, 10),
          country: country,
          state: state,
          city: city,
          address: address,
        })
      );
      dispatch(
        updateCustomerVerification({
          place_of_birth: place_of_birth,
          id_type: id_type,
          id_number: id_number,
          identity_document: {
            id: 1001,
            preview: identity_verification_document,
          },
          password: "",
          notes: notes,
        })
      );
      dispatch(
        updateCustomerCompany({
          company_name: company_name,
          vat_id: vat_id,
          company_email: company_email,
          company_id: company_id,
          company_country: company_country,
          company_state: company_state,
          company_city: company_city,
          company_address: company_address,
        })
      );
      dispatch(
        updateCustomerSalesChannel({
          sales_channel: is_sales_channel || false,
          sales_channel_name: sales_channel_name,
          commission_per_booking: commission_per_booking,
          calculate_commission_on: calculate_commission_on,
          apply_commission_on: apply_commission_on,
        })
      );

      setIsLoading(false);
    } catch (error) {
      setIsFailed(true);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getCustomer();
    }
  }, [id]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getCustomer,
  };
}
