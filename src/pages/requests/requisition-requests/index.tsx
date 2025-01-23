import { useLayoutEffect } from "react";
import HeadsetIcon from "../../../assets/icons/headset";
import Starcon from "../../../assets/icons/star";
import { useAppDispatch } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import RatingsAndReviewsTable from "../../../components/tables/rating-and-reviews";
import RequisitionRequestTable from "../../../components/tables/requisition-request-table";

const breadCrumb = [
  {
    url: "#",
    label: "Requests",
    icon: <HeadsetIcon />,
  },
  {
    url: "#",
    label: "Requisition requests",
    icon: <Starcon />,
  },
];
export default function RequisitionRequests() {
  const dispatch = useAppDispatch();
  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Requisition requests",
        pageDescription: "Requisition requests",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);
  return (
    <div className=" w-full">
      <RequisitionRequestTable />
    </div>
  );
}
