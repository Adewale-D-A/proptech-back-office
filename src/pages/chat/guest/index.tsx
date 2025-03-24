import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import ChatIcon from "../../../assets/icons/chat";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import NotifierNumber from "../../../components/status/notifierNumber";
import UserPlusIcon from "../../../assets/icons/user-plus";
import CustomersSingleSearch from "../../../components/inputs/search/customer-single-search";
// import individualMessageList from "../../../assets/temp-api-mockup-data/chatIndividuals.json";

import { customersById } from "../../../types/apiData/customers";
import InboxCard from "../../../components/chat/inbox-card";
import ChatHistory from "../../../components/chat/chat-history";
import { chatList } from "../../../types/apiData/chat";
import useGetChatList from "../../../services-hooks/chat/useGetchatList";
import { addChatToList } from "../../../stores/apiData/chat-list";

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
  const { user: authUser } = useAppSelector(
    (state) => state.userAuthentication.value
  );
  const dispatch = useAppDispatch();
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

  const [selectedUser, setSelectedUser] = useState<customersById>({} as any);
  // const [myChatList, setMyChatList] = useState([...individualMessageList]);
  const [chatIdSeleted, setChatIdSelected] = useState<chatList>();

  const { data, isLoading, isFailed, setIsFailed, retryFunction } =
    useGetChatList({ limit: 1000 });

  // add searched and selected user to list
  useEffect(() => {
    if (selectedUser?.id) {
      const thisChatItem = {
        id: `new-chat-user-${selectedUser?.id}`,
        user_id: selectedUser?.id,
        user: {
          id: selectedUser?.id,
          first_name: selectedUser?.first_name,
          last_name: selectedUser?.last_name,
          email: selectedUser?.email,
          phone: selectedUser?.phone,
          profile_photo: selectedUser?.profile_photo || "/logo_blue.png",
        },
        created_at: new Date().toString(),
        updated_at: new Date().toString(),
        last_message: {
          id: 1,
          message: "",
          sender: "",
          files: "",
          message_type: "text",
          chat_id: "new-chat",
          user_id: authUser?.id,
          admin_id: "",
          created_at: new Date().toString(),
          updated_at: new Date().toString(),
        },
      };
      dispatch(addChatToList(thisChatItem));
    }
  }, [selectedUser]);

  const onMessageItemSelected = useCallback((chatItem: chatList) => {
    setChatIdSelected(chatItem);
  }, []);

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
            {data?.map((item) => (
              <InboxCard
                key={item?.id}
                isActive={chatIdSeleted?.id === item?.id}
                variant="dm"
                conversation={item}
                setChatId={onMessageItemSelected}
              />
            ))}
          </div>
        </div>
        <div className=" w-full flex-1 md:flex-[0.7] items-stretch h-full">
          <ChatHistory variant={"dm"} chatItem={chatIdSeleted} />
        </div>
      </div>
    </div>
  );
}
