import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import useAxiosMultipart from "../../useHooks/useAxiosMultipart";
import { useAppDispatch } from "../../stores/hooks";
import { openSnackbar } from "../../stores/appFunctionality/snackbar";
import countries from "../../assets/Countries.json";
import UserPlusIcon from "../../assets/icons/user-plus";
import TextInput from "../../components/inputs/textInput";
import DateInput from "../../components/inputs/dateInput";
import PhoneInput from "../../components/inputs/phoneInput";
import Select from "../../components/inputs/select";
import AddressAutocompleteInput from "../../components/inputs/addressAutocompleteInout";
import LoadingButton from "../../components/button";
import {
  addAdminsToList,
  replaceAdminsInList,
} from "../../stores/apiData/admins-list";
import useGetAdmin from "../../services-hooks/useGetAdmin";
import useGetRoles from "../../services-hooks/useGetRoles";
import purgeEmptyPayload from "../../utils/remove-empty-payload";
import FileInput from "../../components/inputs/fileInput";

export default function AddEditEmployee({
  id,
  setOpen,
}: {
  id?: string;
  setOpen: (open: boolean) => void;
}) {
  const axios = useAxiosMultipart({});
  const dispatch = useAppDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [countryCode, setCountryCode] = useState("+234+Nigeria");
  const [country, setCountry] = useState("");
  const [photo, setPhoto] = useState<{
    name: string;
    size: number;
    preview: string;
    id?: string;
  }>({} as any);

  const [loading, setLoading] = useState(false);

  const { data } = useGetAdmin({ id });
  const {
    data: roleData,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction,
  } = useGetRoles({
    page: 1,
  });

  //   populate field provided id is available denoting update functionality
  useEffect(() => {
    if (id && data?.id) {
      const toDate = new Date(data?.dob)?.toISOString()?.slice(0, 10);
      const toDateJoinDate = new Date(data?.join_date)
        ?.toISOString()
        ?.slice(0, 10);
      // setEmail(data?.user?.email || "");
      setFirstName(data?.first_name || "");
      setLastName(data?.last_name || "");
      setEmail(data?.email || "");
      setRole(String(data?.role_id || ""));
      setPhoneNumber(data?.phone || "");
      // setDepartment(data?.department || "");
      // setStatus(data?.status || "");
      setJoinDate(toDateJoinDate || "");
      setDob(toDate || "");
      setAddress(data?.address || "");
      setState(data?.state || "");
      setCountry(data?.country || "");
      setPhoto({
        preview: data?.profile_photo,
        id: id,
        name: data?.first_name,
        size: 0,
      });
      //   setDob(toDate || "");
    }
  }, [id, data]);

  const handleSubmit = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      setLoading(true);
      const payload = {
        first_name: firstName,
        last_name: lastName,
        email,
        role_id: role,
        phone: phoneNumber?.includes("+")
          ? phoneNumber
          : `+${countryCode?.split("+")[1]}${phoneNumber}`,
        department: department,
        status,
        join_date: joinDate,
        dob,
        address,
        state,
        country,
        profile_photo: photo?.id ? "" : photo,
      };
      const newPayload = purgeEmptyPayload({ payload });
      try {
        if (id) {
          const response = await axios.post(
            `/admin/admins/update/${id}`,
            newPayload
          );
          const { admin } = response?.data?.data;

          dispatch(replaceAdminsInList(admin));
          dispatch(
            openSnackbar({
              message: "Employee details successfully updated",
              isError: false,
            })
          );
        } else {
          const response = await axios.post("/admin/create", newPayload);
          // const { admin } = response?.data?.data;
          dispatch(addAdminsToList({ id: 1092, ...newPayload }));
          dispatch(
            openSnackbar({
              message: "Employee successfully added",
              isError: false,
            })
          );
        }
        setOpen(false);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    },
    [
      id,
      firstName,
      lastName,
      email,
      role,
      phoneNumber,
      department,
      status,
      joinDate,
      dob,
      address,
      state,
      country,
      photo,
      countryCode,
    ]
  );

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="w-full mb-6">
        <h2 className="uppercase text-[#98A2B3] font-bold text-sm mb-6">
          Personal details
        </h2>
        <div className="flex gap-7 items-center">
          <FileInput
            value={photo}
            setValue={setPhoto}
            label="Profile Image"
            isRequired={false}
            id="profile-image"
          />
          {/* <p className="font-medium text-sm text-[#344054]">Profile image</p>
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
              <UserPlusIcon />
            </div>
          </div> */}
        </div>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
        <TextInput
          id="first_name"
          placeholder="John"
          isRequired={true}
          value={firstName}
          setValue={setFirstName}
          inputType="text"
          label="First name"
        />
        <TextInput
          id="last_name"
          placeholder="Doe"
          isRequired={true}
          value={lastName}
          setValue={setLastName}
          inputType="text"
          label="Last name"
        />
        <TextInput
          id="email"
          placeholder="example@example.com"
          isRequired={true}
          value={email}
          setValue={setEmail}
          inputType="email"
          label="Email address"
          readonly={Boolean(id)}
        />
        <DateInput
          inputType="date"
          isRequired={false}
          value={dob}
          setValue={setDob}
          id="date-of-birth"
          placeholder="01/01/2001"
          label="Date of birth"
          staticLabel="Date of birth"
        />

        <PhoneInput
          isRequired={true}
          number={phoneNumber}
          setNumber={setPhoneNumber}
          coutryCode={countryCode}
          setCountryCode={setCountryCode}
          id="phone-number"
          label="Phone number"
        />
        <Select
          isRequired={false}
          value={country}
          setValue={setCountry}
          id="country"
          label="Country"
        >
          <option value="" disabled>
            Country
          </option>
          {countries.map((country) => (
            <option key={country.code} value={`${country?.name}`}>
              {`${country?.flag} - ${country?.name}`}
            </option>
          ))}
        </Select>

        <TextInput
          id="state"
          placeholder="Lagos"
          isRequired={true}
          value={state}
          setValue={setState}
          inputType="text"
          label="State"
        />
        <AddressAutocompleteInput
          label="Full Address"
          placeholder="Type address"
          value={address}
          setValue={setAddress}
        />
      </div>
      <div className="w-full pt-6">
        <h2 className="uppercase text-[#98A2B3] font-bold text-sm mb-6">
          Employee information
        </h2>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
          <DateInput
            inputType="date"
            isRequired={false}
            value={joinDate}
            setValue={setJoinDate}
            id="join-date"
            placeholder="01/01/2001"
            label=""
            staticLabel="Join date"
          />
          {/* <Select
            isRequired={true}
            value={shiftDays}
            setValue={setShiftDays}
            id="shift-days"
            label="Shift days"
          >
            <option value="" disabled></option>
          </Select>

          <Select
            isRequired={true}
            value={shiftHours}
            setValue={setShiftHours}
            id="shift-hours"
            label="Shift hours"
          >
            <option value="" disabled></option>
          </Select> */}
          {/* <Select
            isRequired={true}
            value={department}
            setValue={setDepartment}
            id="department"
            label="Department"
          >
            <option value="" disabled></option>
          </Select> */}

          <Select
            isRequired={true}
            value={role}
            setValue={setRole}
            id="employee-role"
            label="Employee Role"
          >
            <option value="" disabled>
              Select role
            </option>
            {roleData?.map((item) => (
              <option key={item?.id} value={`${item?.id}`}>
                {item?.name}
              </option>
            ))}
          </Select>
          {/* <Select
            isRequired={true}
            value={status}
            setValue={setStatus}
            id="status"
            label="Status"
          >
            <option value="" disabled></option>
          </Select> */}
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
            label={id ? "Update" : "Create"}
            disabled={false}
            isLoading={loading}
          />
        </div>
      </div>
    </form>
  );
}
