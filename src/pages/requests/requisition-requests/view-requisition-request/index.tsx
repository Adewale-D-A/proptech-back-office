import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../../stores/hooks";
import { useLayoutEffect, useState } from "react";
import { updatePageProperties } from "../../../../stores/appFunctionality/pageProperties";
import UserPlusIcon from "../../../../assets/icons/user-plus";
import useAxios from "../../../../useHooks/useAxios";
import WrenchIcon from "../../../../assets/icons/wrench";
import ModalTemplate from "../../../../components/modal";
import formatDate, { formatTime } from "../../../../utils/isoDateConverter";
import EyeIcon from "../../../../assets/icons/eye";
import ImageViewer from "../../../../components/image-view";
import useGetRequisitionRequest from "../../../../services-hooks/userGetRequisitionRequest";
import TimeIcon from "../../../../assets/icons/time";
import Status from "../../../../components/status";

const breadCrumb = [
  {
    url: "/requests/requisition-requests",
    label: "Requisition request ",
    icon: <WrenchIcon />,
  },
  {
    url: "#",
    label: "Request",
    icon: <UserPlusIcon />,
  },
];
export default function ViewRequisitionRequest() {
  const { id } = useParams();
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();

  const [openImage, setOpenImage] = useState(false);
  const [status, setStatus] = useState<{ status: string; reason: string }>({
    status: "pending",
    reason: "",
  });
  const { data, isLoading, isFailed, setIsFailed, retryFunction } =
    useGetRequisitionRequest({ id });
  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "View requisition request",
        pageDescription: "View requisition request",
        isLoading: isLoading,
        failedToLoad: isFailed,
        setFailedToLoad: setIsFailed,
        retryRequest: retryFunction,
      })
    );
  }, [isLoading, isFailed, setIsFailed, retryFunction]);
  return (
    <section className="w-full flex flex-col lg:flex-row gap-4 ">
      <div className="flex-1 flex flex-col gap-5">
        <h2 className="text-[#101828] font-bold text-lg pb-2">
          {data?.shortlet?.name}
        </h2>
        <Status status={data?.status} />
        <div className="w-full py-5 flex flex-col gap-3 lg:flex-row">
          <div className="border border-[#E4E7EC] rounded-[12px] p-4 w-full lg:w-1/2  space-y-7 ">
            <div className="flex justify-between items-center">
              <p className=" text-[#667085] text-xs font-normal">Apartment</p>
              <p className="text-[#101828] font-medium text-right text-xs">
                {data?.shortlet?.name}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className=" text-[#667085] text-xs font-normal">
                Requesting employee
              </p>
              <p className="text-[#101828] font-medium text-xs text-right">
                {data?.admin?.first_name} {data?.admin?.last_name}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className=" text-[#667085] text-xs font-normal">
                Request date
              </p>
              <p className="text-[#101828] text-right font-medium text-xs">
                {formatDate(data?.request_date)}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className=" text-[#667085] text-xs font-normal">Amount</p>
              <p className="text-[#101828] text-right font-medium text-xs">
                {data?.currency} {data?.amount}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className=" text-[#667085] text-xs font-normal">Category</p>
              <p className="text-[#101828] text-right font-medium text-xs">
                {data?.category?.name}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className=" text-[#667085] text-xs font-normal">Item</p>
              <p className="text-[#101828] text-right font-medium text-xs">
                {data?.item}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className=" text-[#667085] text-xs font-normal">Frequency</p>
              <p className="text-[#101828] text-right font-medium text-xs">
                {data?.frequency}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className=" text-[#667085] text-xs font-normal">
                Additional comments/Notes
              </p>
              <p className="text-[#101828] text-right font-medium text-xs max-w-[130px]">
                {data?.note}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className=" text-[#667085] text-xs font-normal">Images</p>
              <div className=" flex items-center flex-wrap gap-4">
                {data?.images?.map((item) => (
                  <div key={item?.id} className=" relative">
                    <img
                      src={item?.image}
                      alt={String(item?.id)}
                      className=" w-28 h-auto rounded-sm"
                    />
                    <button
                      onClick={() => setOpenImage(true)}
                      className=" absolute top-1/2 left-1/2 hover:scale-110 transition-all bg-primary/30 rounded-md p-2"
                    >
                      <EyeIcon className=" w-6 h-6 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="border border-[#E4E7EC] bg-gray-50 rounded-[12px] p-2.5 w-full lg:w-1/2  ">
            <div className="border border-[#E4E7EC] rounded-[12px] p-4 w-full space-y-7 ">
              <div className="flex justify-between items-center">
                <p className=" text-[#667085] text-xs font-normal">
                  Payment Status
                </p>
                <Status
                  status={"requisition_payment_state"}
                  booleanVal={Boolean(data?.is_paid)}
                  truthyMessage="Yes, Paid!"
                  falsyMessage="No!"
                />
              </div>
              <div className="flex justify-between items-center">
                <p className=" text-[#667085] text-xs font-normal">
                  Vendor's Name
                </p>
                <p className="text-[#101828] font-medium text-xs text-right">
                  {data?.vendor_name}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className=" text-[#667085] text-xs font-normal">
                  Vendor's Bank
                </p>
                <p className="text-[#101828] text-right font-medium text-xs">
                  {data?.vendor_bank}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className=" text-[#667085] text-xs font-normal">
                  Vendor's Account
                </p>
                <p className="text-[#101828] text-right font-medium text-xs">
                  {data?.account_number}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className=" text-[#667085] text-xs font-normal">
                  Vendor's Account Name
                </p>
                <p className="text-[#101828] text-right font-medium text-xs">
                  {data?.account_name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-l border-b border-[#E4E7EC] px-5">
        <div className="pb-7">
          <div className="flex  items-center gap-2 pb-2">
            <TimeIcon />
            <h3 className=" text-[#101828] font-bold text-base">
              Historical data
            </h3>
          </div>

          <p className=" text-[#98A2B3] font-medium text-xs max-w-[250px]">
            See all previous history of this request
          </p>
        </div>
        {/* <div className="flex gap-3 justify-between">
            <Select
              isRequired={true}
              value={category}
              setValue={setCategory}
              id="range"
              readOnly={true}
            >
              {requestCategories?.map((item) => (
                <option key={item?.id} value={item?.id}>
                  {item?.name}
                </option>
              ))}
            </Select>
            <Select
              isRequired={true}
              value={category}
              setValue={setCategory}
              id="all-time-filter"
              readOnly
            >
              <option value="">All time</option>
            </Select>
          </div> */}
        {/* <p className=" text-[#98A2B3] font-bold text-xs py-3">
            This item has been requested <span className="text-[#344054]">0</span>{" "}
            times{" "}
          </p> */}
        <div className="space-y-3 divide-y pb-10">
          {data?.request_logs?.map((item) => (
            <div
              key={item?.id}
              className="flex justify-between pt-3 border-b py-5 text-sm"
            >
              <div className="space-y-1 text-[#1D2939]">
                <p>
                  <span className="font-bold">Date: </span>{" "}
                  {formatDate(item?.created_at)}, {formatTime(item?.created_at)}
                </p>
                <p>
                  <span className="font-bold">Action:</span> {item?.message}
                </p>
                <p>
                  <span className="font-bold">Employee:</span>{" "}
                  {item?.admin?.first_name} {item?.admin?.last_name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ModalTemplate
        open={openImage}
        setOpen={setOpenImage}
        showXicon={true}
        title="View Request Image(s)"
        className=" max-w-screen-sm"
      >
        <ImageViewer
          images={data?.images?.map((item) => ({ url: item?.image }))}
        />
      </ModalTemplate>
    </section>
  );
}
