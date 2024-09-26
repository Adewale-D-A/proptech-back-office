import { useParams } from "react-router-dom";
import { useLayoutEffect, useState } from "react";
import AdditionIcon from "../../../assets/icons/addtion";
import { useAppDispatch } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import ExportSelect from "../../../components/inputs/select/exportSelect";
import PlusIcon from "../../../assets/icons/plus";
import AdditionalServiceListTable from "../../../components/tables/additionalServices";
import LoadingButton from "../../../components/button";
import ModalTemplate from "../../../components/modal";
import NewAdventure from "../../../components/booking-detail/add-adventure";
import VendorServiceListTable from "../../../components/tables/vendorServices";

const breadCrumb = [
  {
    url: "#",
    label: "Additional Services",
    icon: <AdditionIcon />,
  },
];
export default function VendorServicesList() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Vendor Services",
        pageDescription: "All vendor services",
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
      <section className="w-full flex flex-col items-center my-5">
        <div className="w-full max-w-screen-xl flex flex-col gap-10">
          <div className=" w-full flex justify-between">
            <h2 className="text-xl font-semibold"> All Vendor Services</h2>
            <div className=" flex items-center gap-4">
              <ExportSelect id="customers" />
              <LoadingButton
                clickHandler={() => setOpenNewRequest(true)}
                isLoading={false}
                type="button"
                label="Add New Adventure"
                startIcon={<PlusIcon />}
              />
            </div>
          </div>
          <div>
            <VendorServiceListTable
              header={[
                "S/N",
                "Vendor Name",
                "Service Type",
                "Description",
                "Date Created",
                "Price Per Person",
                "No of Bookings",
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
        title="Add New Service"
        className=" max-w-md"
      >
        <NewAdventure setValue={setOpenNewRequest} />
      </ModalTemplate>
    </>
  );
}
