import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../stores/hooks";
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import UsersIcon from "../../../assets/icons/users";
import UserPlusIcon from "../../../assets/icons/user-plus";
import useGetCustomerById from "../../../services-hooks/useGetCustomerById";
import useAxios from "../../../useHooks/useAxios";
import formatDate from "../../../utils/isoDateConverter";
import LoadingButton from "../../../components/button";
import NoResult from "../../../components/noResult";
import LinkButton from "../../../components/button/linkButton";
import WriteIcon from "../../../assets/icons/write";
import { openSnackbar } from "../../../stores/appFunctionality/snackbar";
import useGetBuildings from "../../../services-hooks/apartment/useGetBuildings";
import { apartmentById } from "../../../types/apiData/apartment";

const breadCrumb = [
  {
    url: "/customers",
    label: "Customers",
    icon: <UsersIcon />,
  },
  {
    url: "#",
    label: "Assign Apartment",
    icon: <UserPlusIcon />,
  },
];
export default function AssignApartmentToOwner() {
  const { owner_id } = useParams();
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const { data, isLoading, isFailed, setIsFailed, retryFunction } =
    useGetCustomerById(owner_id);
  const { data: buildings } = useGetBuildings({ page: 1, limit: 100 });

  const [submitting, setSubmitting] = useState(false);
  const [buildingId, setBuildingId] = useState("");
  const [value, setValue] = useState<string[]>([]);
  const [defaultAssigned, setDefaultAssigned] = useState<string[]>([]);
  const [removed, setRemoved] = useState<string[]>([]);

  const [apartments, setApartment] = useState<apartmentById[]>([]);
  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Assign Apartment",
        pageDescription: "Assign apartment to owner",
        isLoading: isLoading,
        failedToLoad: isFailed,
        setFailedToLoad: setIsFailed,
        retryRequest: retryFunction,
      })
    );
  }, [isLoading, isFailed, setIsFailed, retryFunction]);

  //   Auto populate with existing user's apartments
  useEffect(() => {
    setValue(data?.shortlets?.map((item) => String(item?.id)) || []);
    setDefaultAssigned(data?.shortlets?.map((item) => String(item?.id)) || []);
  }, [data]);

  const handleBuildingChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      setBuildingId(value);
      const relatedApartments = buildings.find(
        (item) => String(item.id) === value
      )?.shortlets;
      setApartment(relatedApartments || []);
    },
    [buildings]
  );

  //handle selection
  const handleAssignedSelection = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked;
      const value = e.target.value;
      const name = e.target.name;
      if (checked) {
        setDefaultAssigned((prev: string[]) => [...prev, value]);
      } else {
        setRemoved((prev: string[]) => [...prev, value]);
        setDefaultAssigned((prev: string[]) => {
          const currentIndex = prev.findIndex((item) => value === item);
          const deepCopy = [...prev];
          deepCopy.splice(currentIndex, 1);
          return deepCopy;
        });
      }
    },
    []
  );

  //handle selection
  const handleApartmentSelection = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked;
      const value = e.target.value;
      const name = e.target.name;
      if (checked) {
        setValue((prev: string[]) => [...prev, value]);
      } else {
        setValue((prev: string[]) => {
          const currentIndex = prev.findIndex((item) => value === item);
          const deepCopy = [...prev];
          deepCopy.splice(currentIndex, 1);
          return deepCopy;
        });
      }
    },
    []
  );

  const assginApartment = useCallback(async () => {
    try {
      setSubmitting(true);
      await axios.post(`/admin/user/${owner_id}`, {
        shortlets: value,
        remove_shortlets: Array.from(new Set(removed)),
      });
      dispatch(
        openSnackbar({
          message: "Apartment(s) successfully assigned to owner",
          isError: false,
        })
      );
    } catch (error) {
    } finally {
      setSubmitting(false);
    }
  }, [owner_id, value, removed]);

  return (
    <section className="w-full flex flex-col items-center my-5">
      <div className="w-full max-w-screen-xl flex flex-col gap-10">
        <div className=" w-fit">
          <LinkButton
            url={`/customers/edit-customer/customer-details/${owner_id}`}
            label="Edit"
            variant={2}
            endIcon={<WriteIcon className="h-5 w-5" />}
          />
        </div>
        {/* basic information*/}
        <h3 className=" text-lg font-semibold">Personal Information</h3>
        <div className="w-full shadow-md rounded-md p-5 flex flex-col gap-4">
          <div>
            <img
              src={data?.profile_photo || "/logo_blue.png"}
              className=" w-32 h-32 object-cover rounded-full"
            />
          </div>
          <div className=" w-full grid grid-col-1 md:grid-cols-3 gap-3">
            {[
              {
                label: "First Name",
                value: data?.first_name,
              },
              {
                label: "Last name",
                value: data?.last_name,
              },
              {
                label: "Gender",
                value: data?.gender,
              },
              {
                label: "Date of Birth",
                value: formatDate(data?.dob),
              },
              {
                label: "Phone Number",
                value: data?.phone,
              },
              {
                label: "Email",
                value: data?.email,
              },
              {
                label: "Email verification Status",
                value: formatDate(data?.email_verified_at) || "Unveriffied",
              },
            ].map((item) => (
              <span key={item?.label}>
                {item?.label}: <b>{item?.value}</b>
              </span>
            ))}
            <div className=" flex items-start gap-2">
              <span>Assigned Apartments:</span>{" "}
              <div className=" flex items-center gap-4 px-3 flex-wrap">
                {data?.shortlets?.map((item) => (
                  <label
                    key={item?.id}
                    htmlFor={String(item?.id)}
                    className=" flex items-center gap-3"
                  >
                    <input
                      type="checkbox"
                      checked={defaultAssigned.includes(String(item?.id))}
                      id={String(item?.id)}
                      name={item?.name}
                      value={item?.id}
                      onChange={handleAssignedSelection}
                    />
                    <span className=" text-gray-600">{item?.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Apartment Assignment */}
        {data?.type === "owner" && (
          <div className=" w-full flex flex-col  gap-10">
            <h3 className=" text-lg font-semibold">Assign Apartment</h3>
            <div className=" w-full shadow-lg rounded-md p-5 ">
              <div className="w-full flex flex-col gap-1">
                <label
                  htmlFor={"Building"}
                  className="text-[#344054] text-sm font-medium"
                >
                  Building
                </label>
                <label
                  htmlFor={"Building"}
                  className="w-full relative  rounded-md border flex items-center gap-3"
                >
                  <select
                    id={"Building"}
                    title={"Building"}
                    value={buildingId}
                    onChange={(e) => handleBuildingChange(e)}
                    className="w-full sm:text-md bg-transparent p-3 px-6 disabled:border-gray-300 disabled:text-gray-300"
                  >
                    <option value={""} disabled>
                      Buildings
                    </option>
                    {buildings?.map((item) => (
                      <option key={item?.id} value={`${item?.id}`}>
                        {item?.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className=" my-10 shadow-sm shadow-primary  p-3">
                <label className=" font-semibold text-lg italic">
                  Related Apartments
                </label>
                {apartments.length > 0 ? (
                  <div className=" flex items-center gap-4 p-3 flex-wrap">
                    {apartments?.map((item) => (
                      <label
                        key={item?.id}
                        htmlFor={String(item?.id)}
                        className=" flex items-center gap-3"
                      >
                        <input
                          type="checkbox"
                          checked={value.includes(String(item?.id))}
                          id={String(item?.id)}
                          name={item?.name}
                          value={item?.id}
                          onChange={handleApartmentSelection}
                        />
                        <span className=" text-gray-600">{item?.name}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <NoResult
                    message="No apartment found in this building"
                    title="No Apartment Found"
                  />
                )}
              </div>
            </div>
            <div className=" w-full flex justify-end">
              <div className=" w-fit">
                <LoadingButton
                  label="Assign Apartments"
                  clickHandler={assginApartment}
                  type="submit"
                  isLoading={submitting}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
