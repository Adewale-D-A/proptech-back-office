import { Link, NavLink, useLocation } from "react-router-dom";
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
import CaretDownIcon from "./icons/caret-down";
import { useCallback, useState } from "react";
import HeadsetIcon from "./icons/headset";
import DoubleDocumentIcon from "./icons/double-document";
import UserGroupIcon from "./icons/user-group";

export default function NavigationMenuItems() {
  const location = useLocation();
  const fullView = useAppSelector(
    (state) => state?.menuFunctions?.value?.fullMenuView
  );
  const [subMenuState, setSubMenuState] = useState({ open: false, id: 0 });

  const handleSubMenu = useCallback((id: number) => {
    setSubMenuState((prev) => ({ open: !prev.open, id: id }));
  }, []);

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
          url: "/apartments/view-all",
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
          url: "/bookings/overview",
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
          url: "/additional-services/99apartment-services",
          label: "Additional Services",
          value: "additional-services",
          show: true,
          icon: <AdditionIcon />,
          hasSubMenu: true,
          subMenu: [
            {
              url: "/additional-services/service-types",
              label: "Service Types",
              value: "service-types",
              show: true,
              icon: <ReceiptIcon />,
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
          id: 14,
          url: "/customer-engagements/ratings-and-reviews",
          label: "Customers Engagement",
          value: "customer-engagements",
          show: true,
          icon: <HeadsetIcon />,
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
          id: 12,
          url: "/admin/admin-users",
          label: "Admin Users",
          value: "admin",
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
          url: "/pricing/overview",
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
          url: "/plans-and-promotions/tax-rates",
          label: "Plans & Promotions",
          value: "plans-and-promotions",
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
          id: 15,
          url: "/requests/requisition-requests",
          label: "Requests",
          value: "requests",
          show: true,
          icon: <DoubleDocumentIcon />,
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
          id: 13,
          url: "/calendar/apartment-calendar",
          label: "Calendar",
          value: "calendar",
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
          id: 8,
          url: "/chat/guest",
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
          url: "/invoices/apartment",
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
          url: "/reports/revenue",
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
        {
          id: 16,
          url: "/employees",
          label: "Employees",
          value: "employees",
          show: true,
          icon: <UserGroupIcon />,
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
                onClick={() => handleSubMenu(items?.id)}
                className={({ isActive }) =>
                  isActive || location?.pathname?.includes(items?.value)
                    ? `flex justify-between w-full p-2 md:p-3 transition-all bg-white/15 border-l-4`
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
                {items?.hasSubMenu && fullView && <CaretDownIcon />}
              </NavLink>
              {items?.hasSubMenu && fullView && (
                <div className=" w-full ml-5 group-hover:my-4 transition-all">
                  {items?.subMenu.map((subItem) => {
                    if (subItem?.show) {
                      return (
                        <Link
                          to={subItem?.url}
                          onClick={() => handleSubMenu(items?.id)}
                          key={subItem?.id}
                          className={`${
                            location?.pathname?.includes(subItem?.url)
                              ? "bg-white/15 border-r-4"
                              : ""
                          } ${
                            subMenuState?.id === items?.id && subMenuState?.open
                              ? "flex"
                              : "hidden"
                          } text-gray-200 group-hover:flex  hover:bg-white/15 hover:border-r-4 px-2 py-3`}
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
