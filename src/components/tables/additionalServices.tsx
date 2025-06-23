import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import useGetAllAdditionalServiceLists from "../../services-hooks/useGetAllAdditionalServiceLists";
import Status from "../status";
import { useAppDispatch } from "../../stores/hooks";
import {
  markAdditionalServiceItemAsResolved,
  removeAdditionalServicesInList,
} from "../../stores/apiData/additional-services-lists";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import formatDate from "../../utils/isoDateConverter";
import TableSearch from "../inputs/search/table-search";
import useAxios from "../../useHooks/useAxios";
import { openSnackbar } from "../../stores/appFunctionality/snackbar";
import TableActionDropDown from "../drop-down/table-action-dropdown";
import { MenuItem } from "@headlessui/react";
import useGetResourceAccessChecker from "../../utils/admin/useAccessChecker";
import ExportToCSV from "../export-to-csv";
import { additionalServiceExportFormater } from "../../utils/export-formerter-functions";
import useExtractUrlParams from "../../useHooks/extract-url-query-params";
import TableTemplate from "./table-template";
import { additionalService } from "../../types/apiData/additionalServices";

export default function AdditionalServiceListTable({
  header,
}: {
  header: string[];
}) {
  const dispatch = useAppDispatch();
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });

  const [{ search, page, size, sort }] = useExtractUrlParams({
    page: 1,
    size: 20,
    search: "",
    sort: "asc",
  });
  const { data, isLoading, pagination } = useGetAllAdditionalServiceLists({
    page,
    sort,
    search,
    limit: size,
  });

  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState("1");

  const deleteAdditionalServices = useCallback(() => {
    setIsDeleting(true);
    try {
      dispatch(removeAdditionalServicesInList({ id: deleteId }));
      setOpenDeleteConfirmation(false);
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  }, [deleteId]);

  const markedAsResolved = useCallback(async (id: number) => {
    try {
      const response = await axios.put(
        `/admin/additional-service/mark-resolved/${id}`
      );
      const result = response?.data?.data;
      // console.log({ response });
      dispatch(markAdditionalServiceItemAsResolved(result));
      dispatch(
        openSnackbar({
          message: "Succefully marked as resolved",
          isError: false,
        })
      );
    } catch (error) {}
  }, []);

  // const deleteModal = useCallback((id: number) => {
  //   setDeleteId(String(id));
  //   setOpenDeleteConfirmation(true);
  // }, []);

  const { data: additional_services } = useGetResourceAccessChecker({
    resource: "additional-service",
  });
  return (
    <>
      <div className="w-full rounded-lg border p-5 flex flex-col gap-5">
        <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
          <div className=" max-w-md">
            <TableSearch placeholder="Search service name, apartment name..." />
          </div>
          <ExportToCSV
            dataset={data}
            jsonToCSVReformerter={additionalServiceExportFormater}
            fileName="additional-services"
          />
        </div>
        <TableTemplate
          data={data}
          isLoading={isLoading}
          columns={[
            {
              header: "Customer Name",
              key: "customer_name",
              showColumnSort: true,
              render: (row: additionalService) => (
                <span>
                  {row?.user?.first_name} {row?.user?.last_name}
                </span>
              ),
            },
            {
              header: "Apartment Name",
              key: "apartment_name",
              showColumnSort: true,
              render: (row: additionalService) => (
                <span>{row?.booking?.shortlet?.name} Guests</span>
              ),
            },
            {
              header: "Date of Request",
              key: "date_of_request",
              showColumnSort: true,
              render: (row: additionalService) => (
                <span>{formatDate(row?.created_at)}</span>
              ),
            },
            {
              header: "Service Type",
              key: "service_type",
              showColumnSort: true,
              render: (row: additionalService) => (
                <span>{row?.service_type?.name}</span>
              ),
            },
            {
              header: "Description",
              key: "description",
              showColumnSort: true,
              render: (row: additionalService) => (
                <span>{row?.description}</span>
              ),
            },
            {
              header: "Escalated Status",
              key: "escalated_status",
              showColumnSort: true,
              render: (row: additionalService) => (
                <Status
                  status="additional-service-escalte"
                  booleanVal={Boolean(row?.is_escalated)}
                  falsyMessage="Not Escalated"
                  truthyMessage="Escalated"
                />
              ),
            },
            {
              header: "Status",
              key: "status",
              showColumnSort: true,
              render: (row: additionalService) => (
                <Status status={row?.status} />
              ),
            },
            {
              header: "Action",
              key: "action",
              render: (row: additionalService) => (
                <TableActionDropDown>
                  <>
                    <MenuItem>
                      <Link
                        to={`/additional-services/service-details/${row?.id}`}
                        className="w-full p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                      >
                        View Details
                      </Link>
                    </MenuItem>
                    {additional_services?.update && (
                      <MenuItem>
                        <button
                          type="button"
                          onClick={() => markedAsResolved(row?.id)}
                          className="text-left w-full p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Mark As Resolved
                        </button>
                      </MenuItem>
                    )}
                    {/* {additional_services?.delete && (
                              <MenuItem>
                                <button
                                  type="button"
                                  onClick={() => {
                                    deleteModal(item?.id);
                                  }}
                                  className="w-full p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                                >
                                  Delete Service
                                </button>
                              </MenuItem>
                            )} */}
                  </>
                </TableActionDropDown>
              ),
            },
          ]}
          showPaginator={true}
          pagination={pagination}
        />
      </div>

      <DeleteConfirmation
        confirmationHandler={deleteAdditionalServices}
        isLoading={isDeleting}
        btnTitle="Yes, I want to"
        title="Delete Service"
        description="Are you sure you want to delete this service"
        open={openDeleteConfirmation}
        setOpen={setOpenDeleteConfirmation}
      />
    </>
  );
}
