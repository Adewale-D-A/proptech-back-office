import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { ReactNode, useCallback, useState } from "react";
import PlusIcon from "../../assets/icons/plus";
import ModalTemplate from "../modal";
import AddTax from "../tax/addTax";
import LoadingButton from "../button";
import { useAppDispatch } from "../../stores/hooks";
import { addTaxRateToList } from "../../stores/apiData/tax-rate-lists";
import AddNewPrices from "../inputs/plansAndPromotions/prices";
import AddNewCoupon from "../inputs/plansAndPromotions/coupons";
import LinkButton from "../button/linkButton";
import useAxios from "../../useHooks/useAxios";
import { openSnackbar } from "../../stores/appFunctionality/snackbar";

export default function PlansAndPromotionsTab({
  header,
  content,
}: {
  header: { id: string | number; label: string; icon: ReactNode }[];
  content: { id: string | number; data: ReactNode }[];
}) {
  const axios = useAxios();
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
        console.log({ result });
        dispatch(
          openSnackbar({
            message: "New Tax successfully added",
            isError: false,
          })
        );
        dispatch(
          addTaxRateToList({
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

  return (
    <>
      <TabGroup>
        <TabList className={"flex items-center gap-5 flex-col md:flex-row"}>
          <div className="w-full flex flex-col md:flex-row gap-5 md:gap-x-8 flex-wrap ">
            {header.map((item, index) => (
              <Tab
                key={item?.id}
                onClick={() => setTrackTab(index + 1)}
                className={
                  "flex items-center justify-center md:justify-start gap-2 md:gap-3 py-3 border-primary text-gray-400 focus:outline-none data-[selected]:text-primary data-[selected]:border-b-4 data-[hover]:border-b-4 data-[selected]:data-[hover]:border-b-4 data-[hover]:text-primary data-[focus]:outline-1 data-[focus]:outline-white"
                }
              >
                {item?.icon} {item?.label}
              </Tab>
            ))}
          </div>
          <div className="w-fit whitespace-nowrap">
            {trackTab === 1 ? (
              <LoadingButton
                type="button"
                isLoading={false}
                clickHandler={() => setOpenNewTax(true)}
                label="New Tax Rates"
                startIcon={<PlusIcon />}
              />
            ) : trackTab === 2 ? (
              <LoadingButton
                type="button"
                isLoading={false}
                clickHandler={() => setOpenNewPrice(true)}
                label="Add New Price"
                startIcon={<PlusIcon />}
              />
            ) : trackTab === 3 ? (
              <LoadingButton
                type="button"
                isLoading={false}
                clickHandler={() => setOpenNewCoupon(true)}
                label="Add New Coupon"
                startIcon={<PlusIcon />}
              />
            ) : (
              <LinkButton
                url="/plans-and-promotions/package-and-offer/add-new-package-and-offer"
                label="Add New Package & Offer"
                startIcon={<PlusIcon />}
              />
            )}
          </div>
        </TabList>
        <TabPanels>
          {content?.map((item) => (
            <TabPanel key={item?.id} className="my-5">
              {item.data}
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
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
      {/* new price */}
      <ModalTemplate
        open={openNewPrice}
        setOpen={setOpenNewPrice}
        showXicon={true}
        title="Add New Price"
        className=" max-w-md"
      >
        <AddNewPrices setOpen={setOpenNewPrice} />
      </ModalTemplate>
      {/* new coupon */}
      <ModalTemplate
        open={openNewCoupon}
        setOpen={setOpenNewCoupon}
        showXicon={true}
        title="Add New Coupon"
        className=" max-w-md"
      >
        <AddNewCoupon setOpen={setOpenNewPrice} />
      </ModalTemplate>
    </>
  );
}
