import { Link } from "react-router-dom";
import Status from "../status";
import LocationPinIcon from "../../assets/icons/location";
import Pagination from "../pagination";
import { useState } from "react";
import Search from "../inputs/search";
import Sort from "../filterAndSort/sort";

export default function ApartmentListsTable({
  header,
  data,
  title,
}: {
  header: string[];
  data: {
    id: number;
    apartmentInfo: {
      name: string;
      image: string;
      location: string;
    };
    noOfGuests: string;
    category: string;
    characteristics: string;
    units: string;
    status: string;
  }[];
  title: string;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [openReservation, setOpenReservation] = useState(false);

  return (
    <>
      <div className="w-full rounded-lg border p-5 flex flex-col gap-5 overflow-x-auto">
        <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
          <h2 className="text-xl font-semibold">{title}</h2>
          <Search
            placeholder="Apartment name, type, location..."
            id="apartment-search"
          />
          <Sort id="apartment-lists" label="Sort Category" />{" "}
        </div>
        <table className=" w-full">
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
                  <td className=" flex gap-2 items-center min-w-36">
                    <img
                      src={request?.apartmentInfo?.image}
                      alt={request?.apartmentInfo?.name}
                      className=" h-10 w-10 rounded aspect-square"
                    />
                    <span className=" flex flex-col gap-1">
                      <span>{request?.apartmentInfo?.name}</span>
                      <span className=" text-xs text-gray-500 flex items-center gap-1">
                        <LocationPinIcon className=" h-3 w-3" />
                        {request?.apartmentInfo?.location}
                      </span>
                    </span>
                  </td>
                  <td className=" text-lg  min-w-36">
                    {request?.noOfGuests} Guests
                  </td>
                  <td>{request?.category}</td>
                  <td>{request?.characteristics} Characteristics</td>
                  <td>{request?.units}</td>
                  <td>
                    <Status status={request?.status} />
                  </td>
                  <td className=" group relative">
                    <span className=" p-2 text-lg">...</span>
                    <span className="z-10 text-center group-hover:flex hidden w-52 bg-white text-sm absolute right-0 top-0 rounded-lg shadow-lg flex-col">
                      <Link
                        to={`/apartments-details/${request?.id}`}
                        className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                      >
                        View Apartment
                      </Link>
                      <Link
                        to="#"
                        className=" p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                      >
                        Edit Apartment
                      </Link>
                      <Link
                        to="#"
                        className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                      >
                        Check Calender
                      </Link>
                      <Link
                        to="#"
                        className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                      >
                        View Rates
                      </Link>
                      <button
                        type="button"
                        onClick={() => setOpenReservation(true)}
                        className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                      >
                        Delete Apartment
                      </button>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
          label="Apartment"
        />
      </div>
    </>
  );
}
