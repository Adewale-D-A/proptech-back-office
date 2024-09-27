import UserPlusIcon from "../../assets/icons/user-plus";
import Search from "../inputs/search";
import NotifierNumber from "../status/notifierNumber";
import InboxCard from "./inbox-card";
import SendBar from "./send-bar";
import SenderCard from "./sender-card";
import groupMessageList from "../../assets/temp-api-mockup-data/chatGroup.json";
import individualMessageList from "../../assets/temp-api-mockup-data/chatIndividuals.json";

export default function ChatModule({
  variant = "dm",
}: {
  variant?: "dm" | "group-chat";
}) {
  // const [userInfo, setUserInfo] = useState({}as any)
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
                  key={item?.id}
                  username={item?.username}
                  image={item?.image}
                  message={item?.message}
                  time={item?.time}
                  isActive={index === 0 ? true : false}
                  read={item?.read}
                  unread={item?.unread}
                  variant="dm"
                />
              ))
            : groupMessageList.map((item, index) => (
                <InboxCard
                  key={item?.id}
                  username={item?.username}
                  image={item?.image}
                  message={item?.message}
                  time={item?.time}
                  isActive={index === 0 ? true : false}
                  read={item?.read}
                  groupName={item?.groupName}
                  unread={item?.unread}
                  variant="group-chat"
                />
              ))}
        </div>
      </div>
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
          <div className=" w-full flex justify-start">
            <div className=" p-2 bg-primary/5 rounded-md">
              <p className=" max-w-60">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              </p>
              <span></span>
            </div>
          </div>
        </div>
        <SendBar />
      </div>
    </div>
  );
}
