import { useLayoutEffect } from "react";
import { useAppDispatch } from "../../../../stores/hooks";
import { updatePageProperties } from "../../../../stores/appFunctionality/pageProperties";
import BlockedDatesReasonsIcon from "../../../../assets/icons/blocked-dates-reasons";
import HeadsetIcon from "../../../../assets/icons/headset";
// import RequestCategoriesistsTable from "../../../../components/tables/requests-categories";
// import ExpenseCategoriesistsTable from "../../../../components/tables/expense-categories";
import RequestCategoriesistsTable from "../../../../components/tables/requests-categories";

const breadCrumb = [
  {
    url: "#",
    label: "Expense",
    icon: <HeadsetIcon />,
  },
  {
    url: "#",
    label: "Expense categories",
    icon: <BlockedDatesReasonsIcon />,
  },
];
export default function ExpenseCategoriesListView() {
  const dispatch = useAppDispatch();
  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Expense Categories",
        pageDescription: "Categories of expense",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);

  return (
    <div className="w-full">
      {/* <ExpenseCategoriesistsTable /> */}
      <RequestCategoriesistsTable />
    </div>
  );
}
