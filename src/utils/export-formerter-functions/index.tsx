import currencyFormat from "../currency-formatter";
import formatDate, { formatTime } from "../isoDateConverter";

import monthsAndDays from "../../assets/days-months.json";
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

export const additionalServiceExportFormater = (item: {
  [key: string]: any;
}) => {
  return [
    ["customer_name", `${item?.user?.first_name} ${item?.user?.last_name}`],
    ["apartment_name", item?.booking?.shortlet?.name],
    ["date_of_request", formatDate(item?.created_at)],
    ["service_type", item?.service_type?.name],
    ["description", item?.description],
    ["escalated_status", item?.is_escalated],
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
    ["user_type", item?.type],
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

export const ratingsExportFormater = (item: { [key: string]: any }) => {
  return [
    ["customer_name", `${item?.user?.first_name} ${item?.user?.last_name}`],
    ["email", item?.user?.email],
    ["question", item?.question],
    ["date", item?.created_at],
    ["rating", item?.rating],
  ];
};

export const referalsExportFormater = (item: { [key: string]: any }) => {
  return [
    ["referrer_details", `${item?.user?.first_name} ${item?.user?.last_name}`],
    ["email", item?.user?.email],
    [
      "referred_details",
      `${item?.referred_user?.first_name} ${item?.referred_user?.last_name}`,
    ],
    ["referred_email_details", item?.referred_user?.email],
    ["date", item?.created_at],
    ["referral_code", item?.referral_code],
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

export const ownersReportExportFormater = (item: { [key: string]: any }) => {
  return [
    ["Expense", item?.expense_category?.name],
    ["Amount", item?.amount],
    ["Note", item.note],
    ["Apartment", item.shortlet?.name],
  ];
};

export const ownersReportSpreadsheetExportFormater = (item: {
  [key: string]: any;
}) => {
  return [
    ["Expense", item?.expense_name],
    ["January", item?.monthly_total_expenses?.[0]?.total],
    ["February", item?.monthly_total_expenses?.[1]?.total],
    ["March", item?.monthly_total_expenses?.[2]?.total],
    ["April", item?.monthly_total_expenses?.[3]?.total],
    ["May", item?.monthly_total_expenses?.[4]?.total],
    ["June", item?.monthly_total_expenses?.[5]?.total],
    ["July", item?.monthly_total_expenses?.[6]?.total],
    ["August", item?.monthly_total_expenses?.[7]?.total],
    ["September", item?.monthly_total_expenses?.[8]?.total],
    ["October", item?.monthly_total_expenses?.[9]?.total],
    ["November", item?.monthly_total_expenses?.[10]?.total],
    ["December", item?.monthly_total_expenses?.[11]?.total],
  ];
};
// REPORTS
