import BuildingIcon from "../../../assets/icons/building";
import { useLayoutEffect } from "react";
import { useAppDispatch } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
const breadCrumb = [
  {
    url: "/apartments",
    label: "Apartments",
    icon: <BuildingIcon />,
  },
  {
    url: "#",
    label: "Add New Apartment",
    icon: "",
  },
];

export default function NewApartment() {
  const dispatch = useAppDispatch();

  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Add New Apartment",
        pageDescription: "Add new apartment",
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
        <h1> New Apartment</h1>
      </div>
    </section>
  );
}
