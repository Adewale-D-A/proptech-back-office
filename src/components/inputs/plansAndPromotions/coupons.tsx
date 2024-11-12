import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import TextInput from "../textInput";
import LoadingButton from "../../button";
import Select from "../select";
import { useAppDispatch } from "../../../stores/hooks";
import {
  addCouponsToList,
  replaceCouponsInList,
} from "../../../stores/apiData/coupons-lists";
import Search from "../search";
import DateInput from "../dateInput";
import useAxios from "../../../useHooks/useAxios";
import useGetCoupon from "../../../services-hooks/useGetCoupon";
import { openSnackbar } from "../../../stores/appFunctionality/snackbar";

export default function AddNewCoupon({
  setOpen,
  id,
}: {
  setOpen: Function;
  id?: string;
}) {
  const dispatch = useAppDispatch();
  const axios = useAxios();

  const { data, isLoading, isFailed, setIsFailed, retryFunction } =
    useGetCoupon({ id });

  const [code, setCode] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [apartmentApplicability, setApartmentApplicability] = useState("");
  const [assignedApartments, setAssignedApartments] = useState<
    { id: string; name: string }[]
  >([]);
  const [userApplicability, setUserApplicability] = useState("");
  const [assignCustomers, setAssignedCustomers] = useState<
    { id: string; name: string }[]
  >([]);
  const [type, setType] = useState("");
  const [validity, setValidity] = useState("");
  const [isReusable, setIsReusable] = useState("");
  const [price, setPrice] = useState("");
  const [percentage, setPercentage] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  // populate data authomatically
  useEffect(() => {
    if (id && data) {
      const {
        code,
        start_date,
        end_date,
        applicable_to_shortlet,
        applicable_to_user,
        type,
        validity,
        is_reusable,
        price,
        percentage,
        minimum_amount,
        maximum_amount,
      } = data;
      setCode(code);
      setStartDate(start_date);
      setEndDate(end_date);
      setApartmentApplicability(applicable_to_shortlet);
      setUserApplicability(applicable_to_user);
      setType(type);
      setValidity(validity);
      setIsReusable(is_reusable === 1 ? "yes" : "no");
      setPrice(String(price));
      setPercentage(String(percentage));
      setMinAmount(String(minimum_amount));
      setMaxAmount(String(maximum_amount));
    }
  }, [id, data]);

  const generateCouponCode = useCallback(async () => {
    const generatedCode = Math.random()
      .toString(36)
      .substring(2, 5 + 2)
      .toLocaleUpperCase();
    setCode(generatedCode);
  }, []);

  const createCoupon = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      let payload = {
        code: code,
        start_date: startDate,
        end_date: endDate,
        applicable_to_shortlet: apartmentApplicability, // all or specific
        applicable_to_user: userApplicability, // all or specific
        type: type, //percentage or price
        validity: validity, //temporary or permanent
        is_reusable: isReusable, // yes or no
        applicable_shortlets: assignedApartments?.map((item) => item?.id), // required if applicable_to_shortlet is specific
        applicable_users: assignCustomers?.map((item) => item?.id), //required if applicable_to_user is specific
        price: price, //required if type is price
        percentage: percentage, //required if type is percentage
        minimum_amount: minAmount,
        maximum_amount: maxAmount,
      };

      // conditionally filter payload based on the coupon parameters
      const newPayload = Object.fromEntries(
        Object.entries(payload).filter(([key]) =>
          (key === "applicable_shortlets" &&
            apartmentApplicability === "all") ||
          (key === "applicable_users" && userApplicability === "all") ||
          (key === "price" && type === "percentage") ||
          (key === "percentage" && type === "price")
            ? false
            : true
        )
      );

      try {
        let response;
        if (id) {
          response = await axios.put(`/admin/coupon/${id}`, newPayload);
          const dataset = response?.data?.data;
          dispatch(replaceCouponsInList(dataset));
        } else {
          response = await axios.post("/admin/coupon", newPayload);
          const dataset = response?.data?.data;
          dispatch(addCouponsToList(dataset));
        }
        setOpen(false);
        dispatch(
          openSnackbar({
            message: id
              ? "Coupon successfully updated"
              : "Coupon successfully created",
            isError: false,
          })
        );
      } catch (error) {
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      id,
      code,
      startDate,
      endDate,
      apartmentApplicability,
      assignedApartments,
      userApplicability,
      assignCustomers,
      type,
      validity,
      isReusable,
      price,
      percentage,
      minAmount,
      maxAmount,
    ]
  );

  return (
    <form className="w-full flex flex-col gap-5" onSubmit={createCoupon}>
      <div className=" w-full grid grid-cols-1 gap-5">
        <h5 className=" font-semibold">Add Details</h5>
        {/* coupon code */}
        <div className=" flex items-center gap-3">
          <TextInput
            inputType="text"
            isRequired={true}
            value={code}
            setValue={setCode}
            id="coupon-code"
            placeholder={"Enter Coupon Code"}
          />
          <div className=" w-fit ">
            <LoadingButton
              type="button"
              isLoading={false}
              label="Generate Code"
              clickHandler={generateCouponCode}
            />
          </div>
        </div>
        {/*  date */}
        <div className=" grid grid-cols-1  md:grid-cols-2 gap-3">
          <DateInput
            inputType="date"
            isRequired={true}
            value={startDate}
            setValue={setStartDate}
            id="start-date"
            placeholder="Start date"
            label="Start date"
          />
          <DateInput
            inputType="date"
            isRequired={true}
            value={endDate}
            setValue={setEndDate}
            id="end-date"
            placeholder="End date"
            label="End date"
          />
        </div>
        {/* apartment select */}
        <Select
          isRequired={true}
          value={apartmentApplicability}
          setValue={setApartmentApplicability}
          id="apartment-applicability"
        >
          <option value="" disabled>
            Apartment
          </option>
          <option value="all">All</option>
          <option value="specific">Specific</option>
        </Select>
        {apartmentApplicability === "specific" && (
          <Search
            componentId="apartment"
            placeholder="Assign to apartments"
            id="search-apartments"
            multipleSelect={true}
            updatelist={setAssignedApartments}
          />
        )}
        {/* user selection */}
        <Select
          isRequired={true}
          value={userApplicability}
          setValue={setUserApplicability}
          id="user-aplicability"
        >
          <option value="" disabled>
            User
          </option>
          <option value="all">All</option>
          <option value="specific">Specific</option>
        </Select>
        {userApplicability === "specific" && (
          <Search
            multipleSelect={true}
            componentId="customer"
            placeholder="Assign to customer"
            id="search-customer"
            updatelist={setAssignedCustomers}
          />
        )}
        <div className=" grid grid-cols-1  md:grid-cols-2 gap-3">
          {/* type */}
          <Select
            isRequired={true}
            value={type}
            setValue={setType}
            id="coupon-type"
          >
            <option value="" disabled>
              Select Coupon Type
            </option>
            <option value="price">Price</option>
            <option value="percentage">Percentage</option>
          </Select>
          {type === "price" && (
            <TextInput
              inputType="number"
              isRequired={true}
              value={price}
              setValue={setPrice}
              id="coupon-price"
              placeholder={"Enter price"}
            />
          )}
          {type === "percentage" && (
            <TextInput
              inputType="number"
              isRequired={true}
              value={percentage}
              setValue={setPercentage}
              id="coupon-percentage"
              placeholder={"Enter percentage"}
            />
          )}
        </div>

        {/* validity and reusability */}
        <div className=" grid grid-cols-1  md:grid-cols-2 gap-3">
          <Select
            isRequired={true}
            value={validity}
            setValue={setValidity}
            id="validity"
          >
            <option value="" disabled>
              Validity
            </option>
            <option value="temporary">Temporary</option>
            <option value="permanent">Permanent</option>
          </Select>
          <Select
            isRequired={true}
            value={isReusable}
            setValue={setIsReusable}
            id="is-reusable"
          >
            <option value="" disabled>
              Reusable
            </option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Select>
        </div>

        {/* max annd minimum amounts */}
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-5">
          <TextInput
            inputType="number"
            isRequired={false}
            value={minAmount}
            setValue={setMinAmount}
            id="minimum-amount"
            placeholder={"Minimum amount"}
          />

          <TextInput
            inputType="number"
            isRequired={false}
            value={maxAmount}
            setValue={setMaxAmount}
            id="maximum-amount"
            placeholder={"Maximum amount"}
          />
        </div>
      </div>
      <div className=" flex items-center gap-5 mt-10">
        <LoadingButton
          type="button"
          label="Cancel"
          variant={2}
          disabled={false}
          isLoading={false}
          clickHandler={() => setOpen(false)}
        />
        <LoadingButton
          type="submit"
          label={"Save Coupon"}
          disabled={false}
          isLoading={isSubmitting}
        />
      </div>
    </form>
  );
}
