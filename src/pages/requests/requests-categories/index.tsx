import { useLayoutEffect } from "react";
import { useAppDispatch } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import BlockedDatesReasonsIcon from "../../../assets/icons/blocked-dates-reasons";
import BlockedDatesReasonsListsTable from "../../../components/tables/block-dates-reasons";
import HeadsetIcon from "../../../assets/icons/headset";
import RequestCategoriesistsTable from "../../../components/tables/requests-categories";

const breadCrumb = [
  {
    url: "#",
    label: "Requests",
    icon: <HeadsetIcon />,
  },
  {
    url: "#",
    label: "Requests categories",
    icon: <BlockedDatesReasonsIcon />,
  },
];
export default function RequestsCategoriesListView() {
  const dispatch = useAppDispatch();
  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Requests Categories",
        pageDescription: "Categories of requests",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);

  return (
    <div className="w-full">
      <RequestCategoriesistsTable />
    </div>
  );
}
