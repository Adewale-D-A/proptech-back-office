import { useCallback, useState } from "react";
import TableSearch from "../inputs/search/table-search";
import Filter from "../filterAndSort/filter";
import formatDate from "../../utils/isoDateConverter";
import Select from "../inputs/select";
import useGetReferrals from "../../services-hooks/userGetReferral";
import BinIcon from "../../assets/icons/bin-icon";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import { useAppDispatch } from "../../stores/hooks";
import { removeReferralsInList } from "../../stores/apiData/reeferrals";
import useAxios from "../../useHooks/useAxios";
import ExportToCSV from "../export-to-csv";
import { referalsExportFormater } from "../../utils/export-formerter-functions";
import useExtractUrlParams from "../../useHooks/extract-url-query-params";
import TableTemplate from "./table-template";
import { referrals } from "../../types/apiData/referrals";

export default function ReferralsTable() {
  const axios = useAxios({ disableErrMssg: false, disableSuccMssg: false });
  const dispatch = useAppDispatch();
  const [filterOption, setFilterOption] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [filterDates, setFilterDates] = useState<{
    start_date: string;
    end_date: string;
  }>();

  const [{ page, size, sort, search }] = useExtractUrlParams({
    page: 1,
    size: 20,
    sort: "asc",
    search: "",
  });
  const { data, isLoading, pagination } = useGetReferrals({
    page,
    start_date: filterDates?.start_date,
    end_date: filterDates?.end_date,
    search,
    sort,
    limit: size,
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
            <TableSearch placeholder="Search..." />
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

          <TableTemplate
            data={data}
            isLoading={isLoading}
            columns={[
              {
                header: "Name/Referral contact",
                key: "referral_contact",
                render: (row: referrals, index) => (
                  <div className=" flex flex-col">
                    <span className=" capitalize font-semibold text-lg">
                      {row?.user?.first_name} {row?.user?.last_name}
                    </span>
                    <span className=" text-gray-600 text-sm">
                      {row?.user?.email}
                    </span>
                  </div>
                ),
              },
              {
                header: "Referred By",
                key: "reffered_by",
                showColumnSort: false,
                render: (row: referrals) => (
                  <div className=" flex flex-col">
                    <span className=" capitalize font-semibold text-lg">
                      {row?.referred_user?.first_name}{" "}
                      {row?.referred_user?.last_name}
                    </span>
                    <span className=" text-gray-600 text-sm">
                      {row?.referred_user?.email}
                    </span>
                  </div>
                ),
              },
              {
                header: "Referral Date",
                key: "referral_date",
                render: (row: referrals) => (
                  <span>{formatDate(row?.created_at)}</span>
                ),
              },

              {
                header: "Referral Code",
                key: "referral_code",
                render: (row: referrals) => <span>{row?.referral_code}</span>,
              },
              {
                header: "Action",
                key: "action",
                render: (row: referrals) => (
                  <button onClick={() => handleOpenDelete(row?.id)}>
                    <BinIcon className=" size-6 text-red-500" />
                  </button>
                ),
              },
            ]}
            showPaginator={true}
            pagination={pagination}
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
