import { useState } from "react";
import UserPlusIcon from "../../assets/icons/user-plus";
import Search from "../inputs/search";
import NotifierNumber from "../status/notifierNumber";
import InboxCard from "./inbox-card";
import groupMessageList from "../../assets/temp-api-mockup-data/chatGroup.json";
import individualMessageList from "../../assets/temp-api-mockup-data/chatIndividuals.json";
import useGetChatList from "../../services-hooks/chat/useGetchatList";
import ChatHistory from "./chat-history";

export default function ChatModule({
  variant = "dm",
}: {
  variant?: "dm" | "group-chat";
}) {
  // const [userInfo, setUserInfo] = useState({}as any)
  const [selectedChatId, setSelectedChatId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isFailed, setIsFailed, retryFunction, pagination } =
    useGetChatList({ page: currentPage, limit: 1000 });
  return (
    <div className=" w-full flex flex-col md:flex-row items-stretch gap-5">
      <div className="rounded-md border flex-1 md:flex-[0.3] flex flex-col gap-2 ">
        <div className="w-full  p-3 flex flex-col gap-3">
          <div className="w-full flex justify-between ">
            <div className=" flex items-center gap-1">
              <h4 className=" text-lg font-semibold">Messaging</h4>
              <NotifierNumber number={16} />
            </div>
            <div>
              <UserPlusIcon />
            </div>
          </div>
          <Search placeholder="Search Customers" id="search-customer" />
        </div>
        {/* message list  */}
        <div className=" bg-gray-50/10 border-t flex flex-col gap-2 p-2">
          {variant === "dm"
            ? individualMessageList.map((item, index) => (
                <InboxCard
                  isActive={String(selectedChatId) === String(item?.id)}
                  key={item?.id}
                  variant="dm"
                  conversation={item}
                  setChatId={setSelectedChatId}
                />
              ))
            : groupMessageList.map((item, index) => (
                <InboxCard
                  isActive={selectedChatId === String(item?.id)}
                  key={item?.id}
                  variant="group-chat"
                  conversation={item}
                  setChatId={setSelectedChatId}
                  groupName="Customer Success"
                />
              ))}
        </div>
      </div>
      {/* <ChatHistory variant={variant} id={selectedChatId} /> */}
    </div>
  );
}
