import { useLayoutEffect } from "react";
import { useAppDispatch } from "../../stores/hooks";
import { updatePageProperties } from "../../stores/appFunctionality/pageProperties";
import Tab from "../../components/tab/bookingTab";
import MenuIcon from "../../assets/icons/menu";
import CalendarIcon from "../../assets/icons/calendar";
import UserPlusIcon from "../../assets/icons/user-plus";
import ChatIcon from "../../assets/icons/chat";
import GuestChatModule from "./guest";
import CustomerSuccessChatModule from "./customer-success.tsx";
import OwnersChatModule from "./owners";
import OtherStaffChatModule from "./other-staff";
import VendorChatModule from "./vendor";

const breadCrumb = [
  {
    url: "#",
    label: "Chats",
    icon: <ChatIcon />,
  },
];
export default function Chats() {
  const dispatch = useAppDispatch();

  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Chats",
        pageDescription: "Chats",
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
        <Tab
          header={[
            { id: 1, icon: <MenuIcon />, label: "Guest" },
            { id: 2, icon: <CalendarIcon />, label: "Customer Success" },
            { id: 3, icon: <CalendarIcon />, label: "Owners" },
            { id: 4, icon: <CalendarIcon />, label: "Other staff users" },
            { id: 5, icon: <UserPlusIcon />, label: "Vendor" },
          ]}
          content={[
            {
              id: 1,
              data: <GuestChatModule />,
            },
            {
              id: 2,
              data: <CustomerSuccessChatModule />,
            },
            {
              id: 3,
              data: <OwnersChatModule />,
            },
            {
              id: 4,
              data: <OtherStaffChatModule />,
            },
            {
              id: 5,
              data: <VendorChatModule />,
            },
          ]}
        />
      </div>
    </section>
  );
}
