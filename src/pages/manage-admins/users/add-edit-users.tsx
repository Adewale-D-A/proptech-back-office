import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import useGetRoles from "../../../services-hooks/useGetRoles";
import TextInput from "../../../components/inputs/textInput";
import Select from "../../../components/inputs/select";
import LoadingButton from "../../../components/button";

interface props {
  isEdit: boolean;
  userInfo: {
    first_name: string;
    last_name: string;
    email: string;
    role_id: string;
  };
  submitHandler: Function;
}

export default function AddEditUser({
  isEdit,
  userInfo,
  submitHandler,
}: props) {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isFailed, setIsFailed, retryFunction } = useGetRoles(
    {
      page: currentPage,
    }
  );

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (userInfo?.first_name) {
      setFirstname(userInfo?.first_name);
      setLastname(userInfo?.last_name);
      setEmail(userInfo?.email);
      setRole(userInfo?.role_id);
    }
  }, [userInfo]);

  //submit user's form handler
  const submit = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
        await submitHandler({
          first_name: firstname,
          last_name: lastname,
          email: email,
          role_id: role,
        });
      } catch (error: any) {
      } finally {
        setIsSubmitting(false);
      }
    },
    [firstname, lastname, email, role]
  );

  return (
    <form onSubmit={submit}>
      <div className=" border-b pb-16">
        <div className=" my-10 ">
          <h4 className=" font-semibold text-2xl">USER DETAILS</h4>
          <p className=" text-sm text-gray-500">
            Fill in the user's information
          </p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            {
              id: "firstname",
              label: "First name",
              placeholder: "Enter first Name",
              type: "text",
              isRequired: true,
              value: firstname,
              setValue: setFirstname,
              isShow: true,
            },
            {
              id: "lastname",
              label: "Last name",
              placeholder: "Enter last name",
              type: "text",
              isRequired: true,
              value: lastname,
              setValue: setLastname,
              isShow: true,
            },
            {
              id: "email-address",
              label: "Email address",
              placeholder: "Enter email address",
              type: "email",
              isRequired: true,
              value: email,
              setValue: setEmail,
              isShow: true,
            },
          ].map((field) => (
            <TextInput
              inputType={field?.type}
              isRequired={true}
              value={field?.value}
              setValue={field?.setValue}
              id={field?.id}
              placeholder={field?.placeholder}
            />
          ))}
          <Select isRequired={true} value={role} setValue={setRole} id="type">
            <option value="" disabled>
              Select role
            </option>
            <option value="regular">Regular</option>
          </Select>
        </div>
      </div>
      <div className="flex justify-end my-16">
        <div className="flex flex-row text-center gap-5">
          <button
            type="button"
            // onClick={() => handleClose()}
            className="w-full p-2 px-10 text-lg font-semibold rounded-lg bg-white border-2 border-gray-300 hover:bg-primary_green-500 hover:text-white  transition-all"
          >
            Cancel
          </button>
          <LoadingButton
            label="Submit"
            type="submit"
            isLoading={isSubmitting}
          />
        </div>
      </div>
    </form>
  );
}
