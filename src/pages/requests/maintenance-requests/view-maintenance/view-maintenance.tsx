import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../../stores/hooks";
import { SyntheticEvent, useCallback, useLayoutEffect, useState } from "react";
import { updatePageProperties } from "../../../../stores/appFunctionality/pageProperties";
import UserPlusIcon from "../../../../assets/icons/user-plus";
import useGetCustomerById from "../../../../services-hooks/useGetCustomerById";
import useAxios from "../../../../useHooks/useAxios";
import Select from "../../../../components/inputs/select";
import LoadingButton from "../../../../components/button";
import { openSnackbar } from "../../../../stores/appFunctionality/snackbar";
import BinIcon from "../../../../assets/icons/bin-icon";
import Status from "../../../../components/status";
import WrenchIcon from "../../../../assets/icons/wrench";
import TimeIcon from "../../../../assets/icons/time";
import DeleteConfirmation from "../../../../components/infoModal/delete-confirmation";
import DoubleCheckIcon from "../../../../assets/icons/double-check";
import ModalTemplate from "../../../../components/modal";
import ConvertToRequisition from "../../../../components/maintenance-requests/ConvertToRequisition";
import CheckIcon from "../../../../assets/icons/check";
import CloseRequest from "../../../../components/infoModal/close-request";
import CancelIcon from "../../../../assets/icons/cancel";
import ChatHistory from "../../../../components/chat/chat-history";

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
  const [category, setCategory] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [openCloseRequest, setOpenCloseRequest] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [openRequest, setOpenRequest] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [openConvertToRequisition, setOpenConvertToRequisition] =
    useState(false);
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const { data, isLoading, isFailed, setIsFailed, retryFunction } =
    useGetCustomerById("");
  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "View maintenance request",
        pageDescription: "View maintenance request",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: setIsFailed,
        retryRequest: retryFunction,
      })
    );
  }, [isLoading, isFailed, setIsFailed, retryFunction]);
  const [approvalStatus, setApprovalStatus] = useState("approved");
  const [submitting, setSubmitting] = useState(false);
  const handleOpenDelete = useCallback((id: number) => {
    setOpenDelete(true);
  }, []);

  const handleDelete = useCallback(async () => {
    setIsDeleting(true);
    try {
      // await axios.delete(`/admin/extra-option/${selectedId}`);

      setOpenDelete(false);
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  }, []);
  const handleCloseRequest = useCallback(async () => {
    setIsDeleting(true);
    try {
      // await axios.delete(`/admin/extra-option/${selectedId}`);

      setOpenCloseRequest(false);
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  }, []);

  const verifyIdentity = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      try {
        setSubmitting(true);
        await axios.put(`/admin/user/verify-identity/${id}`, {
          status: approvalStatus, // approved or rejected
        });
        dispatch(
          openSnackbar({
            message: "Customer identity successfully verified",
            isError: false,
          })
        );
      } catch (error) {
      } finally {
        setSubmitting(false);
      }
    },
    [id, approvalStatus]
  );

  const denyRequest = useCallback(async () => {
    try {
      const response = await axios.put(`/admin/requisition-request/${id}`, {
        status: "deny",
      });

      // const data = {};
      // dispatch(replaceRequisitionRequestInList(data));
      dispatch(
        openSnackbar({
          message: "Requisition request successfully denied",
          isError: false,
        })
      );
      // setOpen(false);
    } catch (error) {}
  }, []);

  return (
    <section className="w-full flex gap-4 ">
      <div className="flex-1 px-5">
        <h2 className="text-[#101828] font-bold text-lg pb-2">
          Victoria heights
        </h2>
        <Status status="Request" />
        <div className="py-4 flex gap-3">
          {" "}
          <LoadingButton
            label="Convert to Requisition & Approve"
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
            isLoading={false}
            clickHandler={() => denyRequest()}
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
        <div className="py-5 flex w-full gap-4">
          {" "}
          <div className="border border-[#E4E7EC] rounded-[12px] p-4 w-1/2  space-y-7 ">
            <div className="flex justify-between items-center">
              <p className=" text-[#667085] text-xs font-normal">Apartment</p>
              <p className="text-[#101828] font-medium text-right text-xs">
                Victoria heights
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className=" text-[#667085] text-xs font-normal">
                Requesting employee
              </p>
              <p className="text-[#101828] font-medium text-xs text-right">
                Chuks
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className=" text-[#667085] text-xs font-normal">
                Request date
              </p>
              <p className="text-[#101828] text-right font-medium text-xs">
                15th Sep, 2024
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className=" text-[#667085] text-xs font-normal">Amount</p>
              <p className="text-[#101828] text-right font-medium text-xs">
                #102,000
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className=" text-[#667085] text-xs font-normal">Category</p>
              <p className="text-[#101828] text-right font-medium text-xs">
                HVAC
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className=" text-[#667085] text-xs font-normal">Item</p>
              <p className="text-[#101828] text-right font-medium text-xs">
                Something
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className=" text-[#667085] text-xs font-normal">Frequency</p>
              <p className="text-[#101828] text-right font-medium text-xs">
                One-off
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className=" text-[#667085] text-xs font-normal">
                Additional comments/Notes
              </p>
              <p className="text-[#101828] text-right font-medium text-xs max-w-[130px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className=" text-[#667085] text-xs font-normal">Images</p>
              <p className="text-[#101828] font-medium text-xs">
                Victoria heights
              </p>
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
          {" "}
          <Select
            isRequired={true}
            value={category}
            setValue={setCategory}
            id="category"
            label=""
          >
            <option value="hvac">HVAC</option>
            <option value="general">General</option>
          </Select>
          <Select
            isRequired={true}
            value={category}
            setValue={setCategory}
            id="range"
            label=""
          >
            <option value="">All time</option>
            <option value="">General</option>
          </Select>
        </div>
        <p className=" text-[#98A2B3] font-bold text-xs py-3">
          This item has been requested{" "}
          <span className="text-[#344054]">121</span> times{" "}
        </p>
        <div className="space-y-3 divide-y pb-10">
          <div className="flex justify-between pt-3">
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
          <div className="flex justify-between pt-3">
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
          <div className="flex justify-between pt-3">
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
          <div className="flex justify-between pt-3">
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
          <div className="flex justify-between pt-3">
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
          <div className="flex justify-between pt-3">
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
        </div>
      </div>

      <CloseRequest
        open={openCloseRequest}
        setOpen={setOpenCloseRequest}
        isLoading={isDeleting}
        confirmationHandler={handleCloseRequest}
        title="Close request?"
        description="Write the reason for closure below, This action cannot be undone "
        btnTitle="Yes, confirm"
      />

      <DeleteConfirmation
        open={openDelete}
        setOpen={setOpenDelete}
        isLoading={isDeleting}
        confirmationHandler={handleDelete}
        title="Delete request"
        description="This request will be permanently deleted"
        btnTitle="Yes, confirm"
      />
      <ModalTemplate
        open={openConvertToRequisition}
        setOpen={setOpenConvertToRequisition}
        showXicon={true}
        title="Convert to requisition"
        className=" max-w-screen-sm"
      >
        <ConvertToRequisition
          id={selectedId}
          setOpen={setOpenConvertToRequisition}
        />
      </ModalTemplate>
    </section>
  );
}
