import SendIcon from "../../../../../assets/icons/send";
import ChatHistory from "../../../../../components/chat/chat-history";
import { customersById } from "../../../../../types/apiData/customers";

export default function GuestMessaging({ user }: { user: customersById }) {
  const chatItem = {
    id: 68,
    user_id: user?.id,
    user: {
      id: user?.id,
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
      phone: user?.phone,
      profile_photo: user?.profile_photo,
    },
    created_at: new Date().toString(),
    updated_at: new Date().toString(),
    last_message: {
      id: 1,
      message: "",
      sender: "",
      files: "",
      message_type: "text",
      chat_id: 0,
      user_id: user?.id,
      admin_id: "",
      created_at: new Date().toString(),
      updated_at: new Date().toString(),
    },
  };

  return (
    <div className="flex items-stretch border-t">
      <div className=" border-r flex justify-center items-center text-center p-3">
        <span>No Threads found</span>
      </div>
      <div className=" w-full flex flex-col p-3">
        <ChatHistory variant={"dm"} chatItem={chatItem} />
      </div>
    </div>
  );
}
