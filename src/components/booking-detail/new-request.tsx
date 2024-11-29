import { SyntheticEvent, useCallback, useState } from "react";
import Select from "../inputs/select";
import LoadingButton from "../button";
import Search from "../inputs/search";
import TextAreaInput from "../inputs/textArea";
import TextInput from "../inputs/textInput";
import DateInput from "../inputs/dateInput";
import TimeInput from "../inputs/timeInput";
import { useAppDispatch } from "../../stores/hooks";
import { addAdditionalServicesToList } from "../../stores/apiData/additional-services-lists";
import { addRequestsToList } from "../../stores/apiData/requests-lists";
import { customersById } from "../../types/apiData/customers";
import { apartmentById } from "../../types/apiData/apartment";
import useAxios from "../../useHooks/useAxios";
import { openSnackbar } from "../../stores/appFunctionality/snackbar";

export default function NewRequest({
  setValue,
  isDateRestricted,
  componentId,
}: {
  setValue: Function;
  isDateRestricted?: boolean;
  componentId: "request" | "additional-services";
}) {
  const dispatch = useAppDispatch();
  const axios = useAxios();
  const [seletedCustomer, setSelectedCustomer] = useState<customersById>(
    {} as any
  );
  const [selectedApartment, setSelectedApartment] = useState<apartmentById>(
    {} as any
  );
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const addService = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      if (selectedApartment?.id && seletedCustomer?.id) {
        try {
          setIsAdding(true);
          if (componentId === "request") {
            const payload = {
              user_id: seletedCustomer?.id,
              shortlet_id: selectedApartment?.id,
              subject: type,
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
          }
          // if (componentId === "additional-services") {
          //   const payload = {
          //     user_id: seletedCustomer?.id,
          //     shortlet_id: selectedApartment?.id,
          //     subject: type,
          //     description: description,
          //   };
          //   const response = await axios.post(
          //     "/admin/additional-service",
          //     payload
          //   );
          //   const { data, messsage } = response?.data || {};
          //   dispatch(addRequestsToList(data));
          //   dispatch(
          //     openSnackbar({
          //       message: messsage || "User request created succefully",
          //       isError: false,
          //     })
          //   );
          // }
          setValue(false);
        } catch (error) {
        } finally {
          setIsAdding(false);
        }
      } else {
        dispatch(
          openSnackbar({
            message:
              "Please select an apartment and a user by using the search and select feature",
            isError: true,
          })
        );
      }
      // dispatch(
      //   addAdditionalServicesToList({
      //     id: "random-service",
      //     customerName: "new user",
      //     apartmentName: "new apartment",
      //     requestDate: `${date} ${time}`,
      //     serviceType: type,
      //     description: description,
      //     escalateStatus: "NO",
      //     status: "pending",
      //   })
      // );
    },
    [date, time, type, description, seletedCustomer, selectedApartment]
  );
  return (
    <form onSubmit={addService} className="w-full flex flex-col gap-3">
      <Search
        id="customers-search"
        placeholder="Search customer to assign to"
        setValue={setSelectedCustomer}
        componentId="customer"
      />
      <Search
        id="customers-apartment"
        placeholder="Search apartment"
        setValue={setSelectedApartment}
        componentId="apartment"
      />
      <Select
        isRequired={true}
        value={type}
        setValue={setType}
        id="request-type"
      >
        <option value="" disabled>
          Select Request Type
        </option>
        {/* <option value="internet">Internet</option> */}
        <option value="Dstv">DSTV</option>
      </Select>
      {isDateRestricted ? (
        <div className=" flex flex-col gap-3">
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-3">
            <DateInput
              inputType="date"
              isRequired={true}
              value={date}
              setValue={setDate}
              id="check-in-date"
              placeholder="Select Date"
              label="select-date"
            />
            <TimeInput
              inputType="time"
              isRequired={true}
              value={time}
              setValue={setTime}
              id="time"
              placeholder="Select Time"
              label="select-time"
            />
          </div>
          <TextInput
            id="message"
            placeholder="Type Message"
            value={description}
            setValue={setDescription}
            inputType="text"
          />
        </div>
      ) : (
        <TextAreaInput
          isRequired={true}
          value={description}
          setValue={setDescription}
          id="description"
          placeholder="Description"
        />
      )}
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
