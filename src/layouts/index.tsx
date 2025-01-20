import React, { useCallback } from "react";

import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { toggleMenuView } from "../stores/appFunctionality/navMenuFunctions";
import { Link } from "react-router-dom";
import Loader from "../pages/loader";
import MetaTags from "../components/metaTags";
import NavigationMenu from "./navigationMenu";
import MenuIcon from "../assets/icons/menu";
import NotificationPopover from "../components/notifications/popover";

interface layoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: layoutProps) {
  const dispatch = useAppDispatch();
  //get status of side menu from redux store
  const fullView = useAppSelector(
    (state) => state?.menuFunctions?.value?.fullMenuView
  );
  const {
    breadCrumb,
    pageTitle,
    pageDescription,
    setFailedToLoad,
    retryRequest,
    isLoading,
    failedToLoad,
  } = useAppSelector((state) => state?.pageProperties?.value);

  //toggle side bar menu using reux dispatcher
  const toggleMenu = useCallback(() => {
    dispatch(toggleMenuView());
  }, []);

  return (
    <>
      <MetaTags title={pageTitle} description={pageDescription} />
      <main className=" flex w-full dark:bg-dark bg-white items-stretch">
        <nav className=" z-20 fixed top-0">
          <NavigationMenu />
        </nav>
        <div
          className={`${
            fullView ? " md:ml-[260px]" : " md:ml-20"
          } w-full transition-all`}
        >
          <div className="w-full webkit-sticky top-0  bg-white dark:bg-dark-500 z-10 py-5 px-5 md:px-10 flex items-center gap-2 text-primary">
            <div className="w-full flex items-center gap-2 text-primary">
              <button
                type="button"
                title="toggle-bar"
                onClick={() => toggleMenu()}
                className=" h-fit"
              >
                {breadCrumb[0]?.icon ? breadCrumb[0]?.icon : <MenuIcon />}
              </button>
              <div className="w-full flex justify-between">
                <div className=" flex items-center flex-wrap md:flex-nowrap gap-2 whitespace-nowrap">
                  {breadCrumb.map((crumb, index) => {
                    return (
                      <Link
                        to={crumb?.url}
                        key={crumb?.label}
                        className="flex items-center gap-1 hover:text-primary/60 transition-all"
                      >
                        {index !== 0 && ">"}
                        <h6 className=" tsxt-xs md:text-lg w-full">
                          {crumb?.label}
                        </h6>
                      </Link>
                    );
                  })}
                </div>
                {/* <h6 className=" text-lg text-gray-700 w-full"> {pageTitle}</h6> */}
                <div className="flex items-center gap-5 w-full justify-end">
                  <div className=" relative group w-full flex justify-end cursor-pointer">
                    <NotificationPopover />
                    {/* <div className=" group-hover:flex absolute top-0 right-0 w-full hidden pt-10 justify-end">
                      <NotificationsMenu />
                    </div> */}
                  </div>
                  <Link
                    to="/user-profile"
                    className="flex items-center justify-center w-8 h-8 aspect-square rounded-full overflow-hidden"
                  >
                    <img
                      src="/logo_blue.png"
                      alt="avatar"
                      className="w-full h-auto"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className=" w-full min-h-screen">
            <div className={`w-full ${isLoading ? "block" : "hidden"}`}>
              <Loader
                failed={failedToLoad}
                setFailed={setFailedToLoad}
                tryAgain={retryRequest}
              />
            </div>
            <div
              className={`w-full flex-col gap-10 mt-10 items-center justify-center ${
                isLoading ? "hidden" : "flex"
              }`}
            >
              <div className="max-w-screen-2xl w-full h-full px-5 md-px-10">
                {children}
              </div>
            </div>
          </div>
        </div>
        {fullView && (
          <div
            className=" fixed top-0 left-0 w-full h-screen z-[18] block md:hidden backgrop-bg-filter"
            onClick={() => toggleMenu()}
          ></div>
        )}
      </main>
    </>
  );
}

export default MainLayout;
