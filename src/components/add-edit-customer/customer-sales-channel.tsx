import { useNavigate } from "react-router-dom";
import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import TextInput from "../inputs/textInput";
import LoadingButton from "../button";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import LinkButton from "../button/linkButton";
import {
  clearAllCustomerInfo,
  updateCustomerSalesChannel,
} from "../../stores/inAppDataInterations/addEditCustomerInfo";
import Switch from "../switch";
import Select from "../inputs/select";
import { openSnackbar } from "../../stores/appFunctionality/snackbar";
import {
  addCustomersToList,
  replaceCustomersInList,
} from "../../stores/apiData/customers-lists";

export default function AddEditCustomerSalesChannel({ id }: { id?: string }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const storeCustomerDatast = useAppSelector(
    (state) => state.addEditCustomerInfo.value.data
  );

  const [isSalesChannel, setIsSalesChannel] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [commision, setCommission] = useState("");
  const [calculateCommission, setCalculateCommission] = useState("");
  const [applyCommission, setApplyCommission] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  // populate apartment details interface
  useEffect(() => {
    const {
      isSalesChannel,
      salesChannelName,
      salesChannelCommision,
      calculateCommissionOn,
      applyCommissionOn,
    } = storeCustomerDatast?.customerSalesChannel;
    setIsSalesChannel(isSalesChannel);
    setChannelName(salesChannelName);
    setCommission(salesChannelCommision);
    setCalculateCommission(calculateCommissionOn);
    setApplyCommission(applyCommissionOn);
  }, [storeCustomerDatast]);

  //update redux store and naviagte to next timeline
  const uploadCustomerInformation = useCallback(
    (e: SyntheticEvent) => {
      console.log("triggered");
      e.preventDefault();
      setIsSubmitting(true);
      const { customerDetails, customerVerification, customerCompany } =
        storeCustomerDatast;
      const payload = {
        ...customerDetails,
        ...customerVerification,
        ...customerCompany,
        isSalesChannel,
        salesChannelName: channelName,
        salesChannelCommision: commision,
        calculateCommissionOn: calculateCommission,
        applyCommissionOn: applyCommission,
      };
      dispatch(
        updateCustomerSalesChannel({
          isSalesChannel,
          salesChannelName: channelName,
          salesChannelCommision: commision,
          calculateCommissionOn: calculateCommission,
          applyCommissionOn: applyCommission,
        })
      );
      try {
        if (id) {
          console.log({ payload });
          dispatch(
            openSnackbar({
              message: "Customer's informaton successfully updated",
              isError: false,
            })
          );
          dispatch(
            replaceCustomersInList({
              id: id,
              firstname: customerDetails?.firstname,
              lastname: customerDetails?.lastname,
              phoneNumber: customerDetails?.phoneNumber,
              country: customerDetails?.country,
              bookings: "nil",
            })
          );
        } else {
          dispatch(
            openSnackbar({
              message: "Customer informaton successfully created",
              isError: false,
            })
          );
          dispatch(
            addCustomersToList({
              id: "randomized",
              firstname: customerDetails?.firstname,
              lastname: customerDetails?.lastname,
              phoneNumber: customerDetails?.phoneNumber,
              country: customerDetails?.country,
              bookings: "nil",
            })
          );
        }
        dispatch(clearAllCustomerInfo());
        navigate(`/customers`);
      } catch (error) {}
    },
    [
      storeCustomerDatast,
      isSalesChannel,
      channelName,
      commision,
      calculateCommission,
      applyCommission,
      id,
    ]
  );

  return (
    <form
      className=" flex flex-col gap-5 items-center"
      onSubmit={uploadCustomerInformation}
    >
      <div className="w-full flex flex-col gap-5 max-w-screen-lg">
        <div className=" w-full grid grid-cols-1  gap-3 md:gap-5 items-end">
          <div className="w-full flex justify-between gap-3">
            <label htmlFor="is-sale-channel">Is a Sales Channel</label>
            <Switch
              id="is-sale-channel"
              value={isSalesChannel}
              setValue={setIsSalesChannel}
            />
          </div>
          <TextInput
            inputType="text"
            isRequired={true}
            value={channelName}
            setValue={setChannelName}
            id="first-name"
            placeholder=""
            label="Sales Channel Name*"
          />
          <TextInput
            inputType="text"
            isRequired={true}
            value={commision}
            setValue={setCommission}
            id="commission-per-booking"
            placeholder=""
            label="Commission per booking*"
          />
          <Select
            isRequired={true}
            value={calculateCommission}
            setValue={setCalculateCommission}
            id="calculate-commission"
            label="Calculate Commission on"
          >
            <option value="rate">rate</option>
            <option value="frequency">frequency</option>
          </Select>
          <Select
            isRequired={true}
            value={applyCommission}
            setValue={setApplyCommission}
            id="apply-commission-on"
            label="Apply Commission on"
          >
            <option value="rent">Rent</option>
            <option value="discount">Discount</option>
          </Select>
        </div>
      </div>

      {/* submit and cancel buttons */}
      <div className=" w-full flex justify-end mt-10">
        <div className=" flex items-center justify-between w-full max-w-sm gap-4">
          <div className=" w-fit">
            <LinkButton
              url={
                id
                  ? `/edit-customer/customer-company/${id}`
                  : "/add-customer/customer-company"
              }
              label="Back"
              variant={2}
            />
          </div>
          <LoadingButton
            label="Save and continue"
            type="submit"
            isLoading={isSubmitting}
          />
        </div>
      </div>
    </form>
  );
}
