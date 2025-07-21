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
import useGetResourceAccessChecker from "../utils/admin/useAccessChecker";

export default function NavigationMenuItems() {
  const location = useLocation();
  const fullView = useAppSelector(
    (state) => state?.menuFunctions?.value?.fullMenuView
  );
  const [subMenuState, setSubMenuState] = useState({ open: false, id: 0 });

  const handleSubMenu = useCallback((id: number) => {
    setSubMenuState((prev) => ({ open: !prev.open, id: id }));
  }, []);

  // dashbaord
  const { data: dashboard } = useGetResourceAccessChecker({
    resource: "admin-dashboard",
  });
  // apartment
  const { data: shortlet } = useGetResourceAccessChecker({
    resource: "shortlet",
  });
  const { data: roomOption } = useGetResourceAccessChecker({
    resource: "room-option",
  });
  const { data: amenity } = useGetResourceAccessChecker({
    resource: "amenity",
  });
  const { data: extraOption } = useGetResourceAccessChecker({
    resource: "extra-option",
  });
  const { data: safety } = useGetResourceAccessChecker({
    resource: "safety",
  });
  const { data: rule } = useGetResourceAccessChecker({
    resource: "rule",
  });
  const { data: building } = useGetResourceAccessChecker({
    resource: "building",
  });
  const { data: locationGroup } = useGetResourceAccessChecker({
    resource: "location-group",
  });
  const { data: blockDateReason } = useGetResourceAccessChecker({
    resource: "blocked-date-reason",
  });
  // apartment

  // bookings
  const { data: booking } = useGetResourceAccessChecker({
    resource: "booking",
  });
  // bookings

  // additional service
  const { data: additionaService } = useGetResourceAccessChecker({
    resource: "additional-service",
  });
  const { data: serviceType } = useGetResourceAccessChecker({
    resource: "service-type",
  });
  // additional service

  // user/customer
  const { data: user } = useGetResourceAccessChecker({
    resource: "user",
  });
  // user/customer

  // customer-engagements
  const { data: rating } = useGetResourceAccessChecker({
    resource: "rating",
  });
  const { data: referral } = useGetResourceAccessChecker({
    resource: "referral",
  });
  // customer-engagements

  // pricing
  const { data: rateList } = useGetResourceAccessChecker({
    resource: "rate-list",
  });
  const { data: specialPricing } = useGetResourceAccessChecker({
    resource: "special-price",
  });
  const { data: restriction } = useGetResourceAccessChecker({
    resource: "restriction",
  });
  // pricing

  // plans and promotions
  const { data: tax } = useGetResourceAccessChecker({
    resource: "tax",
  });
  const { data: offer } = useGetResourceAccessChecker({
    resource: "offer",
  });
  const { data: coupon } = useGetResourceAccessChecker({
    resource: "coupon",
  });
  // plans and promotions

  // requests
  const { data: maintenanceReqCategory } = useGetResourceAccessChecker({
    resource: "maintenance-request-category",
  });
  const { data: maintenanceReq } = useGetResourceAccessChecker({
    resource: "maintenance-request",
  });
  const { data: requisitionReq } = useGetResourceAccessChecker({
    resource: "requisition-request",
  });
  // requests

  // calendar
  const { data: calendar } = useGetResourceAccessChecker({
    resource: "view-calendar",
  });
  // calendar

  // chat
  const { data: chat } = useGetResourceAccessChecker({
    resource: "user-chat",
  });
  // chat

  // invoice
  const { data: invoice } = useGetResourceAccessChecker({
    resource: "invoice",
  });
  // invoice

  // report
  const { data: reportDashboard } = useGetResourceAccessChecker({
    resource: "report-dashboard",
  });
  const { data: revenueReport } = useGetResourceAccessChecker({
    resource: "revenue-report",
  });
  const { data: occupancyReport } = useGetResourceAccessChecker({
    resource: "occupancy-report",
  });
  // report

  // admin/employee
  const { data: admin } = useGetResourceAccessChecker({
    resource: "admin",
  });
  const { data: role } = useGetResourceAccessChecker({
    resource: "role",
  });
  // admin/employee
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
          show: dashboard?.view,
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
          show:
            shortlet?.view ||
            roomOption?.view ||
            amenity?.view ||
            extraOption?.view ||
            safety?.view ||
            rule?.view ||
            building?.view ||
            locationGroup?.view ||
            blockDateReason?.view,
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
          show: booking?.view,
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
          show: additionaService?.view,
          icon: <AdditionIcon />,
          hasSubMenu: true,
          subMenu: [
            {
              url: "/additional-services/service-types",
              label: "Service Types",
              value: "service-types",
              show: serviceType?.view,
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
          show: user?.view,
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
          show: rating?.view || referral?.view,
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
          id: 6,
          url: "/pricing/overview",
          label: "Pricing",
          value: "pricing",
          show:
            rateList?.view ||
            specialPricing?.view ||
            restriction?.view ||
            coupon?.view ||
            offer?.view ||
            tax?.view,
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
        // {
        //   id: 7,
        //   url: "/plans-and-promotions/types-of-prices",
        //   label: "Plans & Promotions",
        //   value: "plans-and-promotions",
        //   show: tax?.view || coupon?.view || offer?.view,
        //   icon: <PercentageIcon />,
        //   hasSubMenu: false,
        //   subMenu: [
        //     {
        //       url: "#",
        //       label: "",
        //       value: "",
        //       show: true,
        //       icon: "",
        //       id: 1.1,
        //     },
        //   ],
        // },
        {
          id: 15,
          url: "/requests/maintenance-requests",
          label: "Requests",
          value: "requests",
          show:
            maintenanceReqCategory?.view ||
            maintenanceReq?.view ||
            requisitionReq?.view,
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
          show: calendar?.view,
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
          show: chat?.view,
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
          show: invoice?.view,
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
          show:
            reportDashboard?.view ||
            revenueReport?.view ||
            occupancyReport?.view,
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
          url: "/employees/employee-list",
          label: "Employees",
          value: "employees",
          show: admin?.view || role?.view,
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
