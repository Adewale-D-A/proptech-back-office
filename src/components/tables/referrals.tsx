import { useCallback, useState } from "react";
import TableSearch from "../inputs/search/table-search";
import Filter from "../filterAndSort/filter";
import NoResult from "../noResult";
import Pagination from "../pagination";
import formatDate from "../../utils/isoDateConverter";
import ExportSelect from "../inputs/select/exportSelect";
import Select from "../inputs/select";
import useGetReferrals from "../../services-hooks/userGetReferral";
import BinIcon from "../../assets/icons/bin-icon";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import { useAppDispatch } from "../../stores/hooks";
import { removeReferralsInList } from "../../stores/apiData/reeferrals";
import useAxios from "../../useHooks/useAxios";
import ExportToCSV from "../export-to-csv";
import { referalsExportFormater } from "../../utils/export-formerter-functions";

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
      await axios.delete(`/admin/referral/${selectedId}`);
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
              <option value="">All referrals</option>
            </Select>
            <Filter actionHandler={handleFiltering} />
          </div>
        </div>
        <div className="w-full rounded-lg border p-5 flex flex-col gap-5">
          <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
            <h2 className="text-xl font-semibold">Referrals</h2>
            <div className=" w-fit">
              <ExportToCSV
                dataset={data}
                jsonToCSVReformerter={referalsExportFormater}
                fileName="referrals"
              />
            </div>
          </div>
          <div className="block px-5">
            {data && data.length > 0 ? (
              <div className=" w-full overflow-x-auto">
                <table className=" w-full">
                  <thead>
                    <tr>
                      {[
                        "Name/Referral contact",
                        "Referred by",
                        "Referral date",
                        "Referral code",
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
                          <td>
                            <div className=" flex flex-col">
                              <span className=" capitalize font-semibold text-lg">
                                {item?.referred_user?.first_name}{" "}
                                {item?.referred_user?.last_name}
                              </span>
                              <span className=" text-gray-600 text-sm">
                                {item?.referred_user?.email}
                              </span>
                            </div>
                          </td>
                          <td>{formatDate(item?.created_at)}</td>
                          <td>{item?.referral_code}</td>
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
              </div>
            ) : (
              <NoResult />
            )}
          </div>
          <Pagination
            pagination={pagination}
            setCurrentPage={setCurrentPage}
            isLoading={isLoading}
            label="Referrals"
          />
        </div>
      </div>

      <DeleteConfirmation
        open={openDelete}
        setOpen={setOpenDelete}
        isLoading={isDeleting}
        confirmationHandler={handleDelete}
        title="Delete Referral"
        description="Are you sure you want to delete this referral?"
        btnTitle="Yes, I want to"
      />
    </>
  );
}
