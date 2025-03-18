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
    ["customer_name", `${item?.user?.first_name} ${item?.user?.last_name}`],
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
export const requestsExportFormater = (item: { [key: string]: any }) => {
  return [
    ["customer_name", `${item?.user?.first_name} ${item?.user?.last_name}`],
    ["apartment", item?.shortlet?.name],
    [
      "date_of_request",
      `${formatDate(item?.created_at)} ${formatTime(item?.created_at)}`,
    ],
    ["request_type", item?.subject],
    ["description", item?.description],
    ["escalated_status", item?.is_escalated],
    ["status", item?.status],
  ];
};

export const customersExportFormater = (item: { [key: string]: any }) => {
  return [
    ["first_name", item?.first_name],
    ["last_name", item?.last_name],
    ["phone_number", item?.phone],
    ["total_bookings", item?.total_bookings],
    ["identity_verified", item?.identity_verified],
  ];
};

export const maintenanceRequestsExportFormater = (item: {
  [key: string]: any;
}) => {
  return [
    [
      "requesting_employee",
      `${item?.admin?.first_name} ${item?.admin?.last_name}`,
    ],
    ["apartment", item?.shortlet?.name],
    ["category", item.category?.name],
    ["request_date", formatDate(item?.request_date)],
    ["status", item?.status],
  ];
};

export const apartmentInvoiceExportFormater = (item: {
  [key: string]: any;
}) => {
  return [
    ["invoice_number", item?.invoice_number],
    ["booking_id", item?.booking_id],
    ["emailed_to", item.user?.email],
    ["created_on", formatDate(item?.created_at)],
    ["created_by", item?.created_by],
  ];
};
export const employeesExportFormater = (item: { [key: string]: any }) => {
  return [
    ["employee_first_name", item?.first_name],
    ["employee_last_name", item?.last_name],
    ["employee_email", item?.email],
    ["employee_role", item?.role_id],
  ];
};
// REPORTS

export const revenueReportExportFormater = (item: { [key: string]: any }) => {
  return [
    ["date", formatDate(item?.date)],
    ["rooms_sold", item?.rooms_sold],
    ["nights_booked", item?.nights_booked],
    ["total_bookings", ``],
    ["%Occupancy", item?.occupancy_rate],
    ["IBE_revenue", item?.ibe_revenue],
    ["OTA_revenue", item?.ota_revenue],
    ["ADR", item?.adr],
    ["REVPAR", item?.revpar],
    ["taxes_fees", item?.taxes],
  ];
};
export const occupancyPerTimeReportExportFormater = (item: {
  [key: string]: any;
}) => {
  return [
    ["date", formatDate(item?.date)],
    ["apartment", item?.shortlet_name],
    ["occupancy_status", item?.occupancy_status],
    ["occupant_name", item?.occupant_name],
    ["no_of_guest", item?.number_of_guests],
    ["check_in_date", formatDate(item?.check_in_date)],
    ["check_out_date", formatDate(item?.check_out_date)],
  ];
};

export const maintenanceExpensesExportFormater = (item: {
  [key: string]: any;
}) => {
  return [
    ["payment_date", ``],
    ["apartment", item?.shortlet?.name],
    ["category", item.category?.name],
    ["item", item?.item],
    ["amount", item?.amount],
    ["status", item?.status],
  ];
};

// REPORTS
