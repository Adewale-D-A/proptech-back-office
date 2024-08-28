import { useLayoutEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { updatePageProperties } from "../../stores/appFunctionality/pageProperties";

import BuildingIcon from "../../assets/icons/building";
import CalendarIcon from "../../assets/icons/calendar";
import UsersIcon from "../../assets/icons/users";
import UserPlusIcon from "../../assets/icons/user-plus";
import DashboardCard from "../../components/cards/dashboard-cards";

const breadCrumb = [
  {
    url: "#",
    label: "Dashboard",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-3 h-3"
      >
        <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
        <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
      </svg>
    ),
  },
];
export default function DashboardOverview() {
  const dispatch = useAppDispatch();

  const { data: userProfile } = useAppSelector(
    (state) => state.userProfile.value
  );
  const [openNewRequestModal, setOpenNewRequestModal] = useState(false);

  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Dashboard",
        pageDescription: "Dashboard",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);

  return (
    <section className="w-full flex flex-col gap-10">
      <h2 className=" text-2xl font-semibold">Services Breakdown</h2>
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            id: 1,
            icon: <BuildingIcon className="w-5 h-5" />,
            label: "Number of Apartment",
            value: "200",
            theme: "text-[#26397B] bg-[#26397B]/20",
            url: { src: "#", label: "View Apartment" },
          },
          {
            id: 2,
            icon: <CalendarIcon className="w-5 h-5" />,
            label: "Total Bookings",
            value: "50 Bookings",
            theme: "text-[#35BD29] bg-[#35BD29]/20",
            url: { src: "#", label: "View Bookings" },
          },
          {
            id: 3,
            icon: <UserPlusIcon className="w-5 h-5" />,
            label: "Additional Requests",
            value: "50 Requests",
            theme: "text-[#017EFF] bg-[#017EFF]/20",
            url: { src: "#", label: "View Requests" },
          },
          {
            id: 4,
            icon: <UsersIcon className="w-5 h-5" />,
            label: "Number of Guests",
            value: "500 Guests",
            theme: "text-[#7C0DBE] bg-[#7C0DBE]/20",
            url: { src: "#", label: "View Users" },
          },
        ].map((item) => (
          <DashboardCard
            key={item?.id}
            theme={item.theme}
            icon={item?.icon}
            label={item?.label}
            value={item?.value}
            urlSrc={item?.url.src}
            urlLabel={item?.url?.label}
          />
        ))}
      </div>
    </section>
  );
}
