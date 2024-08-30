import { SyntheticEvent, useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "../../components/inputs/textInput";
import Password from "../../components/inputs/password";
import LoadingButton from "../../components/button";
// import useAxios from "../../hooks/useAxios";
import { useAppDispatch } from "../../stores/hooks";
import { updateAuthentication } from "../../stores/authUser/auth";
import { openSnackbar } from "../../stores/appFunctionality/snackbar";
import Logo from "../../components/logo";

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const axios = useAxios();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const Login = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
        // const response = await axios.post("/login", {
        //   email: email,
        //   password: password,
        // token: _token,
        // });
        // const { token } = response?.data;
        const token = "random-tokenizer";
        dispatch(
          updateAuthentication({ access_token: token, refresh_token: "" })
        );
        sessionStorage.setItem(`${process.env.REACT_APP_SESSION_KEY}`, token);
        navigate("/dashboard-overview");
      } catch (error: any) {
        const error_message = error?.response?.data?.message;
        dispatch(
          openSnackbar({
            message: error_message
              ? error_message
              : "Login failed, please try again later",
            isError: true,
          })
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [email, password]
  );

  return (
    <div className="w-full max-w-md flex flex-col gap-10">
      <div className=" flex flex-col gap-5">
        <div className="w-full">
          <h5 className=" font-extrabold text-lg md:text-2xl">Sign in</h5>
          <p className=" text-gray-500 w-full">
            Provide your email and password below
          </p>
        </div>
        <form
          onSubmit={Login}
          className="w-full flex flex-col gap-5 items-center"
        >
          <TextInput
            value={email}
            setValue={setEmail}
            inputType={"email"}
            label={"email"}
            isRequired={true}
            id={"email"}
            placeholder={"enter your email"}
          />
          <Password
            value={password}
            setValue={setPassword}
            label={"password"}
            isRequired={true}
            id={"password"}
            placeholder={"enter your password"}
          />
          <Link
            className="w-full text-end text-primary_green-500"
            to="/reset-password"
          >
            forgot password?
          </Link>
          <LoadingButton label="Login" isLoading={isSubmitting} type="submit" />
        </form>
      </div>
    </div>
  );
}

export default Login;
