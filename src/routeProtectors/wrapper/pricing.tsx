import { useCallback, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import MenuIcon from "../../assets/icons/menu";
import ChartIcon from "../../assets/icons/chart";
// import TagsIcon from "../../assets/icons/tags";
// import KeyIcon from "../../assets/icons/restrictions";
import NavTab from "../../components/tab/nav-tab";
import useGetResourceAccessChecker from "../../utils/admin/useAccessChecker";
import BuildingIcon from "../../assets/icons/building";
import PercentageBadgeIcon from "../../assets/icons/percentage-badge";
import GiftIcon from "../../assets/icons/gift";
import LoadingButton from "../../components/button";
import PlusIcon from "../../assets/icons/plus";
import useAxios from "../../useHooks/useAxios";
import { useAppDispatch } from "../../stores/hooks";
import { openSnackbar } from "../../stores/appFunctionality/snackbar";
import { replaceTaxRateInList } from "../../stores/apiData/tax-rate-lists";
import LinkButton from "../../components/button/linkButton";
import ModalTemplate from "../../components/modal";
import AddTax from "../../components/tax/addTax";
import AddNewCoupon from "../../components/inputs/plansAndPromotions/coupons";

export default function PricingTabWrapper() {
  const { data: rateList } = useGetResourceAccessChecker({
    resource: "rate-list",
  });
  // const { data: specialPricing } = useGetResourceAccessChecker({
  //   resource: "special-price",
  // });
  // const { data: restriction } = useGetResourceAccessChecker({
  //   resource: "restriction",
  // });
  const { data: tax } = useGetResourceAccessChecker({
    resource: "tax",
  });
  const { data: offer } = useGetResourceAccessChecker({
    resource: "offer",
  });
  const { data: coupon } = useGetResourceAccessChecker({
    resource: "coupon",
  });
  const tabList = [
    {
      id: 1,
      icon: <MenuIcon />,
      label: "Rate Overview",
      url: "/pricing/overview",
      hide: !rateList?.view,
    },
    {
      id: 2,
      icon: <ChartIcon />,
      label: "Rates Table",
      url: "/pricing/rate-table",
      hide: !rateList?.view,
    },
    {
      id: 3,
      icon: <BuildingIcon />,
      label: "Tax Rates",
      url: "/pricing/tax-rates",
      hide: !tax?.view,
    },
    {
      id: 4,
      icon: <PercentageBadgeIcon />,
      label: "Coupons",
      url: "/pricing/coupons",
      hide: !coupon?.view,
    },
    // {
    //   id: 5,
    //   icon: <GiftIcon />,
    //   label: "Package & Offers",
    //   url: "/pricing/packages-and-offers",
    //   hide: !offer?.view,
    // },
    // {
    //   id: 6,
    //   icon: <TagsIcon />,
    //   label: "Special Prices",
    //   url: "/pricing/special-prices",
    //   hide: !specialPricing?.view,
    // },
    // {
    //   id: 7,
    //   icon: <KeyIcon />,
    //   label: "Restriction",
    //   url: "/pricing/restrictions",
    //   hide: !restriction?.view,
    // },
  ];

  const location = useLocation();
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const [trackTab, setTrackTab] = useState(1);
  // tax rates
  const [openNewTax, setOpenNewTax] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // prices
  const [openNewPrice, setOpenNewPrice] = useState(false);
  //
  const [openNewCoupon, setOpenNewCoupon] = useState(false);
  // tax rates submission
  const addNewServiceTax = useCallback(
    async (item: {
      id: string;
      name: string;
      amount: string;
      isCompound: boolean;
      cap: string;
    }) => {
      setIsSubmitting(true);
      try {
        const response = await axios.post(`/admin/tax`, {
          name: item?.name,
          rate: Number(item?.amount),
        });
        const result = response?.data?.data;

        dispatch(
          openSnackbar({
            message: "Tax successfully updated",
            isError: false,
          })
        );
        dispatch(
          replaceTaxRateInList({
            id: result?.id,
            name: result?.name,
            rate: result?.rate,
            created_at: result?.created_at,
            breakdown: item?.cap,
          })
        );
      } catch (error) {
      } finally {
        setIsSubmitting(false);
      }
    },
    []
  );

  //   update current tab value based on the current URL
  useEffect(() => {
    const found = tabList?.find((item) => item?.url === location?.pathname);
    setTrackTab(found?.id || 1);
  }, [location]);
  return (
    <>
      <section className="w-full flex flex-col gap-5">
        <div className={"flex items-center gap-5 flex-col md:flex-row"}>
          <NavTab tabList={tabList} />
          <div className="w-fit whitespace-nowrap">
            {trackTab === 3 && tax?.create ? (
              <LoadingButton
                type="button"
                isLoading={false}
                clickHandler={() => setOpenNewTax(true)}
                label="Update Tax Rate"
                startIcon={<PlusIcon />}
              />
            ) : trackTab === 4 && coupon?.create ? (
              <LoadingButton
                type="button"
                isLoading={false}
                clickHandler={() => setOpenNewCoupon(true)}
                label="Add New Coupon"
                startIcon={<PlusIcon />}
              />
            ) : trackTab === 5 && offer?.create ? (
              <LinkButton
                url="/pricing/package-and-offer/add-new-package-and-offer"
                label="Add New Package & Offer"
                startIcon={<PlusIcon />}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
        <Outlet />
      </section>
      {/* tax rate */}
      <ModalTemplate
        open={openNewTax}
        setOpen={setOpenNewTax}
        showXicon={true}
        title="Add New Tax Rate"
        className=" max-w-md"
      >
        <AddTax
          setOpen={setOpenNewTax}
          submitHandler={addNewServiceTax}
          isSubmitting={isSubmitting}
          componentId="tax-rate"
        />
      </ModalTemplate>
      {/* new coupon */}
      <ModalTemplate
        open={openNewCoupon}
        setOpen={setOpenNewCoupon}
        showXicon={true}
        title="Add New Coupon"
        className=" max-w-md"
      >
        <AddNewCoupon setOpen={setOpenNewCoupon} />
      </ModalTemplate>
    </>
  );
}
