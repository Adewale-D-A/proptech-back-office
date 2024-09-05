import { useParams } from "react-router-dom";
import { useLayoutEffect } from "react";
import { useAppDispatch } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import BuildingIcon from "../../../assets/icons/building";
import LoadingButton from "../../../components/button";
import BinIcon from "../../../assets/icons/bin-icon";
import PlusIcon from "../../../assets/icons/plus";
import WriteIcon from "../../../assets/icons/write";
import ImageCarousel from "../../../components/cards/image-carousel";
import LocationPinIcon from "../../../assets/icons/location";
import Map from "../../../components/maps";
import CautionIcon from "../../../assets/icons/caution";
import VehicleIcon from "../../../assets/icons/vehicle";
import LinkButton from "../../../components/button/linkButton";

const breadCrumb = [
  {
    url: "/apartments",
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
  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Apartment Detail",
        pageDescription: "Apartment details",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);

  return (
    <section className="w-full flex flex-col items-center">
      <div className="w-full max-w-screen-xl flex flex-col gap-10">
        <div className="w-full flex gap-5 justify-between items-center ">
          <h2 className="text-xl font-semibold">Apartment Details</h2>
          <div className=" flex items-center gap-3 text-sm">
            <LoadingButton
              isLoading={false}
              type="button"
              label="Delete"
              variant={3}
              className=" text-red-500"
              endIcon={<BinIcon className="h-5 w-5" />}
            />
            <LinkButton
              url={`/edit-apartment/${id}`}
              label="Edit"
              variant={2}
              endIcon={<WriteIcon className="h-5 w-5" />}
            />
            <LinkButton
              url="/new-apartment"
              label="New Apartment"
              endIcon={<PlusIcon className="h-5 w-5" />}
            />
          </div>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className=" w-full rounded-md border p-2 flex flex-col gap-3">
            <ImageCarousel />
            <div className=" flex flex-col gap-2 border-b py-3">
              <div className=" flex items-center justify-between gap-4">
                <h4 className="text-xl font-semibold">
                  Amarryah 99 - 2 Bedroom
                </h4>
                <h4 className=" text-primary text-xl font-semibold">
                  N108,000
                  <span className=" font-thin text-black text-sm">/Night</span>
                </h4>
              </div>
              <div className=" text-sm text-gray-500 flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <LocationPinIcon className=" h-4 w-4" /> Lekki Phase II
                </span>
                <span className="flex items-center gap-1">
                  <LocationPinIcon className=" h-4 w-4" /> 3 Bathrooms
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
                  <h4 className="text-lg font-semibold">
                    Bourdillon Road, Ikoyi
                  </h4>
                  <span className=" text-sm text-gray-500">
                    Lagos State, Nigeria
                  </span>
                </div>
              </div>
              <h6 className=" font-semibold">The Neighborhood : Oniru</h6>
              <p className=" text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Mollitia accusantium nisi officia. Distinctio sunt quaerat
                laboriosam, enim nisi odit quae porro error consequuntur,
                voluptatibus molestiae quis tempora facilis! Nihil, reiciendis!
              </p>
              <Map zoom={17} center={{ lat: 9.082, lng: 8.6753 }} />
              <div className=" w-fit">
                <LoadingButton
                  type="button"
                  label="Get Directions"
                  isLoading={false}
                />
              </div>
            </div>
          </div>
          <div className=" w-full flex flex-col gap-4">
            {/* House Rules */}
            <div className=" rounded-md border">
              <h4 className="text-lg font-semibold border-b p-3">
                House Rules
              </h4>
              <div className=" flex items-center gap-4 p-3 flex-wrap">
                {[
                  {
                    id: "1-house-rules",
                    label: "No structural changes without host permission",
                  },
                  {
                    id: "2-house-rules",
                    label: "No loud music after 10pm",
                  },
                  {
                    id: "3-house-rules",
                    label: "No illegal activities",
                  },
                  {
                    id: "4-house-rules",
                    label: "No smoking",
                  },
                  {
                    id: "5-house-rules",
                    label: "No Inflammables",
                  },
                  {
                    id: "6-house-rules",
                    label: "8 guests maximum",
                  },
                ].map((item) => (
                  <label
                    htmlFor={item?.id}
                    className=" flex items-center gap-3"
                  >
                    <input type="checkbox" checked id={item?.id} readOnly />{" "}
                    <span className=" text-gray-600">{item?.label}</span>
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
                {[
                  {
                    id: "1-safety-and-security",
                    label: "Carbon monoxide alarm",
                  },
                  {
                    id: "2-safety-and-security",
                    label: "Smoke Alarm",
                  },
                  {
                    id: "3-safety-and-security",
                    label: "A must-climb stairs",
                  },
                ].map((item) => (
                  <label
                    htmlFor={item?.id}
                    className=" flex items-center gap-3"
                  >
                    <input type="checkbox" checked id={item?.id} readOnly />{" "}
                    <span className=" text-gray-600">{item?.label}</span>
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
                </span>{" "}
                <p className=" text-gray-600">
                  We offer flexible cancellations for all bookings. Select the
                  Flex Rate to cancel your booking up to 3 days before check-in
                  and receive a full refund. For longer stays that are paid
                  monthly, we require at least 30 days notice to cancel or
                  modify without fees
                </p>
              </div>
            </div>
            {/* Points of Interest */}
            <div className="rounded-md border ">
              <h4 className="text-lg font-semibold border-b p-3">
                Points of Interest
              </h4>
              <div className=" flex items-center gap-4 p-3 flex-wrap text-gray-600">
                {[
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
                  <div className="w-full flex items-center gap-3 justify-between">
                    <div className=" flex items-center gap-3">
                      <LocationPinIcon />
                      <span className=" ">{item?.label}</span>
                    </div>
                    <div className=" flex items-center gap-3">
                      <VehicleIcon />
                      <span className=" ">{item?.distance}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
