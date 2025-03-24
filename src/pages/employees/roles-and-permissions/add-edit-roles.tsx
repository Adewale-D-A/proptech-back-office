import { ChangeEvent, useCallback, useEffect, useState } from "react";
import FloatButton from "../../../components/button/floatButton";
import TextInput from "../../../components/inputs/textInput";
import useGetAllResources from "../../../services-hooks/useGetResources";
import updatePermissions from "../../../utils/updatePermissions";
import reformResourcePermissions from "../../../utils/admin/reformPermissions";
import { resource } from "../../../types/apiData/resources";
import { useAppDispatch } from "../../../stores/hooks";
import { openSnackbar } from "../../../stores/appFunctionality/snackbar";
import backendPermissionFormatter from "../../../utils/admin/backendFormatConverter";

export default function AddEditRoles({
  isEdit,
  name,
  existingPermissions,
  roleSubmitHandler,
}: {
  isEdit: boolean;
  name: string;
  existingPermissions: resource[];
  roleSubmitHandler: Function;
}) {
  const dispatch = useAppDispatch();
  const { data, isLoading, isFailed, setIsFailed, retryFunction } =
    useGetAllResources();

  const [roleName, setRoleName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [resourceStates, setResourceStates] = useState<
    {
      id: number;
      resource_name: string;
      slug: string;
      permissions: {
        all: boolean;
        view: boolean;
        create: boolean;
        update: boolean;
        delete: boolean;
      };
    }[]
  >([]);

  //populate states
  useEffect(() => {
    setRoleName(name || "");
  }, [name]);

  // update resource states
  useEffect(() => {
    const reformed = reformResourcePermissions({
      existingResource: existingPermissions || [],
      allResources: data || [],
    });
    setResourceStates(reformed);
  }, [data, existingPermissions]);

  const handleResourceChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>, index: number) => {
      const selectedValue = event.target.value;
      setResourceStates((prev) => {
        const cloned = [...prev];
        const item = cloned[index];
        const updatedPermission = updatePermissions({
          value: selectedValue,
          permission: item?.permissions,
        });
        cloned.splice(index, 1, {
          id: item?.id,
          resource_name: item?.resource_name,
          slug: item?.slug,
          permissions: updatedPermission,
        });
        return cloned;
      });
    },
    []
  );

  const handleRoleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    if (roleName) {
      const result = backendPermissionFormatter({ permission: resourceStates });
      await roleSubmitHandler({
        name: roleName,
        permissions: result,
      });
      setIsSubmitting(false);
    } else {
      dispatch(
        openSnackbar({
          message: "Role name is required",
          isError: true,
        })
      );
    }
  }, [roleName, resourceStates]);

  return (
    <>
      <div className="w-full flex items-start flex-col gap-10">
        <div className=" w-full max-w-xl">
          <TextInput
            value={roleName}
            setValue={setRoleName}
            placeholder="Role name"
            id="role-name"
            inputType="text"
            isRequired={true}
          />
        </div>
        <div className=" w-full mt-10 overflow-x-auto">
          <table className=" w-full py-10 border rounded-md">
            <thead>
              <tr className=" text-left bg-gray-200/15 text-gray-500">
                <th>S/N</th>
                <th>Resource</th>
                <th>All</th>
                <th>View</th>
                <th>Create</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody className=" w-full">
              {resourceStates.map((resource, index) => {
                return (
                  <tr
                    key={resource?.resource_name}
                    className=" border-b w-full"
                  >
                    <td className=" text-gray-500  max-w-xs">{index + 1}</td>
                    <td className="max-w-md">
                      <h5 className=" text-lg">{resource?.resource_name}</h5>
                    </td>
                    <td className="max-w-xs">
                      <div className="w-full">
                        <input
                          title="all"
                          type="checkbox"
                          className=" w-6 h-6"
                          value={"all"}
                          onChange={(e) => handleResourceChange(e, index)}
                          checked={resource?.permissions.all}
                        />
                      </div>
                    </td>
                    <td className="max-w-xs">
                      <div className="w-full">
                        <input
                          title="view"
                          type="checkbox"
                          className=" w-6 h-6"
                          value={"view"}
                          onChange={(e) => handleResourceChange(e, index)}
                          checked={resource?.permissions.view}
                        />
                      </div>
                    </td>
                    <td className=" max-w-xs">
                      <div className="w-full">
                        <input
                          title="create"
                          type="checkbox"
                          className=" w-6 h-6"
                          value={"create"}
                          onChange={(e) => handleResourceChange(e, index)}
                          checked={resource?.permissions.create}
                        />
                      </div>
                    </td>
                    <td className=" max-w-xs">
                      <div className="w-full">
                        <input
                          title="update"
                          type="checkbox"
                          className=" w-6 h-6"
                          value={"update"}
                          onChange={(e) => handleResourceChange(e, index)}
                          checked={resource?.permissions.update}
                        />
                      </div>
                    </td>
                    <td className=" max-w-xs">
                      <div className="w-full">
                        <input
                          title="delete"
                          type="checkbox"
                          value={"delete"}
                          onChange={(e) => handleResourceChange(e, index)}
                          className=" w-6 h-6"
                          checked={resource?.permissions.delete}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <FloatButton
          isLoading={isSubmitting}
          label={isEdit ? "Update" : "Save"}
          type="button"
          clickHandler={() => handleRoleSubmit()}
        />
      </div>
    </>
  );
}
