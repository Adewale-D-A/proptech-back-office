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
  const axios = useAxios();
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
        created_at,
        updated_at,
        stripe_id,
        pm_type,
        pm_last_four,
        trial_ends_at,
        delete_reason,
        referral_code,
        referred_by,
      } = user;
      setData(user);
      dispatch(updateCustomerInfoId({ id: id }));
      dispatch(
        updateCustomerDetails({
          first_name,
          last_name,
          email,
          phone,
          profileImg: { name: "", size: 1000, preview: profile_photo },
          gender: gender || "Male",
          dob,
          country: "Nigeria",
          state: "***",
          city: "****",
          address: "***",
        })
      );
      dispatch(
        updateCustomerVerification({
          placeOfBirth: "***",
          idType: "***",
          idNumber: "****",
          idImage: "****",
          pinGenerated: "****",
          notes: "***",
        })
      );
      dispatch(
        updateCustomerCompany({
          companyName: "***",
          VATid: "***",
          companyEmail: "***",
          companyId: "***",
          companyCountry: "***",
          companyState: "***",
          companyCity: "***",
          companyAddress: "***",
        })
      );
      dispatch(
        updateCustomerSalesChannel({
          isSalesChannel: false,
          salesChannelName: "***",
          salesChannelCommision: "***",
          calculateCommissionOn: "***",
          applyCommissionOn: "***",
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
