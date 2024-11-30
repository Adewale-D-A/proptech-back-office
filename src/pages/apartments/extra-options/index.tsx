import { useLayoutEffect } from "react";
import BuildingIcon from "../../../assets/icons/building";
import { useAppDispatch } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import ExtraOptionsIcon from "../../../assets/icons/extra-options";
import ExtraOptionTable from "../../../components/tables/extraOption";

const breadCrumb = [
  {
    url: "/apartments/view-all",
    label: "Apartments",
    icon: <BuildingIcon />,
  },
  {
    url: "#",
    label: "Extra Options",
    icon: <ExtraOptionsIcon />,
  },
];
export default function ExtraOptionsListView() {
  const dispatch = useAppDispatch();
  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Extra Options",
        pageDescription: "Apartments extra options configuration",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);

  return (
    <div className="w-full">
      <ExtraOptionTable />
    </div>
  );
}
