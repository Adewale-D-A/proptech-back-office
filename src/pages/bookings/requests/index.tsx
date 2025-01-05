import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../stores/hooks";
import { useLayoutEffect, useState } from "react";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import CalendarIcon from "../../../assets/icons/calendar";
import PlusIcon from "../../../assets/icons/plus";
import ExportSelect from "../../../components/inputs/select/exportSelect";
import RequestsListTable from "../../../components/tables/requestsLists";
import ModalTemplate from "../../../components/modal";
import NewRequest from "../../../components/booking-detail/new-request";
import LoadingButton from "../../../components/button";

const breadCrumb = [
  {
    url: "/bookings/overview",
    label: "Bookings",
    icon: <CalendarIcon />,
  },
  {
    url: "#",
    label: "Requests",
    icon: "",
  },
];
export default function Requests() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Requests",
        pageDescription: "Requests",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);

  const [openNewRequest, setOpenNewRequest] = useState(false);
  return (
    <>
      <section className="w-full flex flex-col items-center my-10">
        <div className="w-full max-w-screen-xl flex flex-col gap-10">
          <div className=" w-full flex justify-between">
            <h2 className="text-xl font-semibold">All Requests List</h2>
            <div className=" flex items-center gap-4">
              <ExportSelect id="bookings" />
              <LoadingButton
                clickHandler={() => setOpenNewRequest(true)}
                isLoading={false}
                type="button"
                label="Add Request"
                startIcon={<PlusIcon />}
              />
            </div>
          </div>
          <div>
            <RequestsListTable
              header={[
                "Customer Name",
                "Apartment Name",
                "Date of Request",
                "Request Type",
                "Description",
                "Escalated Status",
                "Status",
                "Action",
              ]}
            />
          </div>
        </div>
      </section>

      <ModalTemplate
        open={openNewRequest}
        setOpen={setOpenNewRequest}
        showXicon={true}
        title="Add New Request"
        className=" max-w-md"
      >
        <NewRequest setValue={setOpenNewRequest} />
      </ModalTemplate>
    </>
  );
}
