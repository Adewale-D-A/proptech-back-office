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

const breadCrumb = [
  {
    url: "/customers",
    label: "Customers",
    icon: <UsersIcon />,
  },
  {
    url: "#",
    label: "Customer details",
    icon: <UserPlusIcon />,
  },
];
export default function CustomerDetail() {
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
        pageTitle: "Customers Details",
        pageDescription: "Customers details",
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
    <section className="w-full flex flex-col items-center my-5">
      <div className="w-full max-w-screen-xl flex flex-col gap-10">
        <div className=" w-fit">
          <LinkButton
            url={`/customers/edit-customer/customer-details/${id}`}
            label="Edit"
            variant={2}
            endIcon={<WriteIcon className="h-5 w-5" />}
          />
        </div>
        {/* basic information*/}
        <h3 className=" text-lg font-semibold">Personal Information</h3>
        <div className="w-full shadow-sm rounded-md p-5 flex flex-col gap-4">
          <div>
            <img
              src={data?.profile_photo || "/logo_blue.png"}
              className=" w-32 h-32 object-cover rounded-full"
            />
          </div>
          <div className=" w-full grid grid-col-1 md:grid-cols-3 gap-3">
            <span>
              First name: <b></b>
              {data?.first_name}
            </span>
            <span>
              Last name: <b></b>
              {data?.last_name}
            </span>
            <span>
              Gender: <b></b>
              {data?.gender}
            </span>
            <span>
              Date of Birth: <b></b>
              {formatDate(data?.dob)}
            </span>
            <span>
              Phone Number: <b></b>
              {data?.phone}
            </span>
            <span>
              Email: <b></b>
              {data?.email}
            </span>
            <span>
              Email verification Status: <b></b>
              {formatDate(data?.email_verified_at) || "Unveriffied"}
            </span>
          </div>
        </div>

        {/* Identity document */}
        <h3 className=" text-lg font-semibold">Identity Verification</h3>
        <div className=" w-full shadow-sm rounded-md p-5 ">
          {data?.identity_verification_document ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              <div className=" flex items-start gap-3">
                <img
                  src={data?.identity_verification_document || "/logo_blue.png"}
                  className=" w-48 h-auto object-cover rounded-md"
                />
                <p className=" flex flex-col gap-2">
                  <span>Identity Verification Status:</span>
                  <b className=" font-semibold">
                    {data?.identity_verification_status}
                  </b>
                </p>
              </div>
              {!data?.identity_verified && (
                <form
                  onSubmit={verifyIdentity}
                  className=" flex flex-col gap-4 items-center"
                >
                  <Select
                    value={approvalStatus}
                    setValue={setApprovalStatus}
                    id="approval-status"
                    isRequired={true}
                  >
                    <option value="" disabled>
                      Update Verification Status
                    </option>
                    <option value="approved">Approve</option>
                    <option value="rejected">Reject</option>
                  </Select>
                  <div className=" w-fit">
                    <LoadingButton
                      type="submit"
                      isLoading={submitting}
                      label={
                        approvalStatus === "approved"
                          ? "Approve identity document"
                          : "Reject identity document"
                      }
                    />
                  </div>
                </form>
              )}
            </div>
          ) : (
            <NoResult
              title="No identity document found"
              message="Customer identity document not found"
            />
          )}
        </div>
      </div>
    </section>
  );
}
