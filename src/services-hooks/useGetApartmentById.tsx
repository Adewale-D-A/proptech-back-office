import { useCallback, useEffect, useState } from "react";
import useAxios from "../useHooks/useAxios";
import { apartmentById } from "../types/apiData/apartment";
import { useAppDispatch } from "../stores/hooks";
import {
  clearAllApartmentInfo,
  updateApartmentDetails,
  updateApartmentFeatures,
  updateApartmentInfoId,
  updateApartmentPolicies,
} from "../stores/inAppDataInterations/addEditApartmentInfo";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetApartmentById(id?: string) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isFailed, setIsFailed] = useState(false);

  const [data, setData] = useState<apartmentById>({} as any);

  const getApartment = useCallback(async () => {
    setIsLoading(true);
    try {
      setIsLoading(true);
      const response = await axios.get(`/admin/shortlet/${id}`);
      const { shortlet } = response?.data?.data;
      const {
        name,
        description,
        location,
        location_group,
        currency,
        price,
        caution_fee,
        tax_fee,
        no_of_bedrooms,
        no_of_bathrooms,
        max_guests,
        room_option,
        extra_option_items,
        room_option_id,
        location_group_id,
        safety_and_security,
        point_of_interest,
        cancellation_policy,
        availability_status,
        amenities,
        images,
        rules,
        safeties,
        city,
        state,
        country,
        longitude,
        latitude,
      } = shortlet;
      dispatch(clearAllApartmentInfo());
      dispatch(updateApartmentInfoId({ id: id }));
      dispatch(
        updateApartmentDetails({
          name: name,
          roomOption: room_option_id,
          images: images?.map((item: { id: number; path: string }) => ({
            id: item.id,
            preview: item.path,
          })),
          amount: price,
          location_group: location_group_id,
          location: location,
          aboutLocation: description,
          city,
          state,
          country,
          longitude,
          latitude,
        })
      );
      dispatch(
        updateApartmentFeatures({
          noBeds: no_of_bedrooms,
          noBaths: no_of_bathrooms,
          whatToExpect: amenities?.map((item: { id: number }) =>
            String(item?.id)
          ),
          extraOptions: extra_option_items?.map((item: { id: number }) =>
            String(item?.id)
          ),
          pointOfInterest: point_of_interest,
          safetyAndSecurity: safeties?.map((item: { id: number }) =>
            String(item?.id)
          ),
          availabilityStatus: availability_status,
        })
      );
      dispatch(
        updateApartmentPolicies({
          rules: rules?.map((item: { id: number }) => String(item?.id)),
          cautionFee: caution_fee,
          maxGuest: max_guests,
          cancellationPolicies: cancellation_policy,
        })
      );
      setData(shortlet);
      setIsLoading(false);
    } catch (error) {
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
