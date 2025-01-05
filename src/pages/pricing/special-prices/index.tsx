import { useLayoutEffect } from "react";
import { useAppDispatch } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import ReceiptIcon from "../../../assets/icons/receipt";
import useAxios from "../../../useHooks/useAxios";
import SpecialPricesTable from "../../../components/tables/special-prices";
import LinkButton from "../../../components/button/linkButton";
import PlusIcon from "../../../assets/icons/plus";

const breadCrumb = [
  {
    url: "/pricing/overview",
    label: "Pricing",
    icon: <ReceiptIcon />,
  },
  {
    url: "#",
    label: "Special Prices",
    icon: "",
  },
];
export default function SpecialPricesViewAll() {
  const axios = useAxios();
  const dispatch = useAppDispatch();

  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Sepcial Prices",
        pageDescription: "Special prices",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);

  return (
    <div className=" w-full flex flex-col gap-4">
      <div className=" w-full flex justify-end">
        <div>
          <LinkButton
            url="/pricing/add-special-price"
            label="Add Special Pricing"
            startIcon={<PlusIcon />}
          />
        </div>
      </div>
      <SpecialPricesTable />
    </div>
  );
}
