import { SyntheticEvent, useCallback, useEffect, useState } from "react";

import useAxios from "../../../useHooks/useAxios";
import { useAppDispatch } from "../../../stores/hooks";
import { openSnackbar } from "../../../stores/appFunctionality/snackbar";
import TextInput from "../../../components/inputs/textInput";
import LoadingButton from "../../../components/button";
import purgeEmptyPayload from "../../../utils/remove-empty-payload";
import {
  addBuildingToList,
  replaceBuildingInList,
} from "../../../stores/apiData/apartment/buildings";
import useGetBuilding from "../../../services-hooks/apartment/useGetBuilding";
import AddressAutocompleteInput from "../../../components/inputs/addressAutocompleteInout";

export default function AddEditBuildings({
  id,
  setOpen,
}: {
  id?: string;
  setOpen: (val: boolean) => void;
}) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [extraLocationDetails, setExtraLocationDetails] = useState<{
    city: string;
    state: string;
    country: string;
    longitude: number;
    latitude: number;
  }>({ city: "", state: "", country: "", longitude: 0, latitude: 0 } as any);

  const [isSubmitting, setIsSubmiting] = useState(false);

  const { data } = useGetBuilding({ id });

  // populate data with existing data if id is provided
  useEffect(() => {
    if (id && data?.name) {
      const { name, address } = data || {};
      setName(name || "");
      setAddress(address || "");
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
        name: name, //only field thats required
        address: address,
        city: extraLocationDetails?.city,
        state: extraLocationDetails?.state,
        country: extraLocationDetails?.country,
        latitude:
          extraLocationDetails?.latitude > 0
            ? String(extraLocationDetails?.latitude || "")
            : "",
        longitude:
          extraLocationDetails?.longitude > 0
            ? String(extraLocationDetails?.longitude || "")
            : "",
      };
      const newPayload = purgeEmptyPayload({ payload });
      try {
        if (id) {
          const response = await axios.put(`/admin/building/${id}`, newPayload);
          const { data, message } = response?.data;

          dispatch(replaceBuildingInList(data?.building));
          dispatch(
            openSnackbar({
              message: message || "Building successfully updated",
              isError: false,
            })
          );
        } else {
          const response = await axios.post("/admin/building", newPayload);
          const { data, message } = response?.data;
          dispatch(addBuildingToList(data?.building));
          dispatch(
            openSnackbar({
              message: message || "Building successfully created",
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
    [name, id, address, extraLocationDetails]
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
            id="blocked-dates-name"
            placeholder="Enter name"
          />

          <AddressAutocompleteInput
            setExtraDetails={setExtraLocationDetails}
            value={address}
            setValue={setAddress}
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
