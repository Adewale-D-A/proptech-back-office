import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import TextInput from "../../inputs/textInput";
import LoadingButton from "../../button";
import TextAreaInput from "../../inputs/textArea";
import useAxios from "../../../useHooks/useAxios";
import useGetServiceType from "../../../services-hooks/useGetServiceType";
import { useAppDispatch } from "../../../stores/hooks";
import {
  addServiceTypeToList,
  removeServiceTypeInList,
} from "../../../stores/apiData/service-types";
import { openSnackbar } from "../../../stores/appFunctionality/snackbar";

export default function AddEditServiceType({
  id,
  setOpen,
}: {
  id?: string;
  setOpen: (val: boolean) => void;
}) {
  const axios = useAxios();
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [isSubmitting, setIsSubmiting] = useState(false);

  const { data } = useGetServiceType({ id });

  // populate data with existing data if id is provided
  useEffect(() => {
    if (id && data?.name) {
      const { name, price, description } = data || {};
      setName(name || "");
      setPrice(price || "");
      setDescription(description || "");
    }
  }, [data]);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  const handleSubmit = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      setIsSubmiting(true);
      const payload = {
        name: name,
        price: price,
        description: description,
      };
      try {
        if (id) {
          const response = await axios.put("/admin/service-type", payload);
          const { data, message } = response?.data;
          dispatch(removeServiceTypeInList(data));
          dispatch(
            openSnackbar({
              message: message || "Service type successfully updated",
              isError: false,
            })
          );
        } else {
          const response = await axios.post("/admin/service-type", payload);
          console.log({ response });
          const { data, message } = response?.data;
          dispatch(addServiceTypeToList(data?.serviceType));
          dispatch(
            openSnackbar({
              message: message || "Service type successfully created",
              isError: false,
            })
          );
        }
        setOpen(false);
      } catch (error) {
      } finally {
        setIsSubmiting(false);
      }
    },
    [name, price, description, id]
  );

  return (
    <div className="w-full">
      <form className=" flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className=" w-full grid grid-cols-1 gap-5">
          <TextInput
            inputType="text"
            isRequired={true}
            value={name}
            setValue={setName}
            id="name"
            placeholder="Enter name"
          />
          <TextInput
            inputType="text"
            isRequired={true}
            value={price}
            setValue={setPrice}
            id="price"
            placeholder="Enter price"
          />
          <TextAreaInput
            isRequired={true}
            value={description}
            setValue={setDescription}
            id="description"
            placeholder="Description"
          />
        </div>
        <div className=" flex items-center gap-5">
          <LoadingButton
            type="button"
            label="Cancel"
            variant={2}
            disabled={false}
            isLoading={false}
            clickHandler={() => close()}
          />

          <LoadingButton
            type="submit"
            label={id ? "Save Changes" : "Create"}
            disabled={false}
            isLoading={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
}
