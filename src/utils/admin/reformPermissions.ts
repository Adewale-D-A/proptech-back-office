import { resource } from "../../types/apiData/resources";

export default function reformResourcePermissions({
  existingResource,
  allResources,
}: {
  existingResource: resource[];
  allResources: resource[];
}) {
  const reformed = allResources.map((item) => {
    const found = existingResource.filter((ol) =>
      ol?.name?.toLowerCase()?.includes(item?.identifier?.toLowerCase())
    );
    const includeCreate = Boolean(
      found.find((val) => val?.name.toLowerCase()?.includes("create"))
    );
    const includeDelete = Boolean(
      found.find((val) => val?.name.toLowerCase()?.includes("delete"))
    );
    const includeUpdate = Boolean(
      found.find((val) => val?.name.toLowerCase()?.includes("update"))
    );
    const includeView = Boolean(
      found.find((val) => val?.name.toLowerCase()?.includes("view"))
    );
    return found
      ? {
          id: item?.id,
          resource_name: item?.identifier,
          slug: item?.slug,
          permissions: {
            all: includeCreate && includeDelete && includeUpdate && includeView,
            view: includeView,
            create: includeCreate,
            update: includeUpdate,
            delete: includeDelete,
          },
        }
      : {
          id: item?.id,
          resource_name: item?.identifier,
          slug: item?.slug,
          permissions: {
            all: false,
            view: false,
            create: false,
            update: false,
            delete: false,
          },
        };
  });
  // console.log(
  //   reformed.map((item) =>
  //     item?.resource_name.toLowerCase()?.split(" ")?.join("-")
  //   )
  // );
  return reformed;
}
