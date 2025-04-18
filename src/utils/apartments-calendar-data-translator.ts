import { reformedApartmentCalendar } from "../types/apiData/apartment/reformed-apartment-calendar";

export default function ApartmentsCalendarDataTranslator({
  dataset,
}: {
  dataset: {
    shortlet_id: number;
    shortlet_name: string;
    booked_dates: string[];
    blocked_dates: any;
  }[];
}) {
  try {
    const responseItem = [] as reformedApartmentCalendar[];
    dataset?.forEach((item) => {
      const bookedDates = [] as {
        date: string;
        reason: string;
        attribute: string;
        hex_code: string;
      }[];
      const blockedDates = [] as any;
      item?.booked_dates.forEach((booked) => {
        bookedDates.push({
          date: booked,
          reason: "Bookings",
          attribute: "Booking",
          hex_code: "#FF0000",
        });
      });
      item?.blocked_dates.forEach((blocked: any) => {
        if (typeof blocked === "string" || blocked instanceof String) {
          blockedDates.push({
            date: blocked,
            reason: "",
            attribute: "",
            hex_code: "#293056",
          });
        } else {
          blockedDates.push({
            date: blocked?.date,
            reason: blocked?.reason,
            attribute: blocked?.reason,
            hex_code: blocked?.hex_code || "#293056",
          });
        }
      });
      responseItem.push({
        id: item?.shortlet_id,
        name: item?.shortlet_name,
        blocked: blockedDates,
        booked: bookedDates,
      });
    });
    return { reformed: responseItem };
  } catch (error) {
    return { reformed: [] };
  }
}
