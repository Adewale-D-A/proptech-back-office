import { SyntheticEvent, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingButton from "../../../components/button";
import SuccessPasswordChange from "./successPasswordChange";
import { useAppDispatch } from "../../../stores/hooks";
import { openSnackbar } from "../../../stores/appFunctionality/snackbar";
// import useAxios from "../../hooks/useAxios";
import Password from "../../../components/inputs/password";
import useAxios from "../../../useHooks/useAxios";

export default function ChangePassword() {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const { email, otp } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const changePassword = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      if (newPassword === confirmPassword) {
        setIsSubmitting(true);
        try {
          await axios.post("/auth/admin/reset-password", {
            token: otp,
            email: email,
            password: newPassword,
            password_confirmation: confirmPassword,
          });
          setOpenSuccess(true);
        } catch (error: any) {
          // const error_message = error?.response?.data?.message;
          // dispatch(
          //   openSnackbar({
          //     message: error_message ? error_message : "Password reset failed",
          //     isError: true,
          //   })
          // );
        } finally {
          setIsSubmitting(false);
        }
      } else {
        dispatch(
          openSnackbar({ message: "passwords do not match", isError: true })
        );
      }
    },
    [newPassword, confirmPassword, email, otp]
  );

  return (
    <>
      <div className="w-full max-w-md flex flex-col gap-10">
        {" "}
        <div className="w-full max-w-md flex flex-col items-center gap-5  px-5 md:px-10">
          <h1 className=" text-2xl text-primary text-center">
            Change Password
          </h1>
          <form
            onSubmit={changePassword}
            className="flex flex-col items-center gap-5  "
          >
            <Password
              value={newPassword}
              setValue={setNewPassword}
              label={"New password"}
              isRequired={true}
              id={"new-password"}
              placeholder={"Enter a new password"}
            />
            <Password
              value={confirmPassword}
              setValue={setConfirmPassword}
              label={"Confirm password"}
              isRequired={true}
              id={"confirm-password"}
              placeholder={"Confirm your password"}
            />
            <LoadingButton
              label={"Change password"}
              isLoading={isSubmitting}
              type="submit"
              disabled={false}
            />
          </form>
        </div>
      </div>
      <SuccessPasswordChange
        openModal={openSuccess}
        setOpenModal={setOpenSuccess}
      />
    </>
  );
}
