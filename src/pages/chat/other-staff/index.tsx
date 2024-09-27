import { useLayoutEffect } from "react";
import ChatIcon from "../../../assets/icons/chat";
import { useAppDispatch } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import ChatModule from "../../../components/chat";

const breadCrumb = [
  {
    url: "#",
    label: "Chats",
    icon: <ChatIcon />,
  },
  {
    url: "#",
    label: "Other Staff Chat",
    icon: "",
  },
];

export default function OtherStaffChatModule() {
  const dispatch = useAppDispatch();

  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Other Staff Chat",
        pageDescription: "Other staff chat module",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);
  return (
    <div className="w-full my-10">
      <ChatModule variant="group-chat" />
    </div>
  );
}
