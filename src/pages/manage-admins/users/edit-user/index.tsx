import { useCallback, useLayoutEffect } from "react";
import { useAppDispatch } from "../../../../stores/hooks";
import { updatePageProperties } from "../../../../stores/appFunctionality/pageProperties";
import MenuIcon from "../../../../assets/icons/menu";
import useAxios from "../../../../useHooks/useAxios";
import AddEditAdminUser from "../add-edit-users";
import { replaceAdminsInList } from "../../../../stores/apiData/admins-list";
import { useParams } from "react-router-dom";
import useGetAdmin from "../../../../services-hooks/useGetAdmin";

const breadCrumb = [
  {
    url: "#",
    label: "Admin",
    icon: <MenuIcon />,
  },
];
export default function EditAdminUser() {
  const axios = useAxios();
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const { data, isLoading, isFailed, setIsFailed, retryFunction } = useGetAdmin(
    { id: id || undefined }
  );

  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Edit User",
        pageDescription: "Edit User",
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
      const response = await axios.put(`/admin/admins/${id}`, {
        first_name: data?.first_name,
        last_name: data?.last_name,
        email: data?.email,
        role_id: data?.role_id,
      });
      console.log({ response });
      dispatch(
        replaceAdminsInList({
          id: 2,
          first_name: data?.first_name,
          last_name: data?.last_name,
          email: data?.email,
          role_id: data?.role_id,
        })
      );
    },
    [id]
  );

  return (
    <div className=" w-full flex flex-col items-center gap-5">
      <div className="w-full max-w-screen-2xl px-5 md:px-10">
        <h2 className=" text-2xl mt-10 text-gray-700">Edit user</h2>
        <div>
          <AddEditAdminUser
            isEdit={false}
            userInfo={{
              first_name: data?.first_name,
              last_name: data?.last_name,
              email: data?.email,
              role_id: String(data?.role_id),
            }}
            submitHandler={createUser}
          />
        </div>
      </div>
    </div>
  );
}
