import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import BuildingIcon from "../../assets/icons/building";
import LinkButton from "../../components/button/linkButton";
import PlusIcon from "../../assets/icons/plus";
import ModalTemplate from "../../components/modal";
import AddEditOptions from "../../components/room-extra-options/add-edit-options";
import AddEditAmenities from "../../components/amenities/create-amenities";
import AddEdit from "../../components/amenities/addEdit";

const tabList = [
  {
    id: 1,
    icon: <BuildingIcon />,
    label: "Apartments",
    url: "/invoices/apartment",
  },
  {
    id: 2,
    icon: <PlusIcon />,
    label: "Additional services",
    url: "/invoices/additional-sevices",
  },
];
export default function InvoicesTabWrapper() {
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
          <nav className="w-full flex items-center gap-4 px-5 ">
            {tabList?.map((items) => {
              return (
                <div key={items?.id} className="w-full group">
                  <NavLink
                    to={items?.url}
                    className={({ isActive }) =>
                      isActive
                        ? `flex items-center justify-center md:justify-start gap-2 md:gap-3 py-3 border-primary focus:outline-none text-primary border-b-4  data-[hover]:text-primary outline-1 outline-white`
                        : `flex items-center justify-center md:justify-start gap-2 md:gap-3 py-3 border-primary text-gray-400 focus:outline-none hover:border-b-4  hover:text-primary focus:outline-1 focus:outline-white`
                    }
                  >
                    {items?.icon} {items?.label}
                  </NavLink>
                </div>
              );
            })}
          </nav>

          <div className="w-fit whitespace-nowrap">
            <LinkButton
              url="/invoices/add-new-invoice"
              label="New Invoice"
              startIcon={<PlusIcon />}
            />
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
