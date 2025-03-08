import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../stores/hooks";
import { useCallback, useLayoutEffect, useState } from "react";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import UserPlusIcon from "../../../assets/icons/user-plus";
import useAxios from "../../../useHooks/useAxios";
import WriteIcon from "../../../assets/icons/write";
import UserGroupIcon from "../../../assets/icons/user-group";
import BinIcon from "../../../assets/icons/bin-icon";
import useGetAdmin from "../../../services-hooks/useGetAdmin";
import { removeAdminsInList } from "../../../stores/apiData/admins-list";
import { openSnackbar } from "../../../stores/appFunctionality/snackbar";
import LoadingButton from "../../../components/button";
import AddEditEmployee from "../add-edit-employee";
import ModalTemplate from "../../../components/modal";
import formatDate from "../../../utils/isoDateConverter";
import DeleteConfirmation from "../../../components/infoModal/delete-confirmation";

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
  const navigate = useNavigate();
  const { data, isLoading, isFailed, setIsFailed, retryFunction } = useGetAdmin(
    { id }
  );
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

  const [openDelete, setOpenDelete] = useState(false);
  const [openEmployeeModal, setOpenEmployeeModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  // handle remove user from list
  const handleDelete = useCallback(async () => {
    try {
      setIsDeleting(true);
      await axios.delete(`/admin/admins/${id}`);
      dispatch(removeAdminsInList({ id }));
      dispatch(
        openSnackbar({
          message: "Employee successfully deleted",
          isError: false,
        })
      );
      navigate("/employees");
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  }, [id]);

  return (
    <>
      <section className="w-full border border-[#E4E7EC] rounded-[12px]">
        <div className="w-full flex justify-between items-center p-5 ">
          <div>
            <h2 className=" text-lg font-bold text-[#101828] flex gap-3 justify-center items-center">
              {data?.first_name} {data?.last_name}
              {/* <span>
              <Status status="On-leave" />
            </span> */}
            </h2>
            <p className=" text-sm font-normal text-[#667085]">
              {data?.role_id}
            </p>
          </div>
          <div className="flex gap-4">
            <LoadingButton
              type="button"
              label="Edit"
              isLoading={false}
              clickHandler={() => setOpenEmployeeModal(true)}
              variant={1}
              startIcon={<WriteIcon className="h-5 w-5" />}
            />
            <LoadingButton
              type="button"
              clickHandler={() => setOpenDelete(true)}
              isLoading={isDeleting}
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
              <h4 className="text-[#98A2B3] font-semibold text-xs">
                FULL NAME
              </h4>
              <p className=" text-black font-medium text-sm">
                {data?.first_name} {data?.last_name}
              </p>
            </div>
            <div className=" flex flex-col gap-1">
              <h4 className="text-[#98A2B3] font-semibold text-xs">EMAIL</h4>
              <p className=" text-black font-medium text-sm">{data?.email}</p>
            </div>
            <div className=" flex flex-col gap-1">
              <h4 className="text-[#98A2B3] font-semibold text-xs">
                PHONE NUMBER
              </h4>
              <p className=" text-black font-medium text-sm">{data?.phone}</p>
            </div>
            <div className=" flex flex-col gap-1">
              <h4 className="text-[#98A2B3] font-semibold text-xs">
                DATE OF BIRTH
              </h4>
              <p className=" text-black font-medium text-sm">
                {formatDate(data?.dob)}
              </p>
            </div>
            <div className=" flex flex-col gap-1">
              <h4 className="text-[#98A2B3] font-semibold text-xs">COUNTRY </h4>
              <p className=" text-black font-medium text-sm">{data?.country}</p>
            </div>
          </div>
          <div className="flex flex-col text-left gap-4">
            <div className=" flex flex-col gap-1">
              <h4 className="text-[#98A2B3] font-semibold text-xs">
                STATE OF ORIGIN
              </h4>
              <p className=" text-black font-medium text-sm">{data?.state}</p>
            </div>
            <div className=" flex flex-col gap-1">
              <h4 className="text-[#98A2B3] font-semibold text-xs">
                JOIN DATE
              </h4>
              <p className=" text-black font-medium text-sm">
                {formatDate(data?.join_date)}
              </p>
            </div>
            <div className=" flex flex-col gap-1">
              <h4 className="text-[#98A2B3] font-semibold text-xs">
                DEPARTMENT
              </h4>
              <p className=" text-black font-medium text-sm">
                {data?.department}
              </p>
            </div>
            <div className=" flex flex-col gap-1">
              <h4 className="text-[#98A2B3] font-semibold text-xs">ROLE</h4>
              <p className=" text-black font-medium text-sm">{data?.role_id}</p>
            </div>
            <div className=" flex flex-col gap-1">
              <h4 className="text-[#98A2B3] font-semibold text-xs">SHIFT </h4>
              <p className=" text-black font-medium text-sm">
                {data?.shift_day} - {data?.shift_hour}
              </p>
            </div>
          </div>
          <div>
            {" "}
            <h4 className="text-[#98A2B3] font-semibold text-xs">ADDRESS </h4>
            <p className=" text-black font-medium text-sm">{data?.address}</p>
          </div>
        </div>
      </section>

      <DeleteConfirmation
        confirmationHandler={handleDelete}
        isLoading={isDeleting}
        btnTitle="Yes, I want to"
        title="Delete Employee"
        description="Are you sure you want to delete this employee"
        open={openDelete}
        setOpen={setOpenDelete}
      />
      <ModalTemplate
        open={openEmployeeModal}
        setOpen={setOpenEmployeeModal}
        showXicon={true}
        title={`Edit ${data?.first_name}`}
        className=" max-w-[800px] lg:ml-20"
      >
        <AddEditEmployee id={id} setOpen={setOpenEmployeeModal} />
      </ModalTemplate>
    </>
  );
}
