export default function BookingHistory() {
  return (
    <div className=" p-3 border-t">
      <table className=" w-full text-xs overflow-x-auto">
        <thead className="">
          <tr className=" text-left bg-gray-200 text-gray-500 rounded-lg">
            {[
              "Event Title",
              "Date of Event",
              "Description",
              "Total Paid",
              "Booking Total",
            ].map((head) => (
              <th key={head}>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody className="">
          {[
            {
              id: "asasas",
              title: "New Stand-by booking",
              date: "18/6/24 10:30am",
              description: "IP - 18:299:00:32",
              paid: "N70,000",
              total: "N150,000",
            },
          ].map((request) => {
            return (
              <tr key={request?.id} className=" border-b">
                <td>{request?.title}</td>
                <td>{request?.date}</td>
                <td>{request?.description}</td>
                <td className=" font-semibold">{request?.paid}</td>
                <td className="font-semibold">{request?.total}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
