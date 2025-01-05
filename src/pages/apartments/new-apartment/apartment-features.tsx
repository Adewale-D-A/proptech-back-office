import { useParams } from "react-router-dom";
import { useLayoutEffect, useMemo } from "react";
import BuildingIcon from "../../../assets/icons/building";
import { useAppDispatch } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import Timeline from "../../../components/timeline";
import AddApartmentFeatures from "../../../components/add-edit-apartment/apartment-features";

export default function AddNewApartmentFeatures() {
  const { id } = useParams();
  const breadCrumb = useMemo(
    () => [
      {
        url: "/apartments/view-all",
        label: "Apartments",
        icon: <BuildingIcon />,
      },
      {
        url: "#",
        label: "New Apartment Features",
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
        pageTitle: "Add New Apartment Features",
        pageDescription: "Add a new apartment features",
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
            <Timeline currentStep={2} id="apartment" />
          </div>
          <div className="w-full border-t py-10 px-5">
            <AddApartmentFeatures />
          </div>
        </div>
      </div>
    </section>
  );
}
