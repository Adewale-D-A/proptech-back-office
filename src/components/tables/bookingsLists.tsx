import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../pagination";
import Status from "../status";

export default function BookingsListTable({
  header,
  data,
  variant,
}: {
  header: string[];
  data: {
    id: string;
    customerName: string;
    rooms: ReactNode;
    checkIn: string;
    status: string;
  }[];
  variant: "status" | "action";
}) {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="w-full flex flex-col gap-5">
      <table className=" w-full text-xs overflow-x-auto">
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
                <td>{request?.customerName}</td>
                <td>{request?.rooms}</td>
                <td>{request?.checkIn}</td>
                {variant === "action" ? (
                  <td>
                    <Link to={`#`} className=" text-primary">
                      View Details
                    </Link>
                  </td>
                ) : (
                  <td>
                    <Status status={request?.status} />
                  </td>
                )}
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
        label=""
      />
    </div>
  );
}
