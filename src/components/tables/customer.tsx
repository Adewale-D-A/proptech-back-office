import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../pagination";
import NoResult from "../noResult";
import Filter from "../filterAndSort/filter";
import Sort from "../filterAndSort/sort";
import useGetAllCustomersLists from "../../services-hooks/useGetAllCustomersList";
import TableSearch from "../inputs/search/table-search";
import MobileCustomersTable from "./mobile/customers";
import Status from "../status";

export default function CustomersListTable() {
  const [filterDates, setFilterDates] = useState<{
    start_date: string;
    end_date: string;
  }>();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isFailed, setIsFailed, retryFunction, pagination } =
    useGetAllCustomersLists({
      page: currentPage,
      start_date: filterDates?.start_date,
      end_date: filterDates?.end_date,
      sort: sort,
      search,
    });
  const handleCustomersFiltering = useCallback(
    (start_date: string, end_date: string) => {
      setFilterDates({ start_date, end_date });
    },
    []
  );
  return (
    <div className="w-full rounded-lg border p-5 flex flex-col gap-5">
      <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
        <h2 className="text-xl font-semibold">Customers Lists</h2>
        <div className=" max-w-md">
          <TableSearch
            setValue={setSearch}
            placeholder="First name, last name, email, phone number..."
          />
        </div>
        <div className=" flex items-center gap-2 flex-col md:flex-row">
          <Filter actionHandler={handleCustomersFiltering} />
          <Sort setSort={setSort} id="sort-by" label="Sort by" />
        </div>
      </div>
      <div className="hidden md:block px-5">
        {data && data.length > 0 ? (
          <table className=" w-full text-xs  overflow-x-auto">
            <thead className="">
              <tr className=" text-left bg-gray-200 text-gray-500 rounded-lg">
                {[
                  "ID",
                  "First Name",
                  "Last Name",
                  "Phone Number",
                  "Total Booking",
                  "Identuty Verified",
                  "Action",
                ].map((head) => (
                  <th key={head}>{head}</th>
                ))}
              </tr>
            </thead>
            <tbody className="">
              {data.map((request) => {
                return (
                  <tr key={request?.id} className=" border-b">
                    <td>
                      <span className=" rounded-full p-2 border border-primary">
                        {request?.id}
                      </span>
                    </td>
                    <td>{request?.first_name}</td>
                    <td>{request?.last_name}</td>
                    <td>{request?.phone}</td>
                    <td>{request?.total_bookings}</td>
                    <td>
                      <Status
                        status="identity"
                        booleanVal={request?.identity_verified}
                        falsyMessage="Unverified"
                        truthyMessage="Verified"
                      />
                    </td>
                    <td className=" group relative">
                      <span className=" p-2 text-lg">...</span>
                      <span className="z-10 text-center group-hover:flex hidden w-52 bg-white text-sm absolute right-0 top-0 rounded-lg shadow-lg flex-col">
                        {/* <Link
                          to={`#`}
                          className=" p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Send Message
                        </Link> */}
                        {/* <Link
                          to={`#`}
                          className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Generate Invoice
                        </Link> */}
                        <Link
                          to={`/customers/customer-details/${request?.id}`}
                          className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                        >
                          View Details
                        </Link>
                        <Link
                          to={`/customers/edit-customer/customer-details/${request?.id}`}
                          className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Edit Customer
                        </Link>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <NoResult />
        )}
      </div>
      <div className="w-full block md:hidden">
        <MobileCustomersTable data={data} />
      </div>
      <Pagination
        pagination={pagination}
        setCurrentPage={setCurrentPage}
        isLoading={isLoading}
        label="customers"
      />
    </div>
  );
}
