export default function backendPermissionFormatter({
  permission,
}: {
  permission: {
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
  }[];
}) {
  try {
    const filteredDown = permission?.filter(
      (item) =>
        item?.permissions?.all ||
        item?.permissions?.create ||
        item?.permissions?.update ||
        item?.permissions?.delete ||
        item?.permissions?.view
    );
    const finalPermissions = [] as string[];
    filteredDown.forEach((item) => {
      const permissionsObj = item?.permissions as any;
      Object.keys(permissionsObj).forEach((val) => {
        if (permissionsObj[val]) {
          const reform = item?.resource_name?.toLowerCase().split(" ");
          reform.unshift(val);
          !(val === "all") && finalPermissions.push(reform.join("-"));
        }
      });
    });
    return finalPermissions;
  } catch (error) {
    return [];
  }
}
