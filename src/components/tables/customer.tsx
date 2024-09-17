import { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../pagination";
import NoResult from "../noResult";
import Search from "../inputs/search";
import Filter from "../filterAndSort/filter";
import Sort from "../filterAndSort/sort";
import useGetAllCustomersLists from "../../services-hooks/useGetAllCustomersList";

export default function CustomersListTable({ header }: { header: string[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isFailed, setIsFailed, retryFunction, pagination } =
    useGetAllCustomersLists({ page: currentPage });
  //   const [selectedId, setSelectedId] = useState("1");
  return (
    <div className="w-full rounded-lg border p-5 flex flex-col gap-5 overflow-x-auto">
      <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
        <h2 className="text-xl font-semibold">Customers Lists</h2>
        <Search
          placeholder="First name, last name, email, phone number..."
          id="apartment-search"
        />
        <div className=" flex items-center gap-2">
          <Filter />
          <Sort id="sort-by" label="Sort by" />
        </div>
      </div>
      {data && data.length > 0 ? (
        <table className=" w-full text-xs">
          <thead className="">
            <tr className=" text-left bg-gray-200 text-gray-500 rounded-lg">
              {header.map((head) => (
                <th key={head}>{head}</th>
              ))}
            </tr>
          </thead>
          <tbody className="">
            {data.map((request, index) => {
              return (
                <tr key={request?.id} className=" border-b">
                  <td>
                    <span className=" rounded-full p-2 border border-primary">
                      {request?.id}
                    </span>
                  </td>
                  <td>{request?.firstName}</td>
                  <td>{request?.lastName}</td>
                  <td>{request?.phoneNumber}</td>
                  <td>{request?.country}</td>
                  <td>{request?.bookings}</td>
                  <td className=" group relative">
                    <span className=" p-2 text-lg">...</span>
                    <span className="z-10 text-center group-hover:flex hidden w-52 bg-white text-sm absolute right-0 top-0 rounded-lg shadow-lg flex-col">
                      <button
                        //   onClick={() => {
                        //     setSelectedId(request?.id);
                        //     setOpenBookingDetailSummary(true);
                        //   }}
                        className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                      >
                        View Details
                      </button>
                      <Link
                        to={`#`}
                        className=" p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                      >
                        Send Message
                      </Link>
                      <Link
                        to={`#`}
                        className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                      >
                        Generate Invoice
                      </Link>
                      <button
                        type="button"
                        //   onClick={() => {
                        //     setSelectedId(request?.id);
                        //     setOpenDeleteConfirmation(true);
                        //   }}
                        className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                      >
                        Edit Customer
                      </button>
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
      <Pagination
        pagination={{
          current_page: 1,
          last_page: 2,
          per_page: 20,
          total: 24,
          from: 1,
          to: 1,
        }}
        setCurrentPage={setCurrentPage}
        isLoading={false}
        label="customers"
      />
    </div>
  );
}
