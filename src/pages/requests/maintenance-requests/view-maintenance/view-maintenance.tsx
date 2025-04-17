import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../../stores/hooks";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { updatePageProperties } from "../../../../stores/appFunctionality/pageProperties";
import UserPlusIcon from "../../../../assets/icons/user-plus";
import useAxios from "../../../../useHooks/useAxios";
import Select from "../../../../components/inputs/select";
import LoadingButton from "../../../../components/button";
import { openSnackbar } from "../../../../stores/appFunctionality/snackbar";
import Status from "../../../../components/status";
import WrenchIcon from "../../../../assets/icons/wrench";
import TimeIcon from "../../../../assets/icons/time";
import DoubleCheckIcon from "../../../../assets/icons/double-check";
import ModalTemplate from "../../../../components/modal";
import ConvertToRequisition from "../../../../components/maintenance-requests/ConvertToRequisition";
import CheckIcon from "../../../../assets/icons/check";
import CloseRequest from "../../../../components/infoModal/close-request";
import CancelIcon from "../../../../assets/icons/cancel";
import ChatHistory from "../../../../components/chat/chat-history";
import useGetMaintenanceRequestById from "../../../../services-hooks/useGetMaintenanceRequestById";
import formatDate from "../../../../utils/isoDateConverter";
import EyeIcon from "../../../../assets/icons/eye";
import ImageViewer from "../../../../components/image-view";
import { replaceMaintenanceRequestInList } from "../../../../stores/apiData/maintenance-requests";
import ClosedMaintenanceRequest from "./close-status";
import ApprovedStatus from "./approved-status";
import useGetRequestCategories from "../../../../services-hooks/useGetRequestCategories";

