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
    label: "Customer Success Chat",
    icon: "",
  },
];

export default function CustomerSuccessChatModule() {
  const dispatch = useAppDispatch();

  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Customer Success Chat",
        pageDescription: "customer success chat module",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);
  return (
    <div className="w-full my-10">
      <ChatModule />
    </div>
  );
}
