import { useLayoutEffect } from "react";
import BuildingIcon from "../../../assets/icons/building";
import { useAppDispatch } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import SafetyAndSecurityList from "../../../components/tables/safetyAndSecurityLists";
import SecurityIcon from "../../../assets/icons/security";

const breadCrumb = [
  {
    url: "/apartments/view-all",
    label: "Apartments",
    icon: <BuildingIcon />,
  },
  {
    url: "#",
    label: "Safety and Security",
    icon: <SecurityIcon />,
  },
];
export default function SafetyAndSecurityListView() {
  const dispatch = useAppDispatch();
  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Safety and Security",
        pageDescription: "Apartments safety and security configuration",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);

  return (
    <div className="w-full">
      <SafetyAndSecurityList />
    </div>
  );
}
