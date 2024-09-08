import { useLayoutEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import BuildingIcon from "../../../assets/icons/building";
import { useAppDispatch } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import Timeline from "../../../components/timeline";
import AddEditApartmentDetails from "../../../components/add-edit-apartment/apartment-details";
import useGetApartmentById from "../../../services-hooks/useGetApartmentById";

export default function EditApartmentDetails() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const breadCrumb = useMemo(
    () => [
      {
        url: "/apartments",
        label: "Apartments",
        icon: <BuildingIcon />,
      },
      {
        url: `/apartments-details/${id}`,
        label: "Apartment Details",
        icon: "",
      },
      {
        url: "#",
        label: "Edit Apartment Details",
        icon: "",
      },
    ],
    [id]
  );

  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Edit Apartment Details",
        pageDescription: "Edit apartment details",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, [breadCrumb]);

  const { data, isLoading, isFailed, setIsFailed, retryFunction } =
    useGetApartmentById(id);

  return (
    <section className="w-full flex flex-col items-center">
      <div className="w-full max-w-screen-xl flex flex-col gap-10">
        <div className=" w-full rounded-md border flex flex-col items-center justify-center">
          <div className=" w-full flex items-center max-w-xl py-10">
            <Timeline currentStep={1} />
          </div>
          <div className="w-full border-t py-10 px-5">
            <AddEditApartmentDetails id={id} />
          </div>
        </div>
      </div>
    </section>
  );
}
