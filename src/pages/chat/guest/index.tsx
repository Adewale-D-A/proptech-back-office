import { useCallback, useLayoutEffect, useState } from "react";
import ChatIcon from "../../../assets/icons/chat";
import { useAppDispatch } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import NotifierNumber from "../../../components/status/notifierNumber";
import UserPlusIcon from "../../../assets/icons/user-plus";
import CustomersSingleSearch from "../../../components/inputs/search/customer-single-search";
import individualMessageList from "../../../assets/temp-api-mockup-data/chatIndividuals.json";

import { customersById } from "../../../types/apiData/customers";
import InboxCard from "../../../components/chat/inbox-card";
import ChatHistory from "../../../components/chat/chat-history";

const breadCrumb = [
  {
    url: "#",
    label: "Chats",
    icon: <ChatIcon />,
  },
  {
    url: "#",
    label: "Guest Chat",
    icon: "",
  },
];

export default function GuestChatModule() {
  const dispatch = useAppDispatch();
  const [selectedUser, setSelectedUser] = useState<customersById>({} as any);
  const [myChatList, setMyChatList] = useState([...individualMessageList]);
  const [chatIdSeleted, setChatIdSelected] = useState("");
  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Guest Chat",
        pageDescription: "Guest chat module",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);

  const onMessageItemSelected = useCallback((id: number) => {}, []);

  return (
    <div className="w-full my-10">
      <div className=" w-full flex flex-col md:flex-row items-stretch gap-5">
        <div className="rounded-md border flex-1 md:flex-[0.3] flex flex-col gap-2 ">
          <div className="w-full  p-3 flex flex-col gap-3">
            <div className="w-full flex justify-between ">
              <div className=" flex items-center gap-1">
                <h4 className=" text-lg font-semibold">Messagings</h4>
                <NotifierNumber number={0} />
              </div>
              <div>
                <UserPlusIcon />
              </div>
            </div>
            <CustomersSingleSearch
              placeholder="Search Customers"
              selected={selectedUser}
              setSelected={setSelectedUser}
            />
          </div>
          {/* message list  */}
          <div className=" bg-gray-50/10 border-t flex flex-col gap-2 p-2">
            {myChatList.map((item) => (
              <InboxCard
                key={item?.id}
                isActive={false}
                variant="dm"
                conversation={item}
                setChatId={onMessageItemSelected}
              />
            ))}
          </div>
        </div>
        <ChatHistory variant={"dm"} id={chatIdSeleted} />
      </div>
    </div>
  );
}
