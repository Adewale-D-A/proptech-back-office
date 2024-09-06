import CheckIcon from "../../assets/icons/check";

export default function Timeline({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex w-full">
      <div className="w-full flex flex-col">
        <div className="w-full flex items-center ml-10">
          <CheckIcon
            className={`border-4 text-primary border-primary min-h-6 min-w-6 h-6 w-6 rounded-full`}
          />
          <div
            className={`w-full h-1  ${
              currentStep === 1 ? "bg-gray-300" : "bg-primary"
            } `}
          ></div>{" "}
        </div>
        <h6 className="  text-sm md:text-md">Apartment Detail</h6>
      </div>
      <div className="w-full flex flex-col items-center">
        <div className="w-full flex items-center">
          <div
            className={`w-full h-1 ${
              currentStep === 1 ? "bg-gray-300" : "bg-primary"
            }`}
          ></div>
          <CheckIcon
            className={`${
              currentStep > 1
                ? "text-primary border-primary "
                : "text-gray-300 border-gray-300"
            } min-h-6 min-w-6 h-6 w-6 rounded-full border-4`}
          />
          <div
            className={`w-full h-1 ${
              currentStep > 2 ? " bg-primary" : "bg-gray-300"
            }
            `}
          ></div>
        </div>
        <h6 className="  text-sm md:text-md">Apartment Features</h6>
      </div>
      <div className="w-full flex flex-col items-end">
        <div className="w-full flex items-center justify-end mr-10">
          <div
            className={`w-full h-1 ${
              currentStep === 3 ? "bg-primary " : "bg-gray-300"
            }`}
          ></div>{" "}
          <CheckIcon
            className={`${
              currentStep === 3
                ? "text-primary border-primary "
                : "text-gray-300 border-gray-300"
            }  border-4  min-h-6 min-w-6 h-6 w-6 rounded-full`}
          />
        </div>
        <h6 className="  text-sm md:text-md">Apartment Policy</h6>
      </div>
    </div>
  );
}
