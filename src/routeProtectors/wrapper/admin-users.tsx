import { Outlet, useLocation } from "react-router-dom";
import UsersIcon from "../../assets/icons/users";
import NavTab from "../../components/tab/nav-tab";
import { useEffect, useState } from "react";
import PlusIcon from "../../assets/icons/plus";
import LinkButton from "../../components/button/linkButton";

const tabList = [
  {
    id: 1,
    icon: <UsersIcon />,
    label: "Employees",
    url: "/employees/employee-list",
  },
  {
    id: 2,
    icon: <UsersIcon />,
    label: "Employee Roles",
    url: "/employees/roles",
  },
];
export default function EmployeesTabWrapper() {
  const [trackTab, setTrackTab] = useState(1);
  const location = useLocation();
  //   update current tab value based on the current URL
  useEffect(() => {
    const found = tabList?.find((item) => item?.url === location?.pathname);
    setTrackTab(found?.id || 1);
  }, [location]);
  return (
    <section className="w-full flex flex-col gap-5">
      <div className={"flex items-center gap-5 flex-col md:flex-row"}>
        <NavTab tabList={tabList} />
        <div className="w-fit whitespace-nowrap">
          {trackTab === 2 && (
            <LinkButton
              url="/employees/roles/add"
              label="Add New Employee Role"
              startIcon={<PlusIcon />}
            />
          )}
        </div>
      </div>
      <Outlet />
    </section>
  );
}
