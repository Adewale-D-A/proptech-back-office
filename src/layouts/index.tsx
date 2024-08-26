import React, { useCallback } from "react";

import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { toggleMenuView } from "../stores/appFunctionality/navMenuFunctions";
import { Link } from "react-router-dom";
import Loader from "../pages/loader";
import MetaTags from "../components/metaTags";
import NavigationMenu from "./navigationMenu";

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
      <main className=" flex w-full">
        <nav className="z-10 fixed left-0 top-0">
          <NavigationMenu />
        </nav>
        <div className=" w-full absolute top-0 left-0 pl-0 md:pl-24">
          <div className="w-full webkit-sticky top-0 z-[8] bg-white shadow-md">
            <div className="flex border-b border-gray-200">
              {!fullView && (
                <button
                  type="button"
                  title="toggle-bar"
                  onClick={() => toggleMenu()}
                  className="py-5 bg-gray-400/20 h-fit px-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className=" w-8 h-8 text-gray-700 hover:text-primary_green-500 transition-all cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
                    />
                  </svg>
                </button>
              )}
              <div className="w-full flex justify-between p-5">
                <h6 className=" font-semibold text-lg text-gray-700 w-full">
                  {pageTitle}
                </h6>
                <div className="flex items-center gap-5 w-full justify-end">
                  <div className=" relative group w-full flex justify-end cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                      />
                    </svg>
                    {/* <div className=" group-hover:flex absolute top-0 right-0 w-full hidden pt-10 justify-end">
                      <NotificationsMenu />
                    </div> */}
                  </div>
                  <Link
                    to="/profile"
                    className="flex items-center justify-center w-8 h-8 aspect-square rounded-full overflow-hidden"
                  >
                    <img
                      src="/logo512.png"
                      alt="avatar"
                      className="w-full h-auto"
                    />
                  </Link>
                </div>
              </div>
            </div>
            <div className=" flex gap-1 p-5 text-primary_green-500 text-xs">
              {breadCrumb.map((crumb) => {
                return (
                  <Link
                    to={crumb?.url}
                    key={crumb?.label}
                    className="flex items-center gap-1"
                  >
                    {crumb?.icon} <span>{crumb?.label}</span> {"/"}
                  </Link>
                );
              })}
            </div>
          </div>
          <section className=" w-full h-full overflow-y-auto overflow-x-hidden pb-36">
            <div className={`w-full ${isLoading ? "block" : "hidden"}`}>
              <Loader
                failed={failedToLoad}
                setFailed={setFailedToLoad}
                tryAgain={retryRequest}
              />
            </div>
            <div className={`w-full ${isLoading ? "hidden" : "block"}`}>
              {children}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default MainLayout;
