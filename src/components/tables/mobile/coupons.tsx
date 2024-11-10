import { Link } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { customers } from "../../../types/apiData/customers";
import ChevronRightIcon from "../../../assets/icons/chevron-right";
import { coupons } from "../../../types/apiData/coupons";
import formatDate from "../../../utils/isoDateConverter";

export default function MobileCouponTable({
  data,
  deleteCoupon,
  editCoupon,
}: {
  data: coupons[];
  deleteCoupon: (id: string) => void;
  editCoupon: (id: string) => void;
}) {
  return (
    <div className=" w-full flex flex-col gap-4">
      <div className=" flex items-center justify-between py-3 font-semibold text-gray-500 text-sm bg-gray-100  px-3">
        <span>Code</span>
        <span>Type</span>
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
                    <p className="">{item?.code}</p>
                  </div>
                  <p>{item?.type}</p>
                </Disclosure.Button>
                <Disclosure.Panel className="w-full">
                  <div className="w-full flex items-center justify-between  px-2 bg-primary/5 py-4">
                    <p className="">
                      {formatDate(item?.start_date)} -{" "}
                      {formatDate(item?.end_date)}
                    </p>

                    <div className=" group relative">
                      <span className=" p-2 text-lg bg-primary/15  rounded-lg">
                        ...
                      </span>{" "}
                      <span className="z-10 text-center group-hover:flex hidden w-52 bg-white text-sm absolute right-0 top-0 rounded-lg shadow-lg flex-col">
                        <Link
                          to={`#/${item?.id}`}
                          className=" p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Edit Coupon
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            deleteCoupon(String(item?.id));
                          }}
                          className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Delete Coupon
                        </button>
                      </span>
                    </div>
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
