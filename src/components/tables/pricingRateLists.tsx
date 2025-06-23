import { useCallback, useState } from "react";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import BinIcon from "../../assets/icons/bin-icon";
import useGetRateListByApartmentId from "../../services-hooks/pricing/useGetRateListByApartmentId";
import useAxios from "../../useHooks/useAxios";
import { useAppDispatch } from "../../stores/hooks";
import { openSnackbar } from "../../stores/appFunctionality/snackbar";
import useGetResourceAccessChecker from "../../utils/admin/useAccessChecker";
import TableTemplate from "./table-template";
import { rateList } from "../../types/apiData/rateList";
import paginatedPageSerializer from "../../utils/page-serializer";
import useExtractUrlParams from "../../useHooks/extract-url-query-params";

export default function PriceRateList({
  apartmentId,
}: {
  apartmentId: string;
}) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const [selectedId, setSelectedId] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [{ page, size }] = useExtractUrlParams({
    page: 1,
    size: 20,
    sort: "asc",
    search: "",
  });

  const { data, pagination, isLoading } = useGetRateListByApartmentId({
    page,
    apartmentId: apartmentId,
    limit: size,
  });

  const handleOpenDelete = useCallback((id: number) => {
    setSelectedId(String(id || ""));
    setOpenDelete(true);
  }, []);

  const handleDelete = useCallback(async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`/admin/rate-list/${selectedId}`);
      dispatch(
        openSnackbar({
          message: "Rate successfully deleted",
          isError: false,
        })
      );
      setOpenDelete(false);
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  }, [selectedId]);

  const { data: rate_list } = useGetResourceAccessChecker({
    resource: "rate-list",
  });
  return (
    <>
      <div className="w-full rounded-lg border p-5 flex flex-col gap-5 overflow-auto">
        <TableTemplate
          data={data}
          isLoading={isLoading}
          columns={[
            {
              header: "S/N",
              key: "sn",
              render: (row: rateList, index) => (
                <span>
                  {paginatedPageSerializer({
                    currentPage: pagination?.current_page,
                    pageSize: pagination?.per_page,
                    index: index || 0,
                  })}
                </span>
              ),
            },
            {
              header: "Rates Per Nights",
              key: "name",
              showColumnSort: true,
              render: (row: rateList) => (
                <span>{row?.number_of_nights} Nights</span>
              ),
            },
            {
              header: "Standard Rates",
              key: "standard_rates",
              render: (row: rateList) => <span>{row?.price}</span>,
            },

            {
              header: "Free Nights",
              key: "free_nights",
              showColumnSort: true,
              render: (row: rateList) => <span></span>,
            },
            {
              header: "Action",
              key: "action",
              render: (row: rateList) => (
                <span>
                  {rate_list?.delete && (
                    <button
                      title="delete"
                      onClick={() => handleOpenDelete(row?.id)}
                    >
                      <BinIcon className=" text-red-500 h-6 w-6" />
                    </button>
                  )}
                </span>
              ),
            },
          ]}
          showPaginator={true}
          pagination={pagination}
        />
      </div>
      <DeleteConfirmation
        open={openDelete}
        setOpen={setOpenDelete}
        isLoading={isDeleting}
        confirmationHandler={handleDelete}
        title="Delete Rate"
        description="Are you sure you want to delete this rate?"
        btnTitle="Yes, I want to"
      />
    </>
  );
}
