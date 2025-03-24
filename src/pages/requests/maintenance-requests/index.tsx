import { useLayoutEffect } from "react";
import HeadsetIcon from "../../../assets/icons/headset";
import Starcon from "../../../assets/icons/star";
import { useAppDispatch } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import MaintenanceRequestTable from "../../../components/tables/maintenance-request-table";

const breadCrumb = [
  {
    url: "#",
    label: "Requests",
    icon: <HeadsetIcon />,
  },
  {
    url: "#",
    label: "Maintenance requests",
    icon: <Starcon />,
  },
];
export default function MaintenanceRequests() {
  const dispatch = useAppDispatch();
  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Maintenance requests",
        pageDescription: "Maintenance requests",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);
  return (
    <div className=" w-full">
      <MaintenanceRequestTable />
    </div>
  );
}
