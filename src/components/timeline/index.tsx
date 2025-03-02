import CheckIcon from "../../assets/icons/check";

const customerTimelineData = [
  {
    id: 1,
    label: "Personal Details",
  },
  {
    id: 2,
    label: "ID Verification Details",
  },
  {
    id: 3,
    label: "Company Details",
  },
  {
    id: 4,
    label: "Sales Channel",
  },
];

const apartmentTimelineData = [
  {
    id: 1,
    label: "Apartment Detail",
  },
  {
    id: 2,
    label: "Apartment Features",
  },
  {
    id: 3,
    label: "Apartment Policy",
  },
];
export default function Timeline({
  currentStep,
  id,
}: {
  currentStep: number;
  id: "apartment" | "customer";
}) {
  const timelineData =
    id === "apartment" ? apartmentTimelineData : customerTimelineData;
  return (
    <div className="flex w-full">
      {timelineData.map((item, index) => (
        <div key={item?.id} className="w-full flex flex-col">
          <div className="w-full flex items-center ml-10">
            <CheckIcon
              className={`${
                index + 1 === 1 || currentStep >= index + 1
                  ? "text-primary border-primary "
                  : "text-gray-300 border-gray-300"
              } min-h-6 min-w-6 h-6 w-6 rounded-full border-4`}
            />
            {!(index + 1 === timelineData?.length) && (
              <div
                className={`w-full h-1 ${
                  currentStep >= index + 2 ? " bg-primary" : "bg-gray-300"
                }
              `}
              ></div>
            )}
          </div>
          <h6 className="  text-xs md:text-md">{item?.label}</h6>
        </div>
      ))}
    </div>
  );
}
