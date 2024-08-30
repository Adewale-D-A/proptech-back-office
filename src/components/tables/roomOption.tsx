import { Link } from "react-router-dom";
import Pagination from "../pagination";
import { useState } from "react";
import Sort from "../filterAndSort/sort";

export default function RoomOptionTable({
  header,
  data,
  title,
}: {
  header: string[];
  data: {
    id: number;
    categoryName: string;
    description: string;
  }[];
  title: string;
}) {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <div className="w-full rounded-lg border p-5 flex flex-col gap-5 overflow-x-auto">
        <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
          <h2 className="text-xl font-semibold">{title}</h2>
          <Sort id="room-options" label="Sort Category" />{" "}
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
                  <td>{request?.categoryName}</td>
                  <td>{request?.description}</td>
                  <td className=" group relative">
                    <span className=" p-2 text-lg">...</span>
                    <span className="z-10 text-center group-hover:flex hidden w-52 bg-white text-sm absolute right-0 top-0 rounded-lg shadow-lg flex-col">
                      <Link
                        to="#"
                        className=" p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                      >
                        Edit Room Option
                      </Link>
                      <button
                        type="button"
                        className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                      >
                        Delete Room Option
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
