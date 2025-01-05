import BuildingIcon from "../../../assets/icons/building";
import { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { useAppDispatch } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import { useNavigate, useParams } from "react-router-dom";
import Timeline from "../../../components/timeline";
import AddApartmentPolicies from "../../../components/add-edit-apartment/apartment-policies";
import { openSnackbar } from "../../../stores/appFunctionality/snackbar";
import { addApartmentToList } from "../../../stores/apiData/apartment-lists";
import { clearAllApartmentInfo } from "../../../stores/inAppDataInterations/addEditApartmentInfo";
import { requestPayload } from "../../../types/apiData/apartment/request-payload";
import useAxiosMultipart from "../../../useHooks/useAxiosMultipart";
const breadCrumb = [
  {
    url: "/apartments/view-all",
    label: "Apartments",
    icon: <BuildingIcon />,
  },
  {
    url: "#",
    label: "New Apartment Policies",
    icon: "",
  },
];
export default function AddNewApartmentPolicies() {
  const axios = useAxiosMultipart();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Add New Apartment Policies",
        pageDescription: "Add a new apartment policies",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = useCallback(async (payload: requestPayload) => {
    try {
      setIsSubmitting(true);
      const response = await axios.post(`/admin/shortlet`, payload);
      const { shortlet } = response?.data?.data;
      dispatch(
        openSnackbar({
          message: "Apartment informaton successfully created",
          isError: false,
        })
      );
      dispatch(addApartmentToList(shortlet));
      dispatch(clearAllApartmentInfo());
      navigate("/apartments/view-all");
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
            <AddApartmentPolicies
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
