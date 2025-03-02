// const sampleResponse = {
//   "Shortlet 1": {
//     booked_dates: {},
//     blocked_dates: {},
//   },
//   "Shortlet 2": {
//     booked_dates: {
//       "2025-01-11": "keshi stephen",
//       "2025-01-12": "keshi stephen",
//       "2025-01-13": "keshi stephen",
//       "2025-01-14": "keshi stephen",
//       "2025-01-15": "keshi stephen",
//       "2025-01-16": "keshi stephen",
//       "2025-01-17": "keshi stephen",
//       "2025-01-18": "keshi stephen",
//       "2025-01-19": "keshi stephen",
//       "2025-01-20": "keshi stephen",
//       "2025-01-21": "keshi stephen",
//       "2025-01-22": "keshi stephen",
//       "2025-01-23": "keshi stephen",
//       "2025-01-24": "keshi stephen",
//     },
//     blocked_dates: {},
//   },
//   "Shortlet 3": {
//     booked_dates: {},
//     blocked_dates: {},
//   },
//   "Top Apartments": {
//     booked_dates: {
//       "2025-02-01": "ade azeez",
//       "2025-02-02": "ade azeez",
//       "2025-02-03": "ade azeez",
//       "2025-02-04": "ade azeez",
//       "2025-02-05": "ade azeez",
//     },
//     blocked_dates: {
//       "2025-01-21": "Maintenance",
//       "2025-01-22": "Maintenance",
//       "2025-01-23": "Maintenance",
//       "2025-01-24": "Maintenance",
//       "2025-01-25": "Maintenance",
//       "2025-01-30": "Maintenance",
//       "2025-01-31": "Maintenance",
//     },
//   },
//   "Leke Apartments": {
//     booked_dates: {},
//     blocked_dates: {},
//   },
// } as any;

import { reformedApartmentCalendar } from "../types/apiData/apartment/reformed-apartment-calendar";

export default function ApartmentsCalendarDataTranslator({
  dataset,
}: {
  dataset: {
    [key: string]: {
      [key: string]: {
        [key: string]: string;
      };
    };
  };
}) {
  try {
    const responseItem = [] as reformedApartmentCalendar[];
    const keyArray = Object.keys(dataset);
    keyArray?.forEach((item, index) => {
      const itemMain = dataset[item];
      const isArray = Array.isArray(itemMain);
      if (!isArray) {
        const bookedDates = [] as {
          date: string;
          reason: string;
          attribute: string;
        }[];
        const bookingVals = itemMain?.booked_dates;
        const bookedArrayKeys = Object.keys(bookingVals);
        bookedArrayKeys.forEach((booked, bookedId) => {
          bookedDates.push({
            date: booked,
            reason: "bookings",
            attribute: bookingVals[booked],
          });
        });

        const blockedVals = itemMain?.blocked_dates;
        const blockedDates = [] as {
          date: string;
          reason: string;
          attribute: string;
        }[];
        const blockedArrayKeys = Object.keys(blockedVals);
        blockedArrayKeys.forEach((blocked, blcokedId) => {
          blockedDates.push({
            date: blocked,
            reason: "Maintenance",
            attribute: blockedVals[blocked],
          });
        });

        responseItem.push({
          name: item,
          blocked: blockedDates,
          booked: bookedDates,
        });
      }
    });
    return { reformed: responseItem };
  } catch (error) {
    return { reformed: [] };
  }
}
