import { ChangeEvent, useCallback, useEffect, useState } from "react";
import FloatButton from "../../../components/button/floatButton";
import TextInput from "../../../components/inputs/textInput";
import useGetAllResources from "../../../services-hooks/useGetResources";

export default function AddEditRoles({
  isEdit,
  name,
  roleSubmitHandler,
}: {
  isEdit: boolean;
  name: string;
  roleSubmitHandler: Function;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isFailed, setIsFailed, retryFunction } =
    useGetAllResources({
      page: currentPage,
    });
  const [roleName, setRoleName] = useState("");

  const [resourceStates, setResourceStates] = useState<
    {
      sn: number;
      id: number;
      resource_name: string;
      permissions: {
        all: boolean;
        read: boolean;
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

  const handleResourceChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>, index: number) => {
      const selectedValue = event.target.value;
      setResourceStates((prev: any) => {
        const cloned = [...prev];
        const item = cloned[index];
        const permissions =
          selectedValue === "all"
            ? item?.permissions?.all
              ? {
                  all: false,
                  read: false,
                  create: false,
                  update: false,
                  delete: false,
                }
              : {
                  all: true,
                  read: true,
                  create: true,
                  update: true,
                  delete: true,
                }
            : selectedValue === "read"
            ? {
                all: false,
                read: !item?.permissions?.read,
                create: item?.permissions?.create,
                update: item?.permissions?.update,
                delete: item?.permissions?.delete,
              }
            : selectedValue === "create"
            ? {
                all: false,
                read: item?.permissions?.read,
                create: !item?.permissions?.create,
                update: item?.permissions?.update,
                delete: item?.permissions?.delete,
              }
            : selectedValue === "update"
            ? {
                all: false,
                read: item?.permissions?.read,
                create: item?.permissions?.create,
                update: !item?.permissions?.update,
                delete: item?.permissions?.delete,
              }
            : selectedValue === "delete"
            ? {
                all: false,
                read: item?.permissions?.read,
                create: item?.permissions?.create,
                update: item?.permissions?.update,
                delete: !item?.permissions?.delete,
              }
            : {
                all: false,
                read: false,
                create: false,
                update: false,
                delete: false,
              };
        cloned.splice(index, 1, {
          sn: item?.sn,
          id: item?.id,
          resource_name: item?.resource_name,
          permissions: permissions,
        });
        return cloned;
      });
    },
    []
  );

  const handleRoleSubmit = useCallback(() => {
    roleSubmitHandler({ name: roleName, permissions: resourceStates });
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
                <th>Read</th>
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
                          title="read"
                          type="checkbox"
                          className=" w-6 h-6"
                          value={"read"}
                          onChange={(e) => handleResourceChange(e, index)}
                          checked={resource?.permissions.read}
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
      </div>
      <FloatButton
        isLoading={isSubmitting}
        label={isEdit ? "Update" : "Save"}
        type="button"
        clickHandler={() => handleRoleSubmit()}
      />
    </>
  );
}
