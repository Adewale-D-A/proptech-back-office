import { useCallback } from "react";
import { useAppSelector } from "../../stores/hooks";
import { permissions, systemResources } from "../../types/apiData/roles";

//axios instace interceptor for access token integration and refresh tokens
const useGetResourceAccessChecker = ({
  resource,
}: {
  resource: systemResources;
}) => {
  const { user } = useAppSelector((state) => state.userAuthentication.value);
  const getAccess = useCallback(
    ({ resource, approvals }: { resource: string; approvals?: string }) => {
      if (user?.id === 1) {
        return {
          manage: true,
          view: true,
          create: true,
          update: true,
          delete: true,
          export: true,
        };
      } else {
        try {
          let access = {
            manage: false,
            view: false,
            create: false,
            update: false,
            delete: false,
            export: false,
          };
          user?.role?.permissions.forEach((item) => {
            const isValid = item?.slug
              ?.toLowerCase()
              .includes(resource.toLowerCase());
            if (isValid) {
              item?.name?.toLowerCase().includes("create")
                ? (access.create = true)
                : (access.create = access.create);
              item?.name?.toLowerCase().includes("manage")
                ? (access.manage = true)
                : (access.manage = access.manage);
              item?.name?.toLowerCase().includes("view")
                ? (access.view = true)
                : (access.view = access.view);
              item?.name?.toLowerCase().includes("update")
                ? (access.update = true)
                : (access.update = access.update);
              item?.name?.toLowerCase().includes("delete")
                ? (access.delete = true)
                : (access.delete = access.delete);
              item?.name?.toLowerCase().includes("export")
                ? (access.export = true)
                : (access.export = access.export);
            }
            return isValid;
          });
          return access as permissions;
        } catch (error) {
          return {
            manage: false,
            view: false,
            create: false,
            update: false,
            delete: false,
            export: false,
          } as permissions;
        }
      }
    },
    [resource, user]
  );
  // console.log({ resource, approvals });
  return {
    data: getAccess({ resource }),
  };
};

export default useGetResourceAccessChecker;
