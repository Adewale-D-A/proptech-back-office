import PhoneIcon from "../../assets/icons/phone";
import VideoIcon from "../../assets/icons/video";
import UsersAvatarCount from "./users-avatar-cout";

export default function SenderCard({
  image,
  isOnline,
  name,
  variant = "dm",
}: {
  image: string;
  isOnline: boolean;
  name: string;
  variant?: "dm" | "group-chat";
}) {
  return (
    <div className={`w-full flex  gap-2 justify-between rounded-lg p-2`}>
      <div className=" flex items-center gap-2">
        <img
          src={image || "/logo_blue.png"}
          alt="avatar"
          className=" object-cover rounded-full size-10 aspect-square"
        />
        <div className=" w-full">
          <h6 className=" font-semibold">{name}</h6>
          {isOnline && variant === "dm" ? (
            <div className=" flex items-center gap-1">
              <div className=" w-2 h-2 aspect-square rounded-full bg-green-500"></div>
              <span className=" text-gray-400 text-xs">Online</span>
            </div>
          ) : (
            <UsersAvatarCount
              dataset={[
                { id: "1", profile: "/temp/temp_apartment_1.jpg" },
                { id: "2", profile: "/temp/temp_apartment_2.jpg" },
                { id: "3", profile: "/temp/temp_apartment_3.jpg" },
                { id: "4", profile: "/temp/temp_apartment_3.jpg" },
                { id: "5", profile: "/temp/temp_apartment_3.jpg" },
                { id: "6", profile: "/temp/temp_apartment_3.jpg" },
                { id: "7", profile: "/temp/temp_apartment_3.jpg" },
              ]}
            />
          )}
        </div>
      </div>
      <div className=" flex items-center gap-4">
        <VideoIcon />
        <PhoneIcon />
      </div>
    </div>
  );
}
