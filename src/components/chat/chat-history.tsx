import { useState } from "react";
import useGetChatById from "../../services-hooks/chat/useGetchatById";
import SendBar from "./send-bar";
import SenderCard from "./sender-card";

export default function ChatHistory({
  variant = "dm",
  id,
}: {
  variant?: "dm" | "group-chat";
  id: string;
}) {
  const [sentHistory, setSentHistory] = useState<{ message: string }[]>([]);
  const { data } = useGetChatById({ id });
  return (
    <div className="rounded-md border flex-1 md:flex-[0.7]">
      <div className=" shadow-sm w-full p-3 sticky top-0 left-0">
        <SenderCard
          image={"/temp/temp_apartment_1.jpg"}
          isOnline={true}
          name={variant === "dm" ? "John" : "Group Chat"}
          variant={variant}
        />
      </div>
      <div className="w-full min-h-96 p-3 flex flex-col gap-4">
        {data?.map((item) => (
          <div className=" w-full flex justify-start">
            <div className=" p-2 bg-primary/5 rounded-md">
              <p className=" max-w-60">{item?.message}</p>
              <span></span>
            </div>
          </div>
        ))}
        {sentHistory?.map((item) => (
          <div className=" w-full flex justify-start">
            <div className=" p-2 bg-primary/5 rounded-md">
              <p className=" max-w-60">{item?.message}</p>
              <span></span>
            </div>
          </div>
        ))}
      </div>
      <SendBar user_id={id} setSentHistory={setSentHistory} />
    </div>
  );
}
