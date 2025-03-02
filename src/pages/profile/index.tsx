import { SyntheticEvent, useCallback, useLayoutEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import LoadingButton from "../../components/button";
import { openSnackbar } from "../../stores/appFunctionality/snackbar";
import { updatePageProperties } from "../../stores/appFunctionality/pageProperties";
import UserPlusIcon from "../../assets/icons/user-plus";
import useAxios from "../../useHooks/useAxios";
import TextInput from "../../components/inputs/textInput";
import Password from "../../components/inputs/password";

const breadCrumb = [
  {
    url: "#",
    label: "Profile",
    icon: <UserPlusIcon />,
  },
];

function Profile() {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userAuthentication.value);

  const [firstname, setFirstname] = useState(user?.first_name);
  const [lastname, setLastname] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Profile",
        pageDescription: "User Profile",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: null,
        retryRequest: null,
      })
    );
  }, []);

  const updateProfile = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      setIsUpdatingProfile(true);
      try {
        const response = await axios.post("/", {
          current_password: currentPassword,
          new_password: newPassword,
          new_password_confirmation: confirmNewPassword,
        });
        console.log({ response });
        dispatch(
          openSnackbar({
            message: "Profile Updated successfully",
            isError: false,
          })
        );
      } catch (error: any) {
        const message = error?.response?.data?.message;
        dispatch(
          openSnackbar({
            message: message ? message : "failed to update profile",
            isError: true,
          })
        );
      } finally {
        setIsUpdatingProfile(false);
      }
    },
    [newPassword, currentPassword, confirmNewPassword]
  );

  const changePassword = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      if (newPassword === confirmNewPassword) {
        setIsChangingPassword(true);
        try {
          const response = await axios.put("/admin/update-password", {
            current_password: currentPassword,
            new_password: newPassword,
            new_password_confirmation: confirmNewPassword,
          });
          console.log({ response });
          dispatch(
            openSnackbar({
              message: "Password changed successfully",
              isError: false,
            })
          );
        } catch (error: any) {
        } finally {
          setIsChangingPassword(false);
        }
      } else {
        dispatch(
          openSnackbar({ message: "passwords do not match", isError: true })
        );
      }
    },
    [newPassword, currentPassword, confirmNewPassword]
  );

  return (
    <main className="w-full flex justify-center">
      <div className="w-full max-w-screen-xl px-5 md:px-10">
        <div className="flex flex-col md:flex-row w-full gap-10 mt-10 border-b pb-10">
          <div className=" max-w-sm w-full">
            <h4 className=" font-semibold text-xl">Personal Info</h4>
            <p className=" text-gray-500">
              This will be displayed on your profile
            </p>
          </div>
          <form onSubmit={updateProfile}>
            <div className=" w-full flex flex-col gap-3">
              <div className="flex items-center justify-center w-20 h-20 aspect-square rounded-full overflow-hidden">
                <img
                  src="./logo512.png"
                  alt="avatar"
                  className="w-full h-auto"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
                <TextInput
                  id="firstname"
                  value={firstname}
                  setValue={setFirstname}
                  inputType="text"
                  label="First name"
                  placeholder="Joel"
                  isRequired={true}
                />
                <TextInput
                  id="lastname"
                  value={lastname}
                  setValue={setLastname}
                  inputType="text"
                  label="Last name"
                  placeholder="Bisola"
                  isRequired={true}
                />
              </div>
              {/* <div className="w-full max-w-md ">
                <Select
                  value={gender}
                  setValue={setGender}
                  label="Gender"
                  isRequired={true}
                  id="gender"
                >
                  {[
                    {
                      value: "Male",
                      label: "male",
                    },
                    {
                      value: "Female",
                      label: "female",
                    },
                  ].map((item) => (
                    <option key={item?.value} value={item?.value}>
                      {item?.label}
                    </option>
                  ))}
                </Select>
              </div> */}
              {/* <div className="w-full max-w-md">
                <TextInput
                  id="phone-number"
                  value={phoneNumber}
                  setValue={setPhoneNumber}
                  inputType="number"
                  label="Phone Number"
                  placeholder="090000000000"
                  isRequired={true}
                />
              </div> */}
            </div>
            <div className="w-full flex justify-end">
              <div className="w-fit">
                <LoadingButton
                  type="submit"
                  disabled={true}
                  isLoading={isUpdatingProfile}
                  label="Update profile"
                />
              </div>
            </div>
          </form>
        </div>

        {/* //update password  */}
        <form
          onSubmit={changePassword}
          className="w-full mt-10 flex flex-col gap-4"
        >
          <div className="flex flex-col md:flex-row w-full gap-10">
            <div className=" max-w-sm w-full">
              <h4 className=" font-semibold text-xl">Login Details</h4>
              <p className=" text-gray-500">Modify your password</p>
            </div>
            <div className=" w-full">
              <div className="w-full max-w-md flex flex-col gap-5">
                <Password
                  id="current-password"
                  value={currentPassword}
                  setValue={setCurrentPassword}
                  label="Current Password"
                  placeholder="Your current password"
                  isRequired={true}
                />

                <Password
                  id="new-password"
                  value={newPassword}
                  setValue={setNewPassword}
                  label="New Password"
                  placeholder="Your new password"
                  isRequired={true}
                />
                <Password
                  id="confirm-new-password"
                  value={confirmNewPassword}
                  setValue={setConfirmNewPassword}
                  label="Confirm New Password"
                  placeholder="Confirm password"
                  isRequired={true}
                />
              </div>
            </div>
          </div>
          <div className="w-full flex justify-end">
            <div className="w-fit">
              <LoadingButton
                type="submit"
                isLoading={isChangingPassword}
                label="Change password"
              />
            </div>
          </div>
        </form>
        {/* <div className=" flex w-full justify-end gap-4 mt-10">
            <button
              type="button"
              className="flex justify-center border-2 text-primary_green-500 shadow-md hover:border-primary_green-500 transition-all hover:border-2 text-center border-gray-300 rounded-lg p-3 font-bold"
            >
              <span>Cancel</span>
            </button>
            <button
              type="button"
              className="flex justify-center border-2 text-center border-gray-300 rounded-lg p-3 bg-primary_green-500 font-bold text-white hover:bg-primary_blue-500 cursor-pointer transition-all"
            >
              <span>Submit</span>
            </button>
          </div> */}
      </div>
    </main>
  );
}

export default Profile;
