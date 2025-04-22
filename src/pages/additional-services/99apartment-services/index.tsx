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
import AddEditAdditionalService from "../add-edit-additonal-service";

const breadCrumb = [
  {
    url: "#",
    label: "Additional Services",
    icon: <AdditionIcon />,
  },
];
export default function AptAdditionalServicesList() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "99 Apartment Services",
        pageDescription: "99 apartment services",
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
            <h2 className="text-xl font-semibold"> All Service List</h2>
            <div className=" flex items-center flex-col md:flex-row gap-4">
              {/* <ExportSelect id="customers" /> */}
              <LoadingButton
                clickHandler={() => setOpenNewRequest(true)}
                isLoading={false}
                type="button"
                label="Add New Service"
                startIcon={<PlusIcon />}
              />
            </div>
          </div>
          <div>
            <AdditionalServiceListTable
              header={[
                "Customer Name",
                "Apartment Name",
                "Date of Request",
                "Service Type",
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
        title="Add additional service"
        className=" max-w-md"
      >
        <AddEditAdditionalService setIsOpen={setOpenNewRequest} />
      </ModalTemplate>
    </>
  );
}
