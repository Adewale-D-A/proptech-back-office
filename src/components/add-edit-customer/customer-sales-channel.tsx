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
import useAxiosMultipart from "../../useHooks/useAxiosMultipart";

export default function AddEditCustomerSalesChannel({ id }: { id?: string }) {
  const axios = useAxiosMultipart();
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
      setIsSubmitting(true);
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
        if (id) {
          const response = await axios.post(`/admin/user/${id}`, payload);
          const data = response?.data?.data;
          dispatch(
            openSnackbar({
              message: "Customer's information successfully updated",
              isError: false,
            })
          );
          dispatch(replaceCustomersInList(data));
        } else {
          const response = await axios.post(`/admin/user`, payload);
          const data = response?.data?.data;
          dispatch(
            openSnackbar({
              message: "Customer information successfully created",
              isError: false,
            })
          );
          dispatch(addCustomersToList(data));
        }
        dispatch(clearAllCustomerInfo());
        navigate(`/customers`);
      } catch (error) {
      } finally {
        setIsSubmitting(false);
      }
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
