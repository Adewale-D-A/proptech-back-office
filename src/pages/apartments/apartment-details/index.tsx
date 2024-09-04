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

const breadCrumb = [
  {
    url: "#",
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
            <LoadingButton
              isLoading={false}
              type="button"
              label="Edit"
              variant={2}
              endIcon={<WriteIcon className="h-5 w-5" />}
            />
            <LoadingButton
              isLoading={false}
              type="button"
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
              <div>MAP</div>
            </div>
          </div>
          <div className=" w-full rounded-md border p-2"></div>
        </div>
      </div>
    </section>
  );
}
