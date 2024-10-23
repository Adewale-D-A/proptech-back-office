import { resource } from "../types/apiData/resources";
import { roles } from "../types/apiData/roles";

export default function reformResourcePermissions({
  existingResource,
  allResources,
}: {
  existingResource: resource[];
  allResources: resource[];
}) {
  const reformed = allResources.map((item) => {
    const found = existingResource.find((ol) => ol?.slug === item?.slug);
    return found
      ? {
          id: found?.id,
          resource_name: found?.name,
          slug: found?.slug,
          permissions: {
            all: true,
            read: true,
            create: true,
            update: true,
            delete: true,
          },
        }
      : {
          id: item?.id,
          resource_name: item?.name,
          slug: item?.slug,
          permissions: {
            all: false,
            read: false,
            create: false,
            update: false,
            delete: false,
          },
        };
  });
  return reformed;
}
