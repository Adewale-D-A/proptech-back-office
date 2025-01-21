import { useCallback, useState } from "react";
import useGetChatById from "../../services-hooks/chat/useGetchatById";
import SendBar from "./send-bar";
import SenderCard from "./sender-card";
import { chatHistory, chatList } from "../../types/apiData/chat";
import Loader from "../../pages/loader";
import useAxios from "../../useHooks/useAxios";
import { useAppSelector } from "../../stores/hooks";
import MessageItemIdentifier from "./message-item";

export default function ChatHistory({
  variant = "dm",
  chatItem,
}: {
  variant?: "dm" | "group-chat";
  chatItem?: chatList;
}) {
  const axios = useAxios();

  const { user: authUser } = useAppSelector(
    (state) => state.userAuthentication.value
  );
  const [sentHistory, setSentHistory] = useState<chatHistory[]>([]);
  const { data, isLoading, isFailed, setIsFailed, retryFunction } =
    useGetChatById({ id: String(chatItem?.id || "") });

  const [isSendingMessage, setIsSendingMessage] = useState(false);

  const handleSendMessage = useCallback(
    async (message: string) => {
      setIsSendingMessage(true);
      try {
        const response = await axios.post(`/admin/chat/send`, {
          message,
          user_id: chatItem?.user_id,
        });
        setSentHistory((prev: any) => [
          ...prev,
          {
            id: 1,
            message,
            sender: authUser?.first_name,
            files: "",
            message_type: "text",
            chat_id: chatItem?.last_message?.chat_id,
            user_id: authUser?.id,
            admin_id: "",
            created_at: new Date().toString(),
            updated_at: new Date().toString(),
          },
        ]);
      } catch (error) {
      } finally {
        setIsSendingMessage(false);
      }
    },
    [chatItem, authUser]
  );

  return (
    <>
      {isLoading ? (
        <Loader
          failed={isFailed}
          setFailed={setIsFailed}
          tryAgain={retryFunction}
        />
      ) : chatItem?.id ? (
        <div className="rounded-md border w-full">
          <div className=" shadow-sm w-full p-3 sticky top-0 left-0">
            <SenderCard
              image={chatItem?.user?.profile_photo}
              isOnline={true}
              name={
                variant === "dm"
                  ? `${chatItem?.user?.first_name} ${chatItem?.user?.last_name}`
                  : "Group Chat"
              }
              variant={variant}
            />
          </div>
          <div className="w-full min-h-96 p-3 flex flex-col gap-4">
            {data?.map((item) => (
              <MessageItemIdentifier key={item?.id} messageItem={item} />
            ))}
            {sentHistory?.map((item) => (
              <MessageItemIdentifier key={item?.id} messageItem={item} />
            ))}
          </div>
          <SendBar
            isSending={isSendingMessage}
            handleSendMessage={handleSendMessage}
          />
        </div>
      ) : (
        <div className=" w-full min-h-96 h-full rounded-md border flex justify-center items-center p-5 bg-gray-100">
          <h1 className=" font-semibold text-primary/50 italic">
            Welcome to the guest chat
          </h1>
        </div>
      )}
    </>
  );
}
