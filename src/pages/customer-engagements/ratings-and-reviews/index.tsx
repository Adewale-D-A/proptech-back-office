import { useLayoutEffect } from "react";
import HeadsetIcon from "../../../assets/icons/headset";
import Starcon from "../../../assets/icons/star";
import { useAppDispatch } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import RatingsAndReviewsTable from "../../../components/tables/rating-and-reviews";

const breadCrumb = [
  {
    url: "#",
    label: "Customer Engagements",
    icon: <HeadsetIcon />,
  },
  {
    url: "#",
    label: "Ratings and Reviews",
    icon: <Starcon />,
  },
];
export default function RatingsAndReviews() {
  const dispatch = useAppDispatch();
  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Ratings and Reviews",
        pageDescription: "Customers ratings and reviews",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);
  return (
    <div className=" w-full">
      <RatingsAndReviewsTable />
    </div>
  );
}
