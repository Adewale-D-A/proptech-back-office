import { useCallback, useLayoutEffect } from "react";
import BuildingIcon from "../../../assets/icons/building";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import CalendarIcon from "../../../assets/icons/calendar";
import Filter from "../../../components/filterAndSort/filter";
import QuickReservationFlow from "../../../components/quickReservationFlow";
import ImageCarousel from "../../../components/cards/image-carousel";
import ModalTemplate from "../../../components/modal";
import AssignCustomer from "../../../components/quickReservationFlow/assignToCustomer";
import { closeAssignToCustomerView } from "../../../stores/inAppDataInterations/assignCustomer";

const breadCrumb = [
  {
    url: "/apartments",
    label: "Apartments",
    icon: <BuildingIcon />,
  },
  {
    url: "#",
    label: "Check Calendar",
    icon: "",
  },
];
export default function CheckCalendar() {
  const dispatch = useAppDispatch();
  const { open: openAssignToCustomerView } = useAppSelector(
    (state) => state.assignCustomer.value
  );

  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Check Calendar",
        pageDescription: "Check apartment's calendar",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);

  const updateOpenState = useCallback((value: boolean) => {
    dispatch(closeAssignToCustomerView());
  }, []);

  return (
    <>
      <section className="w-full flex flex-col items-center">
        <div className="w-full max-w-screen-xl flex flex-col gap-10">
          <div className="w-full flex flex-col md:flex-row gap-5">
            <div className=" w-full rounded-md border flex-1 md:flex-[0.3] flex flex-col gap-3">
              <h4 className="text-xl font-semibold border-b  p-2">
                Quick Reservation
              </h4>
              <div className="w-full p-2">
                <QuickReservationFlow variant={2} />
              </div>
            </div>
            <div className=" w-full rounded-md border flex-1 md:flex-[0.7] flex flex-col gap-3">
              <div className=" flex items-center justify-between flex-col md:flex-row gap-3 border-b  p-2">
                <h4 className="text-xl font-semibold flex items-center gap-2">
                  <CalendarIcon /> <span>Apartment Calendar</span>
                </h4>
                <Filter />
              </div>
              <div className="w-full p-2">
                <ImageCarousel
                  images={[
                    { url: "/temp/temp_apartment_1.jpg" },
                    { url: "/temp/temp_apartment_2.jpg" },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* make reservation */}
      <ModalTemplate
        open={openAssignToCustomerView}
        setOpen={updateOpenState}
        showXicon={openAssignToCustomerView}
        className={"max-w-md"}
        title={"Assign Customer"}
      >
        <div className="w-full">
          <AssignCustomer />
        </div>
      </ModalTemplate>
    </>
  );
}
