import { SyntheticEvent, useCallback, useState } from "react";
import Select from "../inputs/select";
import LoadingButton from "../button";
import Search from "../inputs/search";
import TextAreaInput from "../inputs/textArea";
import { useAppDispatch } from "../../stores/hooks";
import { addRequestsToList } from "../../stores/apiData/requests-lists";
import { customersById } from "../../types/apiData/customers";
import useAxios from "../../useHooks/useAxios";
import { openSnackbar } from "../../stores/appFunctionality/snackbar";
import useGetBookingsByUserId from "../../services-hooks/bookings/bookingsByUserId";
import TextInput from "../inputs/textInput";
import CustomersSingleSearch from "../inputs/search/customer-single-search";

export default function NewRequest({ setValue }: { setValue: Function }) {
  const dispatch = useAppDispatch();
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const [seletedCustomer, setSelectedCustomer] = useState<customersById>(
    {} as any
  );
  const [apartmentId, setApartmentId] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const { data: user_bookings } = useGetBookingsByUserId({
    id: String(seletedCustomer?.id || ""),
  });

  const addService = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      if (apartmentId && seletedCustomer?.id) {
        try {
          setIsAdding(true);
          const payload = {
            user_id: seletedCustomer?.id,
            shortlet_id: apartmentId,
            subject: subject,
            description: description,
          };
          const response = await axios.post("/admin/user-request", payload);
          const { data, messsage } = response?.data || {};
          dispatch(addRequestsToList(data));
          dispatch(
            openSnackbar({
              message: messsage || "User request created succefully",
              isError: false,
            })
          );
          setValue(false);
        } catch (error) {
        } finally {
          setIsAdding(false);
        }
      } else {
        dispatch(
          openSnackbar({
            message:
              "Please select a user by using the search and select feature",
            isError: true,
          })
        );
      }
    },
    [subject, description, apartmentId, seletedCustomer]
  );
  return (
    <form onSubmit={addService} className="w-full flex flex-col gap-3">
      <CustomersSingleSearch
        placeholder="Search customer to assign to"
        selected={seletedCustomer}
        setSelected={setSelectedCustomer}
      />
      <Select
        isRequired={true}
        value={apartmentId}
        setValue={setApartmentId}
        id="select-booking-apartment"
        label="Booking Apartment"
      >
        <option value="" disabled>
          Select applicable booking apartment
        </option>
        {user_bookings?.map((item) => (
          <option value={item?.shortlet_id}>{item?.shortlet?.name}</option>
        ))}
      </Select>
      <TextInput
        id="subject"
        placeholder="Subject"
        isRequired={true}
        value={subject}
        setValue={setSubject}
        inputType="text"
      />
      <TextAreaInput
        isRequired={true}
        value={description}
        setValue={setDescription}
        id="description"
        placeholder="Description"
      />
      <div className=" flex items-center gap-5 mt-10">
        <LoadingButton
          type="button"
          label="Cancel"
          variant={2}
          disabled={false}
          isLoading={false}
          clickHandler={() => setValue(false)}
        />

        <LoadingButton
          type="submit"
          label="Add Request"
          disabled={false}
          isLoading={isAdding}
        />
      </div>
    </form>
  );
}