const breadCrumb = [
  {
    url: "/requests/maintenance-requests",
    label: "Maintenance request ",
    icon: <WrenchIcon />,
  },
  {
    url: "#",
    label: "Request",
    icon: <UserPlusIcon />,
  },
];
export default function ViewMaintenanceRequest() {
  const { id } = useParams();
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();

  const [status, setStatus] = useState<{ status: string; reason: string }>({
    status: "pending",
    reason: "",
  });
  const [category, setCategory] = useState("");

  const { data, isLoading, isFailed, setIsFailed, retryFunction } =
    useGetMaintenanceRequestById({ id });
  const { data: requestCategories } = useGetRequestCategories({
    page: 1,
    limit: 1000,
  });

  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "View maintenance request",
        pageDescription: "View maintenance request",
        isLoading: isLoading,
        failedToLoad: isFailed,
        setFailedToLoad: setIsFailed,
        retryRequest: retryFunction,
      })
    );
  }, [isLoading, isFailed, setIsFailed, retryFunction]);

  useEffect(() => {
    if (data?.id) {
      setStatus({ status: data?.status, reason: data?.close_reason || "" });
    }
  }, [data]);

  const [isClosing, setIsClosing] = useState(false);
  // const [isDeleting, setIsDeleting] = useState(false);

  const [openConvertToRequisition, setOpenConvertToRequisition] =
    useState(false);
  const [openCloseRequest, setOpenCloseRequest] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  // const [openDelete, setOpenDelete] = useState(false);

  // const handleOpenDelete = useCallback((id: number) => {
  // setSelectedId(id)
  //   setOpenDelete(true);
  // }, []);

  // const handleDelete = useCallback(async () => {
  //   setIsDeleting(true);
  //   try {
  //     // await axios.delete(`/admin/extra-option/${selectedId}`);

  //     setOpenDelete(false);
  //   } catch (error) {
  //   } finally {
  //     setIsDeleting(false);
  //   }
  // }, []);

  // const verifyIdentity = useCallback(
  //   async (e: SyntheticEvent) => {
  //     e.preventDefault();
  //     try {
  //       setSubmitting(true);
  //       await axios.put(`/admin/user/verify-identity/${id}`, {
  //         status: approvalStatus, // approved or rejected
  //       });
  //       dispatch(
  //         openSnackbar({
  //           message: "Customer identity successfully verified",
  //           isError: false,
  //         })
  //       );
  //     } catch (error) {
  //     } finally {
  //       setSubmitting(false);
  //     }
  //   },
  //   [id, approvalStatus]
  // );

  const denyRequest = useCallback(
    async (type: "denied" | "closed", reason: string) => {
      try {
        setIsClosing(true);
        const response = await axios.put(
          `/admin/maintenance-request/update-status/${id}`,
          {
            status: "closed",
            close_reason: reason,
          }
        );
        const { maintenance_request } = response?.data?.data;
        // const data = {};
        dispatch(
          replaceMaintenanceRequestInList({
            ...maintenance_request,
            admin: data?.admin,
            shortlet: data?.shortlet,
            category: data?.category,
          })
        );
        dispatch(
          openSnackbar({
            message: `Maintenance request successfully ${type}`,
            isError: false,
          })
        );
        setOpenCloseRequest(false);
        setStatus({ status: maintenance_request?.status, reason });
      } catch (error) {
      } finally {
        setIsClosing(false);
      }
    },
    [data]
  );

  return (
    <section className="w-full flex gap-4 ">
      <div className="flex-1 px-5 flex flex-col gap-5">
        <h2 className="text-[#101828] font-bold text-lg pb-2">
          {data?.shortlet?.name}
        </h2>
        <Status status="Request" />
        {status?.status?.toLowerCase() === "closed" ? (
          <ClosedMaintenanceRequest
            status={String(status?.status || "")}
            reason={String(status?.reason || "")}
          />
        ) : status?.status?.toLowerCase() === "approved" ? (
          <ApprovedStatus
            status={String(status?.status || "")}
            reason={String(status?.reason || "")}
          />
        ) : (
          <div className="py-4 flex gap-3">
            <LoadingButton
              label="Convert to Requisition"
              isLoading={false}
              type="button"
              clickHandler={() => setOpenConvertToRequisition(true)}
              startIcon={<DoubleCheckIcon />}
            />
            <LoadingButton
              label="Close request"
              isLoading={false}
              type="button"
              clickHandler={() => setOpenCloseRequest(true)}
              startIcon={<CheckIcon />}
            />
            <LoadingButton
              type="button"
              label="Deny request"
              variant={3}
              disabled={false}
              isLoading={isClosing}
              clickHandler={() => denyRequest("denied", "Denied")}
              className=" bg-[#F2F4F7] text-[#344054]"
              startIcon={<CancelIcon />}
            />
            {/* <LoadingButton
            type="button"
            label="Delete"
            variant={3}
            disabled={false}
            isLoading={false}
            clickHandler={() => setOpenDelete(true)}
            className=" bg-[#FEF3F2] text-[#B42318]"
            startIcon={<BinIcon />}
          /> */}
          </div>
        )}
        <div className="py-5 flex w-full gap-4">
          <div className="border border-[#E4E7EC] rounded-[12px] p-4 w-1/2  space-y-7 ">
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
          <div className="border border-[#E4E7EC] rounded-[12px] p-2.5 w-1/2  ">
            <ChatHistory variant={"dm"} />
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
            See all previous repair history in this category
          </p>
        </div>
        <div className="flex gap-3 justify-between">
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
        </div>
        <p className=" text-[#98A2B3] font-bold text-xs py-3">
          This item has been requested <span className="text-[#344054]">0</span>{" "}
          times{" "}
        </p>
        <div className="space-y-3 divide-y pb-10">
          {[].map((item, index) => (
            <div key={index} className="flex justify-between pt-3">
              <div className="space-y-1">
                <p className="text-[#1D2939] font-semibold text-xs">
                  Sep 15th, 2024
                </p>
                <p className="text-[#98A2B3] font-normal text-xs">HVAC</p>
                <p className="text-[#98A2B3] font-normal text-xs">#13,000</p>
              </div>
              <div>
                {" "}
                <Status status="Paid" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <DeleteConfirmation
        open={openDelete}
        setOpen={setOpenDelete}
        isLoading={isDeleting}
        confirmationHandler={handleDelete}
        title="Delete request"
        description="This request will be permanently deleted"
        btnTitle="Yes, confirm"
      /> */}
      <ModalTemplate
        open={openCloseRequest}
        setOpen={setOpenCloseRequest}
        showXicon={true}
        title="Close request?"
        className=" max-w-screen-sm"
      >
        <CloseRequest
          open={openCloseRequest}
          setOpen={setOpenCloseRequest}
          isLoading={isClosing}
          confirmationHandler={denyRequest}
          title="Close request?"
          description="Write the reason for closure below, This action cannot be undone "
          btnTitle="Yes, confirm"
        />
      </ModalTemplate>
      <ModalTemplate
        open={openConvertToRequisition}
        setOpen={setOpenConvertToRequisition}
        showXicon={true}
        title="Convert to requisition"
        className=" max-w-screen-sm"
      >
        <ConvertToRequisition id={id} setOpen={setOpenConvertToRequisition} />
      </ModalTemplate>
      <ModalTemplate
        open={openImage}
        setOpen={setOpenImage}
        showXicon={true}
        title="View Reqeust Images"
        className=" max-w-screen-sm"
      >
        <ImageViewer
          images={data?.images?.map((item) => ({ url: item?.image }))}
        />
      </ModalTemplate>
    </section>
  );
}
