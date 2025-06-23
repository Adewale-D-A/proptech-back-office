import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import Filter from "../filterAndSort/filter";
import Sort from "../filterAndSort/sort";
import useGetAllCustomersLists from "../../services-hooks/useGetAllCustomersList";
import TableSearch from "../inputs/search/table-search";
import Status from "../status";
import ExportToCSV from "../export-to-csv";
import { customersExportFormater } from "../../utils/export-formerter-functions";
import useGetResourceAccessChecker from "../../utils/admin/useAccessChecker";
import TableActionDropDown from "../drop-down/table-action-dropdown";
import { MenuItem } from "@headlessui/react";
import useExtractUrlParams from "../../useHooks/extract-url-query-params";
import TableTemplate from "./table-template";
import { customersById } from "../../types/apiData/customers";

export default function CustomersListTable() {
  const [filterDates, setFilterDates] = useState<{
    start_date: string;
    end_date: string;
  }>();

  const [{ search, page, size, sort }] = useExtractUrlParams({
    page: 1,
    size: 20,
    search: "",
    sort: "asc",
  });
  const { data, isLoading, pagination } = useGetAllCustomersLists({
    page,
    limit: size,
    start_date: filterDates?.start_date,
    end_date: filterDates?.end_date,
    sort,
    search,
  });
  const handleCustomersFiltering = useCallback(
    (start_date: string, end_date: string) => {
      setFilterDates({ start_date, end_date });
    },
    []
  );
  const { data: user } = useGetResourceAccessChecker({
    resource: "user",
  });
  return (
    <div className="w-full rounded-lg border md:p-5 flex flex-col gap-5">
      <div className="w-full flex justify-end">
        <ExportToCSV
          dataset={data}
          jsonToCSVReformerter={customersExportFormater}
          fileName="customers-list"
        />
      </div>
      <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
        <h2 className="text-xl font-semibold">Customers Lists</h2>
        <div className=" max-w-md">
          <TableSearch placeholder="First name, last name, email, phone number..." />
        </div>
        <div className=" flex items-center gap-2 flex-col md:flex-row">
          <Filter actionHandler={handleCustomersFiltering} />
          <Sort id="sort-by" label="Sort by" />{" "}
        </div>
      </div>

      <TableTemplate
        data={data}
        isLoading={isLoading}
        columns={[
          {
            header: "ID",
            key: "id",
            showColumnSort: true,
            render: (row: customersById) => (
              <span className=" rounded-full p-2 border border-primary text-sm">
                {row?.id}
              </span>
            ),
          },
          {
            header: "First Name",
            key: "first_name",
            showColumnSort: true,
            render: (row: customersById) => (
              <span className="text-sm">{row?.first_name}</span>
            ),
          },
          {
            header: "Last Name",
            key: "last_name",
            showColumnSort: true,
            render: (row: customersById) => (
              <span className="text-sm">{row?.last_name}</span>
            ),
          },
          {
            header: "Phone Number",
            key: "phone_number",
            render: (row: customersById) => (
              <span className="text-sm">{row?.phone}</span>
            ),
          },
          {
            header: "Total Booking",
            key: "total_bookings",
            showColumnSort: true,
            render: (row: customersById) => (
              <span className="text-sm">{row?.total_bookings}</span>
            ),
          },
          {
            header: "Identity Verified",
            key: "identity_verified",
            showColumnSort: true,
            render: (row: customersById) => (
              <Status
                status="identity"
                booleanVal={row?.identity_verified}
                falsyMessage="Unverified"
                truthyMessage="Verified"
              />
            ),
          },
          {
            header: "User Type",
            key: "usertype",
            showColumnSort: true,
            render: (row: customersById) => <span>{row?.type}</span>,
          },
          {
            header: "Action",
            key: "action",
            render: (row: customersById) => (
              <TableActionDropDown>
                <>
                  <MenuItem>
                    <Link
                      to={`/customers/customer-details/${row?.id}`}
                      className="p-3 px-4 w-full text-left hover:bg-primary/10 transition-all rounded-lg text-sm"
                    >
                      View Details
                    </Link>
                  </MenuItem>
                  {user?.update && (
                    <MenuItem>
                      <Link
                        to={`/customers/edit-customer/customer-details/${row?.id}`}
                        className="p-3 px-4 w-full text-left hover:bg-primary/10 transition-all rounded-lg text-sm"
                      >
                        Edit Customer
                      </Link>
                    </MenuItem>
                  )}
                  {row?.type === "owner" && user?.update && (
                    <MenuItem>
                      <Link
                        to={`/customers/assign-apartment/${row?.id}`}
                        className="p-3 px-4 w-full text-left hover:bg-primary/10 transition-all rounded-lg text-sm"
                      >
                        Assign to Apartment (s)
                      </Link>
                    </MenuItem>
                  )}
                  {/* <MenuItem>
                            <Link
                              to={`#`}
                              className=" p-3 px-4 w-full text-left hover:bg-primary/10 transition-all rounded-lg"
                            >
                              Send Message
                            </Link>
                          </MenuItem>
                          <MenuItem>
                            <Link
                              to={`#`}
                              className="p-3 px-4 w-full text-left hover:bg-primary/10 transition-all rounded-lg"
                            >
                              Generate Invoice
                            </Link>
                          </MenuItem> */}
                </>
              </TableActionDropDown>
            ),
          },
        ]}
        showPaginator={true}
        pagination={pagination}
      />
    </div>
  );
}
