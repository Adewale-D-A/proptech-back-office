import BuildingIcon from "../../../assets/icons/building";
import { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Timeline from "../../../components/timeline";
import AddEditApartmentPolicies from "../../../components/add-edit-apartment/apartment-policies";
import { openSnackbar } from "../../../stores/appFunctionality/snackbar";
import { replaceApartmentInList } from "../../../stores/apiData/apartment-lists";
import { requestPayload } from "../../../types/apiData/apartment/request-payload";
import useAxiosMultipart from "../../../useHooks/useAxiosMultipart";

export default function EditApartmentPolicies() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const axios = useAxiosMultipart({
    disableSuccMssg: false,
    disableErrMssg: false,
  });
  const { data: room_options_data } = useAppSelector(
    (state) => state.allRoomOptions.value
  );
  const { data: amenitiesOptions } = useAppSelector(
    (state) => state.allAmenities.value
  );

  const breadCrumb = useMemo(
    () => [
      {
        url: "/apartments/view-all",
        label: "Apartments",
        icon: <BuildingIcon />,
      },
      {
        url: `/apartments/apartment-details/${id}`,
        label: "Apartment Details",
        icon: "",
      },
      {
        url: "#",
        label: "Edit Apartment Policies",
        icon: "",
      },
    ],
    [id]
  );
  const dispatch = useAppDispatch();
  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Edit Apartment Policies",
        pageDescription: "Edit apartment policies",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, [breadCrumb]);
  const removedImageIdSet = useAppSelector(
    (state) => state.addEditApartmentInfo.value.data?.removeImages
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = useCallback(
    async (payload: requestPayload) => {
      const populatedPayload = {
        ...payload,
        images: payload?.images?.filter((item) => !item?.id) || [],
        remove_images: removedImageIdSet,
      } as {
        [key: string]: any;
      };
      const newPayload = Object.fromEntries(
        Object.entries(populatedPayload).filter(([key]) =>
          populatedPayload[key] === "" ||
          populatedPayload[key] === 0 ||
          populatedPayload[key]?.length === 0
            ? false
            : true
        )
      );
      try {
        setIsSubmitting(true);
        const response = await axios.post(`/admin/shortlet/${id}`, newPayload);
        const { shortlet } = response?.data?.data;
        dispatch(
          openSnackbar({
            message: "Apartment informaton successfully updated",
            isError: false,
          })
        );
        navigate(
          searchParams?.get("redirect") || `/apartments/apartment-details/${id}`
        );
        dispatch(
          replaceApartmentInList({
            ...shortlet,
            room_option: {
              name:
                room_options_data?.find(
                  (item) => String(item?.id) === String(payload?.room_option)
                )?.name || "",
            },
            amenities: amenitiesOptions?.filter(
              (item) => !payload?.amenities?.includes(String(item?.id))
            ) || [{ id: "", name: "" }],
          })
        );
      } catch (error) {
      } finally {
        setIsSubmitting(false);
      }
    },
    [removedImageIdSet, id]
  );

  return (
    <section className="w-full flex flex-col items-center">
      <div className="w-full max-w-screen-xl flex flex-col gap-10">
        <div className=" w-full rounded-md border flex flex-col items-center justify-center">
          <div className=" w-full flex items-center max-w-xl py-10">
            <Timeline currentStep={3} id="apartment" />
          </div>
          <div className="w-full border-t py-10 px-5">
            <AddEditApartmentPolicies
              id={id}
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
