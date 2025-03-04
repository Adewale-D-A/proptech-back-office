import { useNavigate } from "react-router-dom";
import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import TextInput from "../inputs/textInput";
import LoadingButton from "../button";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import LinkButton from "../button/linkButton";
import { updateCustomerSalesChannel } from "../../stores/inAppDataInterations/addEditCustomerInfo";
import Switch from "../switch";
import Select from "../inputs/select";
import useAxiosMultipart from "../../useHooks/useAxiosMultipart";
import { customerRequestPayload } from "../../types/apiData/customers/request-payload";
import purgeEmptyPayload from "../../utils/remove-empty-payload";

export default function AddEditCustomerSalesChannel({
  id,
  handleSubmit,
  isSubmitting,
}: {
  id?: string;
  handleSubmit: (payload: customerRequestPayload) => void;
  isSubmitting: boolean;
}) {
  const axios = useAxiosMultipart({
    disableSuccMssg: false,
    disableErrMssg: false,
  });
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

  // populate apartment details interface
  useEffect(() => {
    const {
      sales_channel,
      sales_channel_name,
      commission_per_booking,
      calculate_commission_on,
      apply_commission_on,
    } = storeCustomerDatast?.customerSalesChannel;
    setIsSalesChannel(sales_channel);
    setChannelName(sales_channel_name);
    setCommission(commission_per_booking);
    setCalculateCommission(calculate_commission_on);
    setApplyCommission(apply_commission_on);
  }, [storeCustomerDatast]);

  //update redux store and naviagte to next timeline
  const uploadCustomerInformation = useCallback(
    async (e: SyntheticEvent) => {
      // console.log("triggered");
      e.preventDefault();
      const { customerDetails, customerVerification, customerCompany } =
        storeCustomerDatast;
      const payload = {
        ...customerDetails,
        ...customerVerification,
        ...customerCompany,
        sales_channel: isSalesChannel ? "yes" : "no",
        sales_channel_name: channelName,
        commission_per_booking: commision,
        calculate_commission_on: calculateCommission,
        apply_commission_on: applyCommission,
      } as {
        [key: string]: any;
      };
      dispatch(
        updateCustomerSalesChannel({
          sales_channel: isSalesChannel,
          sales_channel_name: channelName,
          commission_per_booking: commision,
          calculate_commission_on: calculateCommission,
          apply_commission_on: applyCommission,
        })
      );
      try {
        const purgePayloadResult = purgeEmptyPayload({ payload });
        handleSubmit(purgePayloadResult);
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
            isRequired={false}
            value={channelName}
            setValue={setChannelName}
            id="first-name"
            placeholder=""
            label="Sales Channel Name*"
          />
          <TextInput
            inputType="text"
            isRequired={false}
            value={commision}
            setValue={setCommission}
            id="commission-per-booking"
            placeholder=""
            label="Commission per booking*"
          />
          <Select
            isRequired={false}
            value={calculateCommission}
            setValue={setCalculateCommission}
            id="calculate-commission"
            label="Calculate Commission on"
          >
            <option value="rate">rate</option>
            <option value="frequency">frequency</option>
          </Select>
          <Select
            isRequired={false}
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
                  ? `/customers/edit-customer/customer-company/${id}`
                  : "/customers/add-customer/customer-company"
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
