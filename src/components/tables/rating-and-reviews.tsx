import { useCallback, useState } from "react";
import TableSearch from "../inputs/search/table-search";
import Filter from "../filterAndSort/filter";
import NoResult from "../noResult";
import Pagination from "../pagination";
import useGetRatingsAndReviews from "../../services-hooks/useGetRatingsAndReviews";
import formatDate from "../../utils/isoDateConverter";
import CustomRating from "../rating";
import ExportSelect from "../inputs/select/exportSelect";
import Select from "../inputs/select";

export default function RatingsAndReviewsTable() {
  const [filterOption, setFilterOption] = useState("");
  const [search, setSearch] = useState("");
  const [filterDates, setFilterDates] = useState<{
    start_date: string;
    end_date: string;
  }>();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isFailed, setIsFailed, retryFunction, pagination } =
    useGetRatingsAndReviews({
      page: currentPage,
      start_date: filterDates?.start_date,
      end_date: filterDates?.end_date,
      search,
    });
  const handleFiltering = useCallback(
    (start_date: string, end_date: string) => {
      setFilterDates({ start_date, end_date });
    },
    []
  );
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-full flex items-center flex-col md:flex-row justify-between gap-3">
        <div className=" max-w-md">
          <TableSearch setValue={setSearch} placeholder="Search..." />
        </div>
        <div className=" flex items-center gap-3 flex-col md:flex-row">
          <Select
            isRequired={true}
            value={filterOption}
            setValue={setFilterOption}
            id="reviews-rating-filter-1"
          >
            <option value="" disabled>
              All questions
            </option>
          </Select>
          <Filter actionHandler={handleFiltering} />
        </div>
      </div>
      <div className="w-full rounded-lg border p-5 flex flex-col gap-5">
        <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
          <h2 className="text-xl font-semibold">Ratings & Reviews</h2>
          <div className=" w-fit">
            <ExportSelect id="ratings-and-reviews" />
          </div>
        </div>
        <div className="block px-5">
          {data && data.length > 0 ? (
            <div className=" w-full overflow-x-auto">
              <table className=" w-full">
                <thead>
                  <tr>
                    {[
                      "Customer",
                      "Question",
                      "Date Added",
                      "Rating",
                      // "Comment",
                    ].map((head) => (
                      <th key={head}>{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="">
                  {data.map((item) => {
                    return (
                      <tr key={item?.id} className=" border-b">
                        <td>
                          <div className=" flex flex-col">
                            <span className=" capitalize font-semibold text-lg">
                              {item?.user?.first_name} {item?.user?.last_name}
                            </span>
                            <span className=" text-gray-600 text-sm">
                              {item?.user?.email}
                            </span>
                          </div>
                        </td>
                        <td>{item?.question}</td>
                        <td>{formatDate(item?.created_at)}</td>
                        <td>
                          <CustomRating rating={item?.rating} />
                        </td>
                        {/* <td>{item?.comment}</td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <NoResult />
          )}
        </div>
        <Pagination
          pagination={pagination}
          setCurrentPage={setCurrentPage}
          isLoading={isLoading}
          label="Ratings and Reviews"
        />
      </div>
    </div>
  );
}
