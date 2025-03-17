import formatDate, { formatTime } from "../isoDateConverter";

export const apartmentExportFormater = (item: { [key: string]: any }) => {
  return [
    ["name", item?.name],
    ["location", item?.location],
    ["no_of_guests", item?.max_guests],
    ["category", item?.room_option?.name],
    [
      "amenities",
      String(
        item?.amenities?.map((val: { name: string }) => val?.name)?.join(", ")
      ),
    ],
    ["status", item?.availability_status],
  ];
};

export const bookingsExportFormater = (item: { [key: string]: any }) => {
  return [
    ["customer_name", `${item?.user?.first_name} ${item?.user?.last_name} `],
    ["apartment_name", item?.shortlet?.name],
    ["date_of_booking", formatDate(item?.created_at)],
    ["amount", item?.total_price],
    ["currency", item?.currency],
    ["exchange_rate", item?.exchange_rate],
    [
      "check_in_date",
      `${formatDate(item?.check_in_date)} ${item?.check_in_time}`,
    ],
    [
      "check_out_date",
      `${formatDate(item?.check_out_date)} ${item?.check_out_time}`,
    ],
    ["status", item?.status],
  ];
};
