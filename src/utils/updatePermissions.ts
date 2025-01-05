export default function updatePermissions({
  value,
  permission,
}: {
  value: "all" | "view" | "create" | "update" | "delete" | string;
  permission: {
    all: boolean;
    view: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
}) {
  const updatedPermission = {
    all: value === "all" ? Boolean(!permission?.all) : permission?.all,
    view:
      value === "all"
        ? Boolean(!permission?.all)
        : value === "view"
        ? Boolean(!permission?.view)
        : permission?.view,
    create:
      value === "all"
        ? Boolean(!permission?.all)
        : value === "create"
        ? Boolean(!permission?.create)
        : permission?.create,
    update:
      value === "all"
        ? Boolean(!permission?.all)
        : value === "update"
        ? Boolean(!permission?.update)
        : permission?.update,
    delete:
      value === "all"
        ? Boolean(!permission?.all)
        : value === "delete"
        ? Boolean(!permission?.view)
        : permission?.delete,
  };
  return updatedPermission || permission;
}
