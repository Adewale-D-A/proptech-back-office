import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../../stores/hooks";
import { SyntheticEvent, useCallback, useLayoutEffect, useState } from "react";
import { updatePageProperties } from "../../../../stores/appFunctionality/pageProperties";
import UsersIcon from "../../../../assets/icons/users";
import UserPlusIcon from "../../../../assets/icons/user-plus";
import useGetCustomerById from "../../../../services-hooks/useGetCustomerById";
import useAxios from "../../../../useHooks/useAxios";
import formatDate from "../../../../utils/isoDateConverter";
import Select from "../../../../components/inputs/select";
import LoadingButton from "../../../../components/button";
import NoResult from "../../../../components/noResult";
import LinkButton from "../../../../components/button/linkButton";
import WriteIcon from "../../../../assets/icons/write";
import { openSnackbar } from "../../../../stores/appFunctionality/snackbar";
import UserGroupIcon from "../../../../assets/icons/user-group";
import BinIcon from "../../../../assets/icons/bin-icon";
import Status from "../../../../components/status";
import WrenchIcon from "../../../../assets/icons/wrench";
import TimeIcon from "../../../../assets/icons/time";
import DeleteConfirmation from "../../../../components/infoModal/delete-confirmation";
import ChatModule from "../../../../components/chat";
import InboxCard from "../../../../components/chat/inbox-card";

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
  const [isDeleting, setIsDeleting] = useState(false);
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const { data, isLoading, isFailed, setIsFailed, retryFunction } =
    useGetCustomerById(id);
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

  return (
    <section className="w-full flex gap-4 ">
      <div className="flex-1 px-5">
        <h2 className="text-[#101828] font-bold text-lg pb-2">
          Victoria heights
        </h2>
        <Status status="Request" />
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
            {/* <div className="flex justify-between items-center">
              <p className=" text-[#667085] text-xs font-normal">Apartment</p>
              <p className="text-[#101828] font-medium text-xs">
                Victoria heights
              </p>
            </div> */}
          </div>
        </div>
      </div>
      <div className="border-l border-[#E4E7EC] px-5">
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
        <div className="space-y-3 divide-y">
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
      <DeleteConfirmation
        open={openDelete}
        setOpen={setOpenDelete}
        isLoading={isDeleting}
        confirmationHandler={handleDelete}
        title="Delete employee"
        description="This employee’s data will be permanently deleted"
        btnTitle="Yes, confirm"
      />
    </section>
  );
}
