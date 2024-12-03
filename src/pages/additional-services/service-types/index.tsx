import { useLayoutEffect, useState } from "react";
import { useAppDispatch } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import ReceiptIcon from "../../../assets/icons/receipt";
import PlusIcon from "../../../assets/icons/plus";
import ServiceTypeTable from "../../../components/tables/serviceTypes";
import ModalTemplate from "../../../components/modal";
import AddEditServiceType from "../../../components/service-type/add-edit";
import LoadingButton from "../../../components/button";

const breadCrumb = [
  {
    url: "#",
    label: "Service Type",
    icon: <ReceiptIcon />,
  },
];
export default function ServiceTypesViewAll() {
  const dispatch = useAppDispatch();
  const [openModal, setOpenModal] = useState(false);
  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Service Type",
        pageDescription: "Service Type",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);

  return (
    <>
      <div className=" w-full flex flex-col gap-4">
        <div className=" w-full flex justify-end">
          <div>
            <LoadingButton
              type="button"
              label="Add Service Type"
              variant={2}
              disabled={false}
              isLoading={false}
              startIcon={<PlusIcon />}
              clickHandler={() => setOpenModal(true)}
            />
          </div>
        </div>
        <ServiceTypeTable />
      </div>

      <ModalTemplate
        open={openModal}
        setOpen={setOpenModal}
        showXicon={true}
        title="Add Service Type"
        className=" max-w-md"
      >
        <AddEditServiceType setOpen={setOpenModal} />
      </ModalTemplate>
    </>
  );
}
