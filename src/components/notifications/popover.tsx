import { useState } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import NotificationIcon from "../../assets/icons/notification";
import Switch from "../switch";
import NotificationItem from "./message-item";
import notificationDataset from "../../assets/temp-api-mockup-data/notifications.json";

export default function NotificationPopover() {
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  return (
    <Popover className="relative z-10">
      <PopoverButton className="block font-semibold focus:outline-none data-[active]:text-primary data-[hover]:text-primary data-[focus]:outline-1 data-[focus]:outline-primary">
        <NotificationIcon />
      </PopoverButton>
      <PopoverPanel
        anchor="bottom"
        className="flex flex-col my-5 w-80 md:w-96 border rounded-md"
      >
        <div className=" flex flex-col gap-3 bg-white">
          <div className=" p-3 flex flex-col gap-5">
            <div className=" flex items-center justify-between">
              <h6 className=" font-semibold text-primary">Notifications</h6>{" "}
              <span className=" flex items-center gap-2">
                <Switch
                  id="notification-unread-only"
                  size="sm"
                  value={showUnreadOnly}
                  setValue={setShowUnreadOnly}
                />
                <label htmlFor="notification-unread-only" className=" text-sm">
                  Show unread
                </label>
              </span>
            </div>
            <button className=" w-full p-2 bg-primary/15 rounded-md text-primary font-semibold">
              Mark all as read (4)
            </button>
          </div>
          <div className=" flex flex-col max-h-60 overflow-y-scroll">
            {notificationDataset.map((item) => (
              <NotificationItem
                url={"#"}
                image={item?.image}
                name={item?.name}
                resourceName={item?.resource}
                read={item?.read}
                time={item?.time}
                actionMessage={item?.action}
              />
            ))}
          </div>
        </div>
      </PopoverPanel>
    </Popover>
  );
}
