import { useLocation, useParams } from "react-router-dom";
import { useCallback, useLayoutEffect, useState } from "react";
import { useAppDispatch } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import BuildingIcon from "../../../assets/icons/building";
import PlusIcon from "../../../assets/icons/plus";
import WriteIcon from "../../../assets/icons/write";
import ImageCarousel from "../../../components/cards/image-carousel";
import LocationPinIcon from "../../../assets/icons/location";
import CautionIcon from "../../../assets/icons/caution";
import VehicleIcon from "../../../assets/icons/vehicle";
import LinkButton from "../../../components/button/linkButton";
import useGetApartmentById from "../../../services-hooks/useGetApartmentById";
import BathIcon from "../../../assets/icons/bath";
import DeleteConfirmation from "../../../components/infoModal/delete-confirmation";
import GetMapDirections from "../../../components/maps/direction-mapping";

const breadCrumb = [
  {
    url: "/apartments/view-all",
    label: "Apartments",
    icon: <BuildingIcon />,
  },
  {
    url: "#",
    label: "Apartment Details",
    icon: "",
  },
];
export default function ApartmentDetail() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { data, isLoading, isFailed, setIsFailed, retryFunction } =
    useGetApartmentById(id ? id : undefined);
  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Apartment Detail",
        pageDescription: "Apartment details",
        isLoading: isLoading,
        failedToLoad: isFailed,
        setFailedToLoad: setIsFailed,
        retryRequest: retryFunction,
      })
    );
  }, [isLoading]);

  const [isDeleting, setIsDeleting] = useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);

  const deleteApartment = useCallback(() => {
    setOpenDeleteConfirmation(false);
  }, []);

  return (
    <>
      <section className="w-full flex flex-col items-center">
        <div className="w-full max-w-screen-xl flex flex-col gap-10">
          <div className="w-full flex gap-5 justify-between items-center ">
            <h2 className="text-xl font-semibold">Apartment Details</h2>
            <div className=" flex items-center gap-3 text-sm">
              {/* <LoadingButton
                isLoading={isDeleting}
                clickHandler={() => setOpenDeleteConfirmation(true)}
                type="button"
                label="Delete"
                variant={3}
                className=" text-red-500"
                endIcon={<BinIcon className="h-5 w-5" />}
              /> */}
              <LinkButton
                url={`/apartments/edit-apartment/apartment-details/${id}?redirect=${location?.pathname}`}
                label="Edit"
                variant={2}
                endIcon={<WriteIcon className="h-5 w-5" />}
              />
              <LinkButton
                url={`/apartments/add-apartment/apartment-details`}
                label="New Apartment"
                endIcon={<PlusIcon className="h-5 w-5" />}
              />
            </div>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className=" w-full rounded-md border p-2 flex flex-col gap-3">
              <ImageCarousel
                images={data?.images?.map((item) => ({ url: item?.path }))}
              />
              <div className=" flex flex-col gap-2 border-b py-3">
                <div className=" flex items-center justify-between gap-4">
                  <h4 className="text-xl font-semibold">{data?.name}</h4>
                  <h4 className=" text-primary text-xl font-semibold">
                    {data?.currency} {data?.price}
                    <span className=" font-thin text-black text-sm">
                      /Night
                    </span>
                  </h4>
                </div>
                <div className=" text-sm text-gray-500 flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <LocationPinIcon className=" h-4 w-4" /> {data?.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <BathIcon className=" h-4 w-4" /> {data?.no_of_bathrooms}{" "}
                    Bathrooms
                  </span>
                </div>
              </div>
              <div className="pb-3 border-b">
                <h4 className="text-lg font-semibold text-primary">
                  Location of Apartment
                </h4>
              </div>
              <div className="flex flex-col gap-3">
                <div className=" flex  gap-2 items-center">
                  <div className=" p-2 rounded-md bg-gray-200">
                    <LocationPinIcon className=" w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">{data?.location}</h4>
                    <span className=" text-sm text-gray-500">
                      {data?.state}
                    </span>
                  </div>
                </div>
                <h6 className=" font-semibold">The Neighborhood :</h6>
                <p className=" text-gray-500">{data?.point_of_interest}</p>
                <GetMapDirections
                  center={{
                    lat: Number(data?.latitude || 9.082),
                    lng: Number(data?.longitude || 8.6753),
                  }}
                />
              </div>
            </div>
            <div className=" w-full flex flex-col gap-4">
              {/* House Rules */}
              <div className=" rounded-md border">
                <h4 className="text-lg font-semibold border-b p-3">
                  House Rules
                </h4>
                <div className=" flex items-center gap-4 p-3 flex-wrap">
                  {data?.rules?.map((item) => (
                    <label
                      key={item?.id}
                      htmlFor={String(item?.id)}
                      className=" flex items-center gap-3"
                    >
                      <input
                        type="checkbox"
                        checked
                        id={String(item?.id)}
                        readOnly
                      />{" "}
                      <span className=" text-gray-600">{item?.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              {/* Safety & Security */}
              <div className="rounded-md border ">
                <h4 className="text-lg font-semibold border-b p-3">
                  Safety & Security
                </h4>
                <div className=" flex items-center gap-4 p-3 flex-wrap">
                  {data?.safeties?.map((item) => (
                    <label
                      key={item?.id}
                      htmlFor={String(item?.id)}
                      className=" flex items-center gap-3"
                    >
                      <input
                        type="checkbox"
                        checked
                        id={String(item?.id)}
                        readOnly
                      />{" "}
                      <span className=" text-gray-600">{item?.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              {/* Cancellation Policies */}
              <div className="rounded-md border ">
                <h4 className="text-lg font-semibold border-b p-3">
                  Cancellation Policies
                </h4>
                <div className=" flex items-start gap-4 p-3">
                  <span>
                    <CautionIcon />
                  </span>
                  <div className=" flex items-center gap-3 flex-wrap">
                    {data?.cancellation_policies?.length > 0 ? (
                      data?.cancellation_policies?.map((item) => (
                        <span key={item?.id} className=" text-gray-600">
                          {item?.name},
                        </span>
                      ))
                    ) : (
                      <span className=" text-gray-600">
                        {data?.cancellation_policy}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {/* Points of Interest */}
              <div className="rounded-md border ">
                <h4 className="text-lg font-semibold border-b p-3">
                  Points of Interest
                </h4>
                <div className=" flex items-center gap-4 p-3 flex-wrap text-gray-600">
                  <div className="w-full flex items-center gap-3 justify-between">
                    <div className=" flex items-center gap-3">
                      <LocationPinIcon />
                      {data?.point_of_interest}
                    </div>
                    <div className=" flex items-center gap-3">
                      <VehicleIcon />
                      <span className=" ">---</span>
                    </div>
                  </div>
                  {/* {[
                    {
                      id: "1-safety-and-security",
                      label: "Carbon monoxide alarm",
                      distance: "17 mins drive",
                    },
                    {
                      id: "2-safety-and-security",
                      label: "Smoke Alarm",
                      distance: "10 mins drive",
                    },
                    {
                      id: "3-safety-and-security",
                      label: "A must-climb stairs",
                      distance: "14 mins drive",
                    },
                  ].map((item) => (
                    <div
                      key={item?.id}
                      className="w-full flex items-center gap-3 justify-between"
                    >
                      <div className=" flex items-center gap-3">
                        <LocationPinIcon />
                        <span className=" ">{item?.label}</span>
                      </div>
                      <div className=" flex items-center gap-3">
                        <VehicleIcon />
                        <span className=" ">{item?.distance}</span>
                      </div>
                    </div>
                  ))} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <DeleteConfirmation
        confirmationHandler={deleteApartment}
        isLoading={isDeleting}
        btnTitle="Yes, I want to"
        title="Delete Apartment"
        description="Are you sure you want to delete this apartment"
        open={openDeleteConfirmation}
        setOpen={setOpenDeleteConfirmation}
      />
    </>
  );
}
