import { resource } from "../../types/apiData/resources";
export default function reformResources({
  resource,
}: {
  resource: resource[];
}) {
  try {
    const result = resource.map((item) => {
      // check if any of the CRUD string exists in the name
      const includeCreate = item?.name.toLowerCase()?.includes("create");
      const includeDelete = item?.name.toLowerCase()?.includes("delete");
      const includeUpdate = item?.name.toLowerCase()?.includes("update");
      const includeView = item?.name.toLowerCase()?.includes("view");
      //provided the CRUD string exists, remove such crude string and extend
      //object property to include an identifier which contains the stripped
      //down version of the name to only the resource
      if (includeCreate || includeDelete || includeUpdate || includeView) {
        const deepcopy = item?.name
          ?.split(" ")
          .filter((e) => {
            return includeCreate
              ? e.toLowerCase() !== "create"
              : includeDelete
              ? e.toLowerCase() !== "delete"
              : includeUpdate
              ? e.toLowerCase() !== "update"
              : e.toLowerCase() !== "view";
          })
          .join(" ");
        return { ...item, identifier: deepcopy };
        //   if the CRUD string does not exist in the name, return the item as is
      } else return { ...item, identifier: item?.name };
    });
    //   remove duplicated items
    const ids = result.map((o) => o.identifier);
    const filtered = result.filter(
      ({ identifier }, index) => !ids.includes(identifier, index + 1)
    );
    //   return stripped down version only
    return filtered;
  } catch (error) {
    return [];
  }
}
