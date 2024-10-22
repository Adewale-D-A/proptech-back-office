import { useCallback, useLayoutEffect, useState } from "react";

import AddEditRoles from "../add-edit-roles";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../../stores/hooks";
import { openSnackbar } from "../../../../stores/appFunctionality/snackbar";
import { updatePageProperties } from "../../../../stores/appFunctionality/pageProperties";
import MenuIcon from "../../../../assets/icons/menu";
import useGetRole from "../../../../services-hooks/useGetRole";
import useAxios from "../../../../useHooks/useAxios";
import { addRolesToList } from "../../../../stores/apiData/roles-lists";

const breadCrumb = [
  {
    url: "#",
    label: "Admin",
    icon: <MenuIcon />,
  },
];

export default function AddRoles() {
  const { id } = useParams();
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
        const response = await axios.post(`/admin/roles${id}`, {
          name,
          permissions,
        });
        console.log({ response });
        dispatch(
          addRolesToList({
            id: 3,
            name,
            slug: "",
            guard_name: "",
            created_at: "",
            updated_at: "",
          })
        );

        dispatch(
          openSnackbar({
            message: "Role name successfully updated",
            isError: false,
          })
        );
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
              isEdit={true}
              name={data?.name}
              roleSubmitHandler={updateRole}
            />
          </div>
        </div>
      </main>
    </>
  );
}
