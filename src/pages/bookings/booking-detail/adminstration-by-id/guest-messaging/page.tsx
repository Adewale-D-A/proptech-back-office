import SendIcon from "../../../../../assets/icons/send";

export default function GuestMessaging() {
  return (
    <div className="flex items-stretch border-t">
      <div className=" border-r flex justify-center items-center text-center p-3">
        <span>No Threads found</span>
      </div>
      <div className=" w-full flex flex-col p-3">
        <div className=" min-h-52"></div>
        <div className="w-full flex border items-center  rounded-full p-1">
          <input className=" w-full p-2" placeholder="Type Message" />
          <button
            type="button"
            title="Send"
            className="w-git p-2 bg-primary hover:bg-primary/80 transition-all text-white rounded-full"
          >
            <SendIcon className=" w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
