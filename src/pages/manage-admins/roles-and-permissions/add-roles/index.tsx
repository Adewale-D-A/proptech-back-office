import { useCallback, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddEditRoles from "../add-edit-roles";
import { useAppDispatch } from "../../../../stores/hooks";
import { openSnackbar } from "../../../../stores/appFunctionality/snackbar";
import { updatePageProperties } from "../../../../stores/appFunctionality/pageProperties";
import MenuIcon from "../../../../assets/icons/menu";
import useAxios from "../../../../useHooks/useAxios";
import { addRolesToList } from "../../../../stores/apiData/roles-lists";
import UserPlusIcon from "../../../../assets/icons/user-plus";

const breadCrumb = [
  {
    url: "/admin/users-roles",
    label: "Admin Roles",
    icon: <MenuIcon />,
  },
  {
    url: "#",
    label: "New Admin Role",
    icon: <UserPlusIcon />,
  },
];

export default function AddRoles() {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Add Roles",
        pageDescription: "Add user roles",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);

  const addRole = useCallback(
    async ({ name, permissions }: { name: string; permissions: string[] }) => {
      try {
        const response = await axios.post(`/admin/roles`, {
          name,
          permissions,
        });
        const { role } = response?.data?.data;
        dispatch(addRolesToList(role));
        dispatch(
          openSnackbar({
            message: "Role name successfully added",
            isError: false,
          })
        );
        navigate("/admin/users-roles");
      } catch (error: any) {
      } finally {
      }
    },
    []
  );

  return (
    <>
      <main className=" w-full flex flex-col items-center gap-5">
        <div className="w-full max-w-screen-2xl px-5 md:px-10">
          <h2 className=" text-2xl mt-10 text-gray-700">
            Create Roles and Permission
          </h2>

          <div className="w-full mt-16 flex flex-col gap-5">
            <AddEditRoles
              isEdit={false}
              existingPermissions={[]}
              name={""}
              roleSubmitHandler={addRole}
            />
          </div>
        </div>
      </main>
    </>
  );
}
