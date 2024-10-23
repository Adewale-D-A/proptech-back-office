import { useCallback, useLayoutEffect } from "react";

import AddEditRoles from "../add-edit-roles";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../../stores/hooks";
import { openSnackbar } from "../../../../stores/appFunctionality/snackbar";
import { updatePageProperties } from "../../../../stores/appFunctionality/pageProperties";
import MenuIcon from "../../../../assets/icons/menu";
import useGetRole from "../../../../services-hooks/useGetRole";
import useAxios from "../../../../useHooks/useAxios";
import { replaceRolesInList } from "../../../../stores/apiData/roles-lists";

const breadCrumb = [
  {
    url: "/admin-users-management",
    label: "Admin",
    icon: <MenuIcon />,
  },
];

export default function EditRoles() {
  const { id } = useParams();
  const navigate = useNavigate();
  const axios = useAxios();
  const dispatch = useAppDispatch();

  const { data, isLoading, isFailed, setIsFailed, retryFunction } = useGetRole({
    id,
  });

  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Edit Roles",
        pageDescription: "Edit user roles",
        isLoading: isLoading,
        failedToLoad: isFailed,
        setFailedToLoad: setIsFailed,
        retryRequest: retryFunction,
      })
    );
  }, [isLoading, isFailed]);

  const updateRole = useCallback(
    async ({ name, permissions }: { name: string; permissions: string[] }) => {
      try {
        const response = await axios.put(`/admin/roles/${id}`, {
          name,
          permissions,
        });
        const { role } = response?.data?.data;
        dispatch(replaceRolesInList(role));
        dispatch(
          openSnackbar({
            message: "Role successfully updated",
            isError: false,
          })
        );
        navigate("/admin-users-management?redirect=roles");
      } catch (error: any) {}
    },
    []
  );

  return (
    <>
      <main className=" w-full flex flex-col items-center gap-5">
        <div className="w-full max-w-screen-2xl px-5 md:px-10">
          <h2 className=" text-2xl mt-10 text-gray-700">
            Update Roles and Permission
          </h2>

          <div className="w-full mt-16 flex flex-col gap-5">
            <AddEditRoles
              isEdit={true}
              existingPermissions={data?.permissions}
              name={data?.name}
              roleSubmitHandler={updateRole}
            />
          </div>
        </div>
      </main>
    </>
  );
}
