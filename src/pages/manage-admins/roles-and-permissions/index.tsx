import { useLayoutEffect } from "react";
import MenuIcon from "../../../assets/icons/menu";
import { useAppDispatch } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";

const breadCrumb = [
  {
    url: "/admin-users-management",
    label: "Admin",
    icon: <MenuIcon />,
  },
];
export default function RolesAndPermissions() {
  const dispatch = useAppDispatch();

  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Role Management",
        pageDescription: "Role management",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);

  return (
    <section className="w-full flex flex-col items-center">
      <div className="w-full max-w-screen-xl flex flex-col gap-10">
        <h1>Role Managements</h1>
      </div>
    </section>
  );
}
