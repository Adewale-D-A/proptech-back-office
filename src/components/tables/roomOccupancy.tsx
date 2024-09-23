import { useState } from "react";
import Pagination from "../pagination";

export default function RoomOccupancyListTable({
  header,
  data,
}: {
  header: string[];
  data: {
    id: string;
    apartmentName: string;
    customerName: string;
    amount: string;
    checkIn: string;
    checkOut: string;
  }[];
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
                <td>{index + 1}</td>
                <td>{request?.apartmentName}</td>
                <td>{request?.customerName}</td>
                <td>{request?.amount}</td>
                <td>{request?.checkIn}</td>
                <td>{request?.checkOut}</td>
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
