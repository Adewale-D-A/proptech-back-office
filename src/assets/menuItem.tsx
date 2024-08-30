import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../stores/hooks";
import MenuIcon from "./icons/menu";
import BuildingIcon from "./icons/building";
import CalendarIcon from "./icons/calendar";
import AdditionIcon from "./icons/addtion";
import UsersIcon from "./icons/users";
import ReceiptIcon from "./icons/receipt";
import PercentageIcon from "./icons/percentage";
import ChatIcon from "./icons/chat";
import DocumentIcon from "./icons/document";
import ClipBoardIcon from "./icons/clipboard";
import NotificationIcon from "./icons/notification";

export default function NavigationMenuItems() {
  const { data } = useAppSelector((state) => state.userProfile.value);

  const fullView = useAppSelector(
    (state) => state?.menuFunctions?.value?.fullMenuView
  );

  return (
    <div
      className={`flex flex-col gap-5 mt-10 ${
        fullView ? "justify-start" : "justify-center"
      }`}
    >
      {[
        {
          id: 1,
          url: "/dashboard-overview",
          label: "Dashboard Overview",
          value: "dashboard-overview",
          show: true,
          icon: <MenuIcon />,
          hasSubMenu: false,
          subMenu: [
            {
              url: "#",
              label: "",
              value: "",
              show: true,
              icon: "",
              id: 1.1,
            },
          ],
        },
        {
          id: 2,
          url: "/apartments",
          label: "Apartments",
          value: "apartments",
          show: true,
          icon: <BuildingIcon />,
          hasSubMenu: false,
          subMenu: [
            {
              url: "#",
              label: "",
              value: "",
              show: true,
              icon: "",
              id: 1.1,
            },
          ],
        },
        {
          id: 3,
          url: "/bookings",
          label: "Bookings",
          value: "bookings",
          show: true,
          icon: <CalendarIcon />,
          hasSubMenu: false,
          subMenu: [
            {
              url: "#",
              label: "",
              value: "",
              show: true,
              icon: "",
              id: 1.1,
            },
          ],
        },
        {
          id: 4,
          url: "/additional-services",
          label: "Additional Services",
          value: "additional services",
          show: true,
          icon: <AdditionIcon />,
          hasSubMenu: false,
          subMenu: [
            {
              url: "#",
              label: "",
              value: "",
              show: true,
              icon: "",
              id: 1.1,
            },
          ],
        },
        {
          id: 5,
          url: "/customers",
          label: "Customers",
          value: "customers",
          show: true,
          icon: <UsersIcon />,
          hasSubMenu: false,
          subMenu: [
            {
              url: "#",
              label: "",
              value: "",
              show: true,
              icon: "",
              id: 1.1,
            },
          ],
        },
        {
          id: 6,
          url: "/pricing",
          label: "Pricing",
          value: "pricing",
          show: true,
          icon: <ReceiptIcon />,
          hasSubMenu: false,
          subMenu: [
            {
              url: "#",
              label: "",
              value: "",
              show: true,
              icon: "",
              id: 1.1,
            },
          ],
        },
        {
          id: 7,
          url: "/plans-and-promotions",
          label: "Plans & Promotions",
          value: "plands-and-promotions",
          show: true,
          icon: <PercentageIcon />,
          hasSubMenu: false,
          subMenu: [
            {
              url: "#",
              label: "",
              value: "",
              show: true,
              icon: "",
              id: 1.1,
            },
          ],
        },
        {
          id: 8,
          url: "/chat",
          label: "Chat",
          value: "chat",
          show: true,
          icon: <ChatIcon />,
          hasSubMenu: false,
          subMenu: [
            {
              url: "#",
              label: "",
              value: "",
              show: true,
              icon: "",
              id: 1.1,
            },
          ],
        },
        {
          id: 9,
          url: "/invoices",
          label: "Invoices",
          value: "invoices",
          show: true,
          icon: <DocumentIcon />,
          hasSubMenu: false,
          subMenu: [
            {
              url: "#",
              label: "",
              value: "",
              show: true,
              icon: "",
              id: 1.1,
            },
          ],
        },
        {
          id: 10,
          url: "/reports",
          label: "Reports",
          value: "reports",
          show: true,
          icon: <ClipBoardIcon />,
          hasSubMenu: false,
          subMenu: [
            {
              url: "#",
              label: "",
              value: "",
              show: true,
              icon: "",
              id: 1.1,
            },
          ],
        },
        {
          id: 11,
          url: "/notification",
          label: "Notification",
          value: "notification",
          show: true,
          icon: <NotificationIcon />,
          hasSubMenu: false,
          subMenu: [
            {
              url: "#",
              label: "",
              value: "",
              show: true,
              icon: "",
              id: 1.1,
            },
          ],
        },
      ]?.map((items) => {
        if (items?.show) {
          return (
            <div key={items?.id} className="w-full group text-white">
              <NavLink
                to={items?.url}
                className={({ isActive }) =>
                  isActive
                    ? `flex justify-between   w-full p-2 md:p-3 transition-all bg-white/15 border-l-4`
                    : `flex justify-between w-full p-2 md:p-3 transition-all hover:bg-white/15 hover:border-l-4`
                }
              >
                <div
                  className={`flex items-center gap-4 ${
                    fullView ? "" : "w-full justify-center"
                  }`}
                >
                  {items?.icon}{" "}
                  {fullView && <span className=" ">{items?.label}</span>}{" "}
                </div>
                {items?.hasSubMenu && fullView && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6  "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                )}
              </NavLink>
              {items?.hasSubMenu && fullView && (
                <div className=" w-full ml-5 group-hover:my-4 transition-all">
                  {items?.subMenu.map((subItem) => {
                    if (subItem?.show) {
                      return (
                        <Link
                          to={subItem?.url}
                          key={subItem?.id}
                          className=" text-gray-500 group-hover:flex hidden hover:text-primary"
                        >
                          <div className="flex items-center">
                            {subItem?.icon}{" "}
                            <span className=" ">{subItem?.label}</span>{" "}
                          </div>
                        </Link>
                      );
                    } else return;
                  })}
                </div>
              )}
            </div>
          );
        } else {
          return;
        }
      })}
    </div>
  );
}
