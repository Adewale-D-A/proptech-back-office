export default function updatePermissions({
  value,
  permission,
}: {
  value: "all" | "read" | "create" | "update" | "delete" | string;
  permission: {
    all: boolean;
    read: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
}) {
  const updatedPermission = {
    all: value === "all" ? Boolean(!permission?.all) : permission?.all,
    read:
      value === "all"
        ? Boolean(!permission?.all)
        : value === "read"
        ? Boolean(!permission?.read)
        : permission?.read,
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
        ? Boolean(!permission?.read)
        : permission?.delete,
  };
  return updatedPermission || permission;
}
