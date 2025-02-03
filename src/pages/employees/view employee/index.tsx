import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../stores/hooks";
import { SyntheticEvent, useCallback, useLayoutEffect, useState } from "react";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import UsersIcon from "../../../assets/icons/users";
import UserPlusIcon from "../../../assets/icons/user-plus";
import useGetCustomerById from "../../../services-hooks/useGetCustomerById";
import useAxios from "../../../useHooks/useAxios";
import formatDate from "../../../utils/isoDateConverter";
import Select from "../../../components/inputs/select";
import LoadingButton from "../../../components/button";
import NoResult from "../../../components/noResult";
import LinkButton from "../../../components/button/linkButton";
import WriteIcon from "../../../assets/icons/write";
import { openSnackbar } from "../../../stores/appFunctionality/snackbar";
import UserGroupIcon from "../../../assets/icons/user-group";
import BinIcon from "../../../assets/icons/bin-icon";
import Status from "../../../components/status";

const breadCrumb = [
  {
    url: "/employees",
    label: "Employees",
    icon: <UserGroupIcon />,
  },
  {
    url: "#",
    label: "view employee",
    icon: <UserPlusIcon />,
  },
];
export default function ViewEmployee() {
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
        pageTitle: "View employee",
        pageDescription: "View employee",
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
    <section className="w-full border border-[#E4E7EC] rounded-[12px]">
      <div className="w-full flex justify-between items-center p-5 ">
        <div>
          <h2 className=" text-lg font-bold text-[#101828] flex gap-3 justify-center items-center">
            Chukwuemeka Bellion{" "}
            <span>
              <Status status="On-leave" />
            </span>
          </h2>
          <p className=" text-sm font-normal text-[#667085]">
            Digital Marketer
          </p>
        </div>
        <div className="flex gap-4">
          {" "}
          <LinkButton
            url={`/customers/edit-customer/customer-details/${id}`}
            label="Edit"
            variant={1}
            startIcon={<WriteIcon className="h-5 w-5" />}
          />
          <LinkButton
            url={`/customers/edit-customer/customer-details/${id}`}
            label="Delete"
            variant={2}
            startIcon={<BinIcon className="h-5 w-5" />}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4  p-5 ">
        <div>
          <img
            src="/logo_blue.png"
            alt=""
            className="rounded-[12px] w-40 h-40 "
          />
        </div>
        <div className="flex flex-col text-left gap-4">
          <div className=" flex flex-col gap-1">
            <h4 className="text-[#98A2B3] font-semibold text-xs">FULL NAME</h4>
            <p className=" text-black font-medium text-sm">
              Chukwuemeka Bellion
            </p>
          </div>
          <div className=" flex flex-col gap-1">
            <h4 className="text-[#98A2B3] font-semibold text-xs">EMAIL</h4>
            <p className=" text-black font-medium text-sm">
              Chukwuemeka@gmail.com
            </p>
          </div>
          <div className=" flex flex-col gap-1">
            <h4 className="text-[#98A2B3] font-semibold text-xs">
              PHONE NUMBER
            </h4>
            <p className=" text-black font-medium text-sm">+234 90 1234 5478</p>
          </div>
          <div className=" flex flex-col gap-1">
            <h4 className="text-[#98A2B3] font-semibold text-xs">
              DATE OF BIRTH
            </h4>
            <p className=" text-black font-medium text-sm">August 12, 1900</p>
          </div>
          <div className=" flex flex-col gap-1">
            <h4 className="text-[#98A2B3] font-semibold text-xs">COUNTRY </h4>
            <p className=" text-black font-medium text-sm">Nigerian</p>
          </div>
        </div>
        <div className="flex flex-col text-left gap-4">
          <div className=" flex flex-col gap-1">
            <h4 className="text-[#98A2B3] font-semibold text-xs">
              STATE OF ORIGIN
            </h4>
            <p className=" text-black font-medium text-sm">Orlando</p>
          </div>
          <div className=" flex flex-col gap-1">
            <h4 className="text-[#98A2B3] font-semibold text-xs">JOIN DATE</h4>
            <p className=" text-black font-medium text-sm">August 12, 2024</p>
          </div>
          <div className=" flex flex-col gap-1">
            <h4 className="text-[#98A2B3] font-semibold text-xs">DEPARTMENT</h4>
            <p className=" text-black font-medium text-sm">Marketing</p>
          </div>
          <div className=" flex flex-col gap-1">
            <h4 className="text-[#98A2B3] font-semibold text-xs">ROLE</h4>
            <p className=" text-black font-medium text-sm">Digital Marketer</p>
          </div>
          <div className=" flex flex-col gap-1">
            <h4 className="text-[#98A2B3] font-semibold text-xs">SHIFT </h4>
            <p className=" text-black font-medium text-sm">
              Mon - Fri (9:00AM - 5:00PM)
            </p>
          </div>
        </div>
        <div>
          {" "}
          <h4 className="text-[#98A2B3] font-semibold text-xs">ADDRESS </h4>
          <p className=" text-black font-medium text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            commodo quam eu diam tincidunt ultrices. Nulla facilisi. Aenean quis
            auctor est. Mauris tempus ut velit ac suscipit.
          </p>
        </div>
      </div>
    </section>
  );
}
