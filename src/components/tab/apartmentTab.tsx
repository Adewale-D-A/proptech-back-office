import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { ReactNode, useState } from "react";
import LoadingButton from "../button";
import PlusIcon from "../../assets/icons/plus";
import ModalTemplate from "../modal";
import AddEditOption from "../room-extra-options/add-edit-options";
import AddEditAmenities from "../amenities/create-amenities";
import AddEdit from "../amenities/addEdit";
import LinkButton from "../button/linkButton";

export default function ApartmentTab({
  header,
  content,
}: {
  header: { id: string | number; label: string; icon: ReactNode }[];
  content: { id: string | number; data: ReactNode }[];
}) {
  const [trackTab, setTrackTab] = useState(1);
  const [openAddOption, setOpenAddOption] = useState(false);
  const [openAddAmenity, setOpenAddAmenity] = useState(false);
  const [openAddEdit, setOpenAddEdit] = useState(false);

  return (
    <>
      <TabGroup>
        <TabList className={"flex items-center gap-5 flex-col md:flex-row"}>
          <div className="w-full flex flex-col md:flex-row gap-5 md:gap-x-8 flex-wrap ">
            {header.map((item, index) => (
              <Tab
                key={item?.id}
                onClick={() => setTrackTab(index + 1)}
                className={
                  "flex items-center justify-center md:justify-start gap-2 md:gap-3 py-3 border-primary text-gray-400 focus:outline-none data-[selected]:text-primary data-[selected]:border-b-4 data-[hover]:border-b-4 data-[selected]:data-[hover]:border-b-4 data-[hover]:text-primary data-[focus]:outline-1 data-[focus]:outline-white"
                }
              >
                {item?.icon} {item?.label}
              </Tab>
            ))}
          </div>
          <div className="w-fit whitespace-nowrap">
            {trackTab === 1 ? (
              <LinkButton
                url="/add-apartment/apartment-details"
                label="Add New Apartment"
                startIcon={<PlusIcon />}
              />
            ) : trackTab === 2 ? (
              <LoadingButton
                label="Add New Room Option"
                isLoading={false}
                type="button"
                startIcon={<PlusIcon />}
                clickHandler={() => setOpenAddOption(true)}
              />
            ) : trackTab === 3 ? (
              <LoadingButton
                label="New Amenities"
                isLoading={false}
                type="button"
                startIcon={<PlusIcon />}
                clickHandler={() => setOpenAddAmenity(true)}
              />
            ) : trackTab === 4 ? (
              <LoadingButton
                label="New Extra Option"
                isLoading={false}
                type="button"
                clickHandler={() => setOpenAddOption(true)}
                startIcon={<PlusIcon />}
              />
            ) : trackTab === 5 ? (
              <LoadingButton
                label="Add Safety & Security"
                isLoading={false}
                type="button"
                clickHandler={() => setOpenAddEdit(true)}
                startIcon={<PlusIcon />}
              />
            ) : (
              <LoadingButton
                label="Add Rule"
                isLoading={false}
                type="button"
                clickHandler={() => setOpenAddEdit(true)}
                startIcon={<PlusIcon />}
              />
            )}
          </div>
        </TabList>
        <TabPanels>
          {content?.map((item) => (
            <TabPanel key={item?.id} className="my-5">
              {item.data}
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>

      {/* add room/extra option */}
      <ModalTemplate
        open={openAddOption}
        setOpen={setOpenAddOption}
        showXicon={true}
        title={trackTab === 2 ? "Add New Room Option" : "Add New Extra Option"}
        className=" max-w-md"
      >
        <AddEditOption
          setOpenOption={setOpenAddOption}
          option={trackTab === 2 ? "room" : "extra"}
        />
      </ModalTemplate>

      {/*add amenity  */}
      <ModalTemplate
        open={openAddAmenity}
        setOpen={setOpenAddAmenity}
        showXicon={true}
        title="Add New Amenity"
        className=" max-w-md"
      >
        <AddEditAmenities setOpen={setOpenAddAmenity} />
      </ModalTemplate>

      {/*add new template - for sefety and secury and rules pending the time for defined UI */}
      <ModalTemplate
        open={openAddEdit}
        setOpen={setOpenAddEdit}
        showXicon={true}
        title="New Addition"
        className=" max-w-md"
      >
        <AddEdit setOpen={setOpenAddEdit} />
      </ModalTemplate>
    </>
  );
}
