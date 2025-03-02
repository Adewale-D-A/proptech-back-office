import { useLayoutEffect } from "react";
import BuildingIcon from "../../../assets/icons/building";
import { useAppDispatch } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import BlockedDatesReasonsIcon from "../../../assets/icons/blocked-dates-reasons";
import BlockedDatesReasonsListsTable from "../../../components/tables/block-dates-reasons";

const breadCrumb = [
  {
    url: "/apartments/view-all",
    label: "Apartments",
    icon: <BuildingIcon />,
  },
  {
    url: "#",
    label: "Block Dates Reasons",
    icon: <BlockedDatesReasonsIcon />,
  },
];
export default function BlockedDatesReasonListView() {
  const dispatch = useAppDispatch();
  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Block Dates Reasons",
        pageDescription: "Reason why dates are blocked",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);

  return (
    <div className="w-full">
      <BlockedDatesReasonsListsTable />
    </div>
  );
}
