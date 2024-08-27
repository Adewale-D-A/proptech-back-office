import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import TextInput from "../../components/textInput";
import LoadingButton from "../../components/button";
import OTPInput from "../../components/otpInput";
import { Link, useNavigate } from "react-router-dom";
// import useAxios from "../../hooks/useAxios";
import { useAppDispatch } from "../../stores/hooks";
import { openSnackbar } from "../../stores/appFunctionality/snackbar";
import Logo from "../../components/logo";

export default function ResetPassword() {
  // const axios = useAxios();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);

  const [email, setEmail] = useState("");
  const [otp, setOpt] = useState("");

  //countdown states
  const [seconds, setSeconds] = useState(0);
  const [isCountdownDone, setIsCountdownDone] = useState(true);

  //set countdown timer
  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setIsCountdownDone(true);
    }
  });

  const sendOtp = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      setIsSendingCode(true);
      try {
        // const response = await axios.post("/forgot-password", {
        //   email: email,
        // });
        // console.log({ response });

        setIsCodeSent(true);
        setIsCountdownDone(false);
        setSeconds(60);
      } catch (error: any) {
        const error_message = error?.response?.data?.message;
        dispatch(
          openSnackbar({
            message: error_message
              ? error_message
              : "Failed to send reset password link, please try again later",
            isError: true,
          })
        );
      } finally {
        setIsSendingCode(false);
      }
    },
    [email]
  );

  const verifyOtp = useCallback(
    (e: SyntheticEvent) => {
      try {
        setIsVerifyingCode(true);
        navigate(`/change-password/${email}/${otp}`);
      } catch (error) {
      } finally {
        setIsVerifyingCode(false);
      }
    },
    [otp, email]
  );

  return (
    <div className="w-full max-w-md flex flex-col gap-10">
      <div className="w-full max-w-md flex flex-col items-center gap-5  px-5 md:px-10">
        <h1 className=" text-2xl text-primary">Reset Password</h1>
        <form onSubmit={sendOtp} className="flex flex-col items-center gap-5  ">
          <TextInput
            value={email}
            setValue={setEmail}
            inputType={"email"}
            label={"Enter email:"}
            isRequired={true}
            id={"email"}
            placeholder={"Enter your registered email"}
          />
          <LoadingButton
            label={
              !isCodeSent
                ? "Reset"
                : isCountdownDone
                ? "Resend code"
                : `${seconds}`
            }
            isLoading={isSendingCode}
            type="submit"
            disabled={!isCountdownDone}
          />
        </form>
      </div>
      {isCodeSent && (
        <div className="w-full max-w-md flex flex-col gap-5  px-5 md:px-10 mt-10">
          <h4 className="">Enter OTP code:</h4>
          <form
            onSubmit={verifyOtp}
            className="w-full flex flex-col items-center gap-5"
          >
            <OTPInput setOtpCode={setOpt} />
            <LoadingButton
              label={"Verify code"}
              isLoading={isVerifyingCode}
              type="submit"
              disabled={false}
            />
          </form>
        </div>
      )}
    </div>
  );
}
