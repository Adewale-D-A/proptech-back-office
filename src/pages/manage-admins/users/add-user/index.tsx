import { useCallback, useLayoutEffect } from "react";
import { useAppDispatch } from "../../../../stores/hooks";
import { updatePageProperties } from "../../../../stores/appFunctionality/pageProperties";
import MenuIcon from "../../../../assets/icons/menu";
import useAxios from "../../../../useHooks/useAxios";
import AddEditAdminUser from "../add-edit-users";
import { addAdminsToList } from "../../../../stores/apiData/admins-list";
import { openSnackbar } from "../../../../stores/appFunctionality/snackbar";
import { useNavigate } from "react-router-dom";
import UserPlusIcon from "../../../../assets/icons/user-plus";

const breadCrumb = [
  {
    url: "/admin/admin-users",
    label: "Admin",
    icon: <MenuIcon />,
  },
  {
    url: "#",
    label: "New Admin",
    icon: <UserPlusIcon />,
  },
];
export default function AddAdminUser() {
  const axios = useAxios();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Add User",
        pageDescription: "Add User",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: null,
        retryRequest: null,
      })
    );
  }, []);

  // create user
  const createUser = useCallback(
    async (data: {
      first_name: string;
      last_name: string;
      email: string;
      role_id: string;
    }) => {
      await axios.post("/admin/create", {
        first_name: data?.first_name,
        last_name: data?.last_name,
        email: data?.email,
        role_id: data?.role_id,
      });
      dispatch(
        addAdminsToList({
          id: 2,
          first_name: data?.first_name,
          last_name: data?.last_name,
          email: data?.email,
          role_id: data?.role_id,
        })
      );
      dispatch(
        openSnackbar({
          message: "Admin user successfully added",
          isError: false,
        })
      );
      navigate("/admin-users-management?redirect=admins");
    },
    []
  );

  return (
    <div className=" w-full flex flex-col items-center gap-5">
      <div className="w-full max-w-screen-2xl px-5 md:px-10">
        <div>
          <AddEditAdminUser
            isEdit={false}
            userInfo={{
              first_name: "",
              last_name: "",
              email: "",
              role_id: "",
            }}
            submitHandler={createUser}
          />
        </div>
      </div>
    </div>
  );
}
