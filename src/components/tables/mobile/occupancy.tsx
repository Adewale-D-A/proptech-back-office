import { Link } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import ChevronRightIcon from "../../../assets/icons/chevron-right";
import { reservations } from "../../../types/apiData/bookings/reservation";
import formatDate from "../../../utils/isoDateConverter";
import Status from "../../status";

export default function MobileOccupancyTable({
  data,
}: {
  data: reservations[];
}) {
  return (
    <div className=" w-full flex flex-col gap-4">
      <div className=" flex items-center justify-between py-3 font-semibold text-gray-500 text-sm bg-gray-100  px-3">
        <span>Apartment Name</span>
        <span>Customer Name</span>
      </div>
      {data.map((item, index) => {
        return (
          <Disclosure key={index}>
            {({ open }) => (
              <div className="text-sm flex flex-col">
                <Disclosure.Button
                  className={`${
                    open ? " bg-gray-100" : ""
                  } flex px-5 py-4 w-full justify-between items-center transition-all gap-4 text-left font-medium focus:outline-none focus-visible:ring focus-visible:ring-black focus-visible:ring-opacity-75`}
                >
                  <div className={`flex items-center gap-3`}>
                    <ChevronRightIcon
                      className={`w-4 h-4 ${
                        open ? "rotate-90 transform" : "rotate-0"
                      } text-black`}
                    />
                    <p className="">{item?.shortlet?.name}</p>
                  </div>
                  <p>
                    {item?.user?.first_name} {item?.user?.last_name}
                  </p>
                </Disclosure.Button>
                <Disclosure.Panel className="w-full">
                  <div className="w-full flex items-center justify-between  px-2 bg-primary/5 py-4">
                    <p className="">{formatDate(item?.check_in_date)}</p>
                    <p className="">{formatDate(item?.check_out_date)}</p>
                  </div>
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
        );
      })}
    </div>
  );
}
