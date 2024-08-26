import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { toggleMenuView } from "../stores/appFunctionality/navMenuFunctions";
import { clearAuthentication } from "../stores/authUser/auth";
import { clearProfile } from "../stores/authUser/profile";
import { openSnackbar } from "../stores/appFunctionality/snackbar";
import NavigationMenuItems from "../assets/menuItem";

//full view
function FullMenuView() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  //get side bar meny status from redux store
  const fullView = useAppSelector(
    (state) => state?.menuFunctions?.value?.fullMenuView
  );
  const { data } = useAppSelector((state) => state.userProfile.value);

  //toggle side bar menu using redux dispatcher
  const toggleMenu = useCallback(() => {
    dispatch(toggleMenuView());
  }, []);

  const logOut = useCallback(async () => {
    try {
      dispatch(clearAuthentication());
      dispatch(clearProfile());
      window.location.href = "/";
      navigate("/");
    } catch (error) {
      dispatch(openSnackbar({ message: "logout failed", isError: true }));
    }
  }, []);

  return (
    <div
      className={`flex h-screen bg-primary-default text-white overflow-y-auto flex-col justify-between gap-10 p-2 md:p-5 transition-all border-r border-gray-200 ${
        fullView ? "w-[300px]" : "hidden md:w-24 md:flex"
      }`}
    >
      {/* nav items section */}
      <div className=" flex flex-col gap-5">
        <div className=" flex justify-between items-center mt-5">
          <div className="flex items-center gap-2">
            <Link
              to={"/dashboard"}
              className="flex items-center justify-center h-8 w-8 aspect-square rounded-full overflow-hidden"
            >
              <img src="/logo512.png" alt="avatar" className="w-full h-auto" />
            </Link>
            <div className={`text-center ${fullView ? "block" : "hidden"}`}>
              <h5 className=" font-extrabold text-xl">99Apartments</h5>
            </div>
          </div>
          {fullView && (
            <button
              type="button"
              title="toggle-bar"
              onClick={() => toggleMenu()}
              className=""
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className=" w-8 h-8 hover:text-primary_green-500 transition-all cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
                />
              </svg>
            </button>
          )}
        </div>
        <NavigationMenuItems />
      </div>
      {/* signout nav section */}
      <div className=" flex flex-col items-center gap-4">
        <div className=" flex items-center gap-3">
          <div className="flex items-center justify-center h-10 w-10 aspect-square rounded-full overflow-hidden">
            <img src="/logo512.png" alt="avatar" className="w-full h-auto" />
          </div>
          {fullView && (
            <div className=" ">
              <h6 className=" font-semibold">{data?.name}</h6>
              <p className=" text-gray-500">{data?.email}</p>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={() => logOut()}
          className={`w-full flex items-center justify-center text-red-500 p-3 border-2 ${
            fullView ? "border-red-500" : ""
          } gap-4 rounded-lg hover:text-primary_green-500 hover:border-primary_green-500 transition-all`}
        >
          {fullView && <span className=" ">Log out</span>}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-6 h-6"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
            />
            <path
              fillRule="evenodd"
              d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default FullMenuView;
