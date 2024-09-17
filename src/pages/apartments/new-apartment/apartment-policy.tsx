import BuildingIcon from "../../../assets/icons/building";
import { useLayoutEffect, useMemo } from "react";
import { useAppDispatch } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import { useParams } from "react-router-dom";
import Timeline from "../../../components/timeline";
import AddApartmentPolicies from "../../../components/add-edit-apartment/apartment-policies";

export default function AddNewApartmentPolicies() {
  const { id } = useParams();
  const breadCrumb = useMemo(
    () => [
      {
        url: "/apartments",
        label: "Apartments",
        icon: <BuildingIcon />,
      },
      {
        url: "#",
        label: "New Apartment Policies",
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
        pageTitle: "Add New Apartment Policies",
        pageDescription: "Add a new apartment policies",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);
  return (
    <section className="w-full flex flex-col items-center">
      <div className="w-full max-w-screen-xl flex flex-col gap-10">
        <div className=" w-full rounded-md border flex flex-col items-center justify-center">
          <div className=" w-full flex items-center max-w-xl py-10">
            <Timeline currentStep={3} id="apartment" />
          </div>
          <div className="w-full border-t py-10 px-5">
            <AddApartmentPolicies />
          </div>
        </div>
      </div>
    </section>
  );
}
