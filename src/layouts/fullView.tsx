import { useCallback } from "react";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { toggleMenuView } from "../stores/appFunctionality/navMenuFunctions";
import NavigationMenuItems from "../assets/menuItem";
import LogoutIcon from "../assets/icons/logout";
import MenuIcon from "../assets/icons/menu";
import useAxios from "../useHooks/useAxios";
import NextArrowIcon from "../assets/icons/next-arrow";
import NavigatePrevIcon from "../assets/icons/navigate-prev";
import signOut from "../utils/auth/signOut";

//full view
function FullMenuView() {
  const dispatch = useAppDispatch();
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });

  //get side bar meny status from redux store
  const fullView = useAppSelector(
    (state) => state?.menuFunctions?.value?.fullMenuView
  );

  //toggle side bar menu using redux dispatcher
  const toggleMenu = useCallback(() => {
    dispatch(toggleMenuView());
  }, []);

  const logOut = useCallback(async () => {
    try {
      await axios.post("/auth/admin/logout");
      signOut();
    } catch (error) {
      // dispatch(openSnackbar({ message: "logout failed", isError: true }));
    }
  }, []);

  return (
    <div
      className={`flex h-screen overflow-y-auto bg-primary text-white flex-col justify-between gap-10 transition-all border-r border-gray-200 ${
        fullView ? "w-[260px]" : "hidden md:w-20 md:flex"
      }`}
    >
      {/* nav items section */}
      <div className=" flex flex-col gap-5">
        <div className="w-full justify-between md:justify-center flex items-center gap-2 p-2 md:p-5">
          <div className="flex items-center justify-center  gap-2 ">
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
              className=" block md:hidden"
            >
              <MenuIcon />
            </button>
          )}
        </div>
        <NavigationMenuItems />
      </div>
      {/* signout nav section */}
      <div>
        <button
          type="button"
          onClick={() => logOut()}
          title="logout"
          className={`w-full flex items-center ${
            fullView ? "" : " justify-center"
          } gap-4 p-2 md:p-3 transition-all hover:bg-white/15 hover:border-l-4 my-5`}
        >
          <LogoutIcon />
          {fullView && <span className=" ">Log Out</span>}
        </button>

        <div className="w-full flex justify-end">
          <button
            onClick={() => toggleMenu()}
            className=" p-3 transition-all hover:bg-white/15 hover:border-r-4"
          >
            {fullView ? (
              <NavigatePrevIcon className="w-6 h-6" />
            ) : (
              <NextArrowIcon />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FullMenuView;
