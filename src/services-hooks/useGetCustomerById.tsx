import { useCallback, useEffect, useState } from "react";
import useAxios from "../useHooks/useAxios";
import { customersById } from "../types/apiData/customers";
import tempAptData from "../assets/temp-api-mockup-data/customers.json";
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
      // const response = await axios.get(`/show_apartment/${id}`);
      // const responseData = response?.data?.data;
      // setData(responseData);
      const found = tempAptData.data.find((item) => item?.id === id);
      if (found) {
        const {
          firstname,
          lastname,
          email,
          phoneNumber,
          profileImg,
          gender,
          dob,
          country,
          state,
          city,
          address,
          placeOfBirth,
          idType,
          idNumber,
          idImage,
          pinGenerated,
          notes,
          companyName,
          VATid,
          companyEmail,
          companyId,
          companyCountry,
          companyState,
          companyCity,
          companyAddress,
          isSalesChannel,
          salesChannelName,
          salesChannelCommision,
          calculateCommissionOn,
          applyCommissionOn,
        } = found;
        setData(found);
        dispatch(updateCustomerInfoId({ id: id }));
        dispatch(
          updateCustomerDetails({
            firstname,
            lastname,
            email,
            phoneNumber,
            profileImg: { name: "", size: 1000, preview: profileImg },
            gender,
            dob,
            country,
            state,
            city,
            address,
          })
        );
        dispatch(
          updateCustomerVerification({
            placeOfBirth,
            idType,
            idNumber,
            idImage,
            pinGenerated,
            notes,
          })
        );
        dispatch(
          updateCustomerCompany({
            companyName,
            VATid,
            companyEmail,
            companyId,
            companyCountry,
            companyState,
            companyCity,
            companyAddress,
          })
        );
        dispatch(
          updateCustomerSalesChannel({
            isSalesChannel,
            salesChannelName,
            salesChannelCommision,
            calculateCommissionOn,
            applyCommissionOn,
          })
        );
      }
      setIsLoading(false);
    } catch (error) {
      //   console.log({ error });
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
