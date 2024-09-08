import { useCallback, useEffect, useState } from "react";
import useAxios from "../useHooks/useAxios";
import { apartmentById } from "../types/apiData/apartment";
import tempAptData from "../assets/temp-api-mockup-data/apartments.json";
import { useAppDispatch } from "../stores/hooks";
import {
  updateApartmentDetails,
  updateApartmentFeatures,
  updateApartmentInfoId,
  updateApartmentPolicies,
} from "../stores/inAppDataInterations/addEditApartmentInfo";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetApartmentById(id?: string) {
  const axios = useAxios();
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [isFailed, setIsFailed] = useState(false);

  const [data, setData] = useState<apartmentById>({} as any);

  const getApartment = useCallback(async () => {
    setIsLoading(true);
    try {
      // const response = await axios.get(`/show_apartment/${id}`);
      // const responseData = response?.data?.data;
      // setData(responseData);
      const found = tempAptData.data.find((item) => item?.id === id);
      if (found) {
        const {
          name,
          roomOption,
          images,
          amount,
          location,
          aboutLocation,
          noBeds,
          noBaths,
          whatToExpect,
          pointOfInterest,
          safetyAndSecurity,
          availabilityStatus,
          rules,
          cancellationPolicies,
        } = found;
        setData(found);
        dispatch(updateApartmentInfoId({ id: id }));
        dispatch(
          updateApartmentDetails({
            name: name,
            roomOption: roomOption,
            images: images,
            amount: amount,
            location: location,
            aboutLocation: aboutLocation,
          })
        );
        dispatch(
          updateApartmentFeatures({
            noBeds,
            noBaths,
            whatToExpect,
            pointOfInterest,
            safetyAndSecurity,
            availabilityStatus,
          })
        );
        dispatch(updateApartmentPolicies({ rules, cancellationPolicies }));
      }
      setIsLoading(false);
    } catch (error) {
      //   console.log({ error });
      setIsFailed(true);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getApartment();
    }
  }, [id]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getApartment,
  };
}
