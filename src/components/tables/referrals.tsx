import { useCallback, useState } from "react";
import TableSearch from "../inputs/search/table-search";
import Filter from "../filterAndSort/filter";
import NoResult from "../noResult";
import Pagination from "../pagination";
import formatDate from "../../utils/isoDateConverter";
import ExportSelect from "../inputs/select/exportSelect";
import Select from "../inputs/select";
import useGetReferrals from "../../services-hooks/userGetReferral";
import Status from "../status";
import BinIcon from "../../assets/icons/bin-icon";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import { useAppDispatch } from "../../stores/hooks";
import { removeReferralsInList } from "../../stores/apiData/reeferrals";
import useAxios from "../../useHooks/useAxios";

export default function ReferralsTable() {
  const axios = useAxios({ disableErrMssg: false, disableSuccMssg: false });
  const dispatch = useAppDispatch();
  const [filterOption, setFilterOption] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [search, setSearch] = useState("");
  const [filterDates, setFilterDates] = useState<{
    start_date: string;
    end_date: string;
  }>();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isFailed, setIsFailed, retryFunction, pagination } =
    useGetReferrals({
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

  const handleOpenDelete = useCallback((id: number) => {
    setSelectedId(String(id) || "");
    setOpenDelete(true);
  }, []);

  const handleDelete = useCallback(async () => {
    setIsDeleting(true);
    try {
      // await axios.delete(`/admin/extra-option/${selectedId}`);
      dispatch(removeReferralsInList({ id: Number(selectedId) }));
      setOpenDelete(false);
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  }, [selectedId]);
  return (
    <>
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
                All referrals
              </option>
            </Select>
            <Filter actionHandler={handleFiltering} />
          </div>
        </div>
        <div className="w-full rounded-lg border p-5 flex flex-col gap-5">
          <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
            <h2 className="text-xl font-semibold">Referrals</h2>
            <div className=" w-fit">
              <ExportSelect id="ratings-and-reviews" />
            </div>
          </div>
          <div className="block px-5">
            {data && data.length > 0 ? (
              <table className=" w-full overflow-x-auto">
                <thead className="">
                  <tr className=" text-left bg-gray-200 text-gray-500 rounded-lg">
                    {[
                      "Name/Referral contact",
                      "Referred by",
                      "Referral date",
                      "Status",
                      "Action",
                    ].map((head) => (
                      <th key={head}>{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="">
                  {data.map((item) => {
                    return (
                      <tr key={item?.id} className=" border-b">
                        <td className=" text-lg  min-w-36">
                          <div className=" flex flex-col">
                            {item?.user?.first_name} {item?.user?.last_name}
                            <span className=" text-gray-600 text-sm">
                              {item?.user?.email}
                            </span>
                          </div>
                        </td>
                        <td>{item?.referred_by}</td>
                        <td>{formatDate(item?.referral_date)}</td>
                        <td>
                          <Status status={item?.status} />
                        </td>
                        <td>
                          <button onClick={() => handleOpenDelete(item?.id)}>
                            <BinIcon className=" size-6 text-red-500" />
                          </button>
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
          <Pagination
            pagination={pagination}
            setCurrentPage={setCurrentPage}
            isLoading={isLoading}
            label="Apartment"
          />
        </div>
      </div>

      <DeleteConfirmation
        open={openDelete}
        setOpen={setOpenDelete}
        isLoading={isDeleting}
        confirmationHandler={handleDelete}
        title="Delete Extra Option"
        description="Are you sure you want to delete this extra option?"
        btnTitle="Yes, I want to"
      />
    </>
  );
}
