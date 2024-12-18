import BuildingIcon from "../../../assets/icons/building";
import { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { useAppDispatch } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import { useParams } from "react-router-dom";
import Timeline from "../../../components/timeline";
import AddEditApartmentPolicies from "../../../components/add-edit-apartment/apartment-policies";
import { openSnackbar } from "../../../stores/appFunctionality/snackbar";
import { replaceApartmentInList } from "../../../stores/apiData/apartment-lists";
import { requestPayload } from "../../../types/apiData/apartment/request-payload";
import useAxiosMultipart from "../../../useHooks/useAxiosMultipart";

export default function EditApartmentPolicies() {
  const { id } = useParams();
  const axios = useAxiosMultipart();
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = useCallback(async (payload: requestPayload) => {
    try {
      setIsSubmitting(true);
      const response = await axios.put(`/admin/shortlet/${id}`, payload);
      const { shortlet } = response?.data?.data;
      dispatch(
        openSnackbar({
          message: "Apartment informaton successfully updated",
          isError: false,
        })
      );
      dispatch(replaceApartmentInList(shortlet));
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  }, []);

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
