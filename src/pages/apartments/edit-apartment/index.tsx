import BuildingIcon from "../../../assets/icons/building";
import { useLayoutEffect, useMemo } from "react";
import { useAppDispatch } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import { useParams } from "react-router-dom";
import Timeline from "../../../components/timeline";

export default function EditApartment() {
  const { id } = useParams();
  const breadCrumb = useMemo(
    () => [
      {
        url: "/apartments",
        label: "Apartments",
        icon: <BuildingIcon />,
      },
      {
        url: `/apartments-details/${id}`,
        label: "Apartment Details",
        icon: "",
      },
      {
        url: "#",
        label: "Edit Apartment",
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
        pageTitle: "Edit Apartment",
        pageDescription: "Edit apartment details",
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
        <div className=" w-full rounded-md border">
          <Timeline currentStep={3} />
        </div>
      </div>
    </section>
  );
}
