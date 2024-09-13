import BuildingIcon from "../../assets/icons/building";
import LocationPinIcon from "../../assets/icons/location";
import Status from "../status";

export default function CustomerInfoCard() {
  return (
    <div className=" w-full flex flex-col gap-6">
      <div className=" flex items-center justify-between">
        <div className=" flex items-center gap-3">
          <img
            src="/logo_blue.png"
            alt="image"
            className=" rounded-full h-8 w-8 object-cover aspect-square"
          />
          <div>
            <h6 className=" font-semibold">Funsho Michaels</h6>
            <span className=" text-xs">funsho.m@yahoo.com</span>
          </div>
        </div>
        <div className=" flex flex-col gap-1 items-end">
          <h6 className=" font-semibold">ID Number: 4811</h6>
          <Status status="Confirmed" />
        </div>
      </div>
      <div className=" w-full text-xs grid grid-cols-4">
        {[
          {
            id: 1,
            label: "Home Address",
            icon: <LocationPinIcon className=" h-4 w-4" />,
            value: "16 Remo Olowude way",
          },
          {
            id: 2,
            label: "Zip Code",
            icon: <LocationPinIcon className=" h-4 w-4" />,
            value: "10001",
          },
          {
            id: 3,
            label: "City",
            icon: <BuildingIcon className=" h-4 w-4" />,
            value: "Lagos",
          },
          {
            id: 4,
            label: "Company Name",
            icon: <BuildingIcon className=" h-4 w-4" />,
            value: "99Apartments",
          },
        ].map((head) => (
          <div key={head?.id} className=" flex flex-col gap-1 text-[10px]">
            <div className=" flex items-center gap-1">
              {head?.icon} {head?.label}
            </div>
            <span className=" font-semibold text-ellipsis line-clamp-1 text-[12px]">
              {head?.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
