import { useEffect, useLayoutEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import BuildingIcon from "../../../assets/icons/building";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import Timeline from "../../../components/timeline";
import AddApartmentDetails from "../../../components/add-edit-apartment/apartment-details";
import { clearAllApartmentInfo } from "../../../stores/inAppDataInterations/addEditApartmentInfo";

export default function AddNewApartmentDetails() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const storeAptDetails = useAppSelector(
    (state) => state.addEditApartmentInfo.value.data
  );
  const breadCrumb = useMemo(
    () => [
      {
        url: "/apartments",
        label: "Apartments",
        icon: <BuildingIcon />,
      },
      {
        url: "#",
        label: "New Apartment Details",
        icon: "",
      },
    ],
    [id]
  );

  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Add New Apartment Details",
        pageDescription: "Add a new apartment's details",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);

  useEffect(() => {
    if (!(storeAptDetails?.id === "updated")) {
      dispatch(clearAllApartmentInfo());
    }
  }, []);

  return (
    <section className="w-full flex flex-col items-center">
      <div className="w-full max-w-screen-xl flex flex-col gap-10">
        <div className=" w-full rounded-md border flex flex-col items-center justify-center">
          <div className=" w-full flex items-center max-w-xl py-10">
            <Timeline currentStep={1} id="apartment" />
          </div>
          <div className="w-full border-t py-10 px-5">
            <AddApartmentDetails />
          </div>
        </div>
      </div>
    </section>
  );
}
