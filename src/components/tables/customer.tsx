import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../pagination";
import NoResult from "../noResult";
import Filter from "../filterAndSort/filter";
import Sort from "../filterAndSort/sort";
import useGetAllCustomersLists from "../../services-hooks/useGetAllCustomersList";
import TableSearch from "../inputs/search/table-search";
import Status from "../status";
import ExportToCSV from "../export-to-csv";
import { customersExportFormater } from "../../utils/export-formerter-functions";
import useGetResourceAccessChecker from "../../utils/admin/useAccessChecker";
import TableActionDropDown from "../drop-down/table-action-dropdown";
import MenuIcon from "../../assets/icons/menu";
import { MenuItem } from "@headlessui/react";

export default function CustomersListTable() {
  const [filterDates, setFilterDates] = useState<{
    start_date: string;
    end_date: string;
  }>();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc");
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
          <TableSearch
            setValue={setSearch}
            placeholder="First name, last name, email, phone number..."
          />
        </div>
        <div className=" flex items-center gap-2 flex-col md:flex-row">
          <Filter actionHandler={handleCustomersFiltering} />
          <Sort setSort={setSort} id="sort-by" label="Sort by" />{" "}
        </div>
      </div>
      {data && data.length > 0 ? (
        <div className=" w-full overflow-x-auto">
          <table className=" w-full">
            <thead>
              <tr>
                {[
                  "ID",
                  "First Name",
                  "Last Name",
                  "Phone Number",
                  "Total Booking",
                  "Identity Verified",
                  "User type",
                  "Action",
                ].map((head) => (
                  <th key={head}>{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item) => {
                return (
                  <tr key={item?.id} className=" border-b">
                    <td>
                      <span className=" rounded-full p-2 border border-primary">
                        {item?.id}
                      </span>
                    </td>
                    <td>{item?.first_name}</td>
                    <td>{item?.last_name}</td>
                    <td>{item?.phone}</td>
                    <td>{item?.total_bookings}</td>
                    <td>
                      <Status
                        status="identity"
                        booleanVal={item?.identity_verified}
                        falsyMessage="Unverified"
                        truthyMessage="Verified"
                      />
                    </td>
                    <td>{item?.type}</td>
                    <td>
                      <TableActionDropDown>
                        <>
                          <MenuItem>
                            <Link
                              to={`/customers/customer-details/${item?.id}`}
                              className="p-3 px-4 w-full text-left hover:bg-primary/10 transition-all rounded-lg"
                            >
                              View Details
                            </Link>
                          </MenuItem>
                          {user?.update && (
                            <MenuItem>
                              <Link
                                to={`/customers/edit-customer/customer-details/${item?.id}`}
                                className="p-3 px-4 w-full text-left hover:bg-primary/10 transition-all rounded-lg"
                              >
                                Edit Customer
                              </Link>
                            </MenuItem>
                          )}
                          {item?.type === "owner" && user?.update && (
                            <MenuItem>
                              <Link
                                to={`/customers/assign-apartment/${item?.id}`}
                                className="p-3 px-4 w-full text-left hover:bg-primary/10 transition-all rounded-lg"
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
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <NoResult />
      )}
      <Pagination
        pagination={pagination}
        setCurrentPage={setCurrentPage}
        isLoading={isLoading}
        label="customers"
      />
    </div>
  );
}
