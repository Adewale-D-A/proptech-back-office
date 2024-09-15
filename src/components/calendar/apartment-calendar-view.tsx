import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { closeAssignToCustomerView } from "../../stores/inAppDataInterations/assignCustomer";
import QuickReservationFlow from "../quickReservationFlow";
import CalendarIcon from "../../assets/icons/calendar";
import Filter from "../filterAndSort/filter";
import ImageCarousel from "../cards/image-carousel";
import CalendarAvailabilitySymbol from "../calender-availability-symbol";
import CalendarView from ".";
import ModalTemplate from "../modal";
import AssignCustomer from "../quickReservationFlow/assignToCustomer";

export default function ApartmentCalendarView() {
  const dispatch = useAppDispatch();
  const { open: openAssignToCustomerView } = useAppSelector(
    (state) => state.assignCustomer.value
  );

  const updateOpenState = useCallback((value: boolean) => {
    dispatch(closeAssignToCustomerView());
  }, []);

  return (
    <>
      <section className="w-full flex flex-col items-center my-5">
        <div className="w-full max-w-screen-xl flex flex-col gap-10">
          <div className="w-full flex flex-col md:flex-row gap-5 items-start">
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
              <div className="w-full p-2 flex flex-col gap-5">
                <ImageCarousel
                  images={[
                    { url: "/temp/temp_apartment_1.jpg" },
                    { url: "/temp/temp_apartment_2.jpg" },
                  ]}
                />
                <div className="w-full flex justify-center flex-col gap-5">
                  <CalendarAvailabilitySymbol />
                  <div className="w-full flex flex-wrap gap-4 justify-center items-start">
                    {[1, 2, 4, 5, 6, 7, 8].map((item) => (
                      <CalendarView key={item} />
                    ))}
                  </div>
                </div>
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
