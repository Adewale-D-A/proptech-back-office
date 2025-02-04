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
    <section className="w-full flex ">
      <div className="flex-1"></div>
      <div className="border-l border-[#E4E7EC] px-5">
        <div className="">
          <div className="flex justify-center items-center gap-2">
            <TimeIcon />
            <h3 className=" text-[#101828] font-bold text-base">
              Historical data
            </h3>
          </div>

          <p className=" text-[#98A2B3] font-medium text-xs">
            See all previous repair history in this category
          </p>
        </div>
      </div>
    </section>
  );
}
