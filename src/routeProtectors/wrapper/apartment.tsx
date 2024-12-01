import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import BuildingIcon from "../../assets/icons/building";
import AdjustmentIcon from "../../assets/icons/adjustment";
import AmenitiesIcon from "../../assets/icons/amenities";
import ExtraOptionsIcon from "../../assets/icons/extra-options";
import SecurityIcon from "../../assets/icons/security";
import CheckListIcon from "../../assets/icons/check-list";
import LinkButton from "../../components/button/linkButton";
import PlusIcon from "../../assets/icons/plus";
import LoadingButton from "../../components/button";
import ModalTemplate from "../../components/modal";
import AddEditOptions from "../../components/room-extra-options/add-edit-options";
import AddEditAmenities from "../../components/amenities/create-amenities";
import AddEdit from "../../components/amenities/addEdit";
import NavTab from "../../components/tab/nav-tab";

const tabList = [
  {
    id: 1,
    icon: <BuildingIcon />,
    label: "Apartment List",
    url: "/apartments/view-all",
  },
  {
    id: 2,
    icon: <AdjustmentIcon />,
    label: "Room Options",
    url: "/apartments/room-options",
  },
  {
    id: 3,
    icon: <AmenitiesIcon />,
    label: "Amenities",
    url: "/apartments/amenities",
  },
  {
    id: 4,
    icon: <ExtraOptionsIcon />,
    label: "Extra Options",
    url: "/apartments/extra-options",
  },
  {
    id: 5,
    icon: <SecurityIcon />,
    label: "Safety and Security",
    url: "/apartments/safety-and-securities",
  },
  {
    id: 6,
    icon: <CheckListIcon />,
    label: "Rules",
    url: "/apartments/rules",
  },
];
export default function ApartmentTabWrapper() {
  const location = useLocation();
  const [trackTab, setTrackTab] = useState(1);
  const [openAddOption, setOpenAddOption] = useState(false);
  const [openAddAmenity, setOpenAddAmenity] = useState(false);
  const [openAddEdit, setOpenAddEdit] = useState(false);

  //   update current tab value based on the current URL
  useEffect(() => {
    const found = tabList?.find((item) => item?.url === location?.pathname);
    setTrackTab(found?.id || 1);
  }, [location]);

  return (
    <>
      <section className="w-full flex flex-col gap-5">
        <div className={"flex items-center gap-5 flex-col md:flex-row"}>
          <NavTab tabList={tabList} />

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
        </div>
        <Outlet />
      </section>

      {/* add room/extra option */}
      <ModalTemplate
        open={openAddOption}
        setOpen={setOpenAddOption}
        showXicon={true}
        title={trackTab === 2 ? "Add New Room Option" : "Add New Extra Option"}
        className=" max-w-md"
      >
        <AddEditOptions
          setOpenOption={setOpenAddOption}
          componentId={trackTab === 2 ? "room" : "extra"}
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
        <AddEdit
          setOpen={setOpenAddEdit}
          componentId={trackTab === 5 ? "safety" : "rule"}
        />
      </ModalTemplate>
    </>
  );
}
