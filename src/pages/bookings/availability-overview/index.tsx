import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useAppDispatch } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import CalendarIcon from "../../../assets/icons/calendar";
import Select from "../../../components/inputs/select";
import daysMonths from "../../../assets/days-months.json";
import ChevronLeftIcon from "../../../assets/icons/chevron-left";
import ChevronRightIcon from "../../../assets/icons/chevron-right";
import BuildingIcon from "../../../assets/icons/building";
import generateCalendarData from "../../../utils/generateCalendarData";
import useGetAllApartmentLists from "../../../services-hooks/useGetAllApartmentLists";
import { apartmentById } from "../../../types/apiData/apartment";
import useGetApartmentCalendar from "../../../services-hooks/apartmentCalendar";
import useGetApartmentsCalendar from "../../../services-hooks/useGetApartmentsCalendar";
import ApartmentSingleSearch from "../../../components/inputs/search/apartment-single-search";

const breadCrumb = [
  {
    url: "/bookings/overview",
    label: "Bookings",
    icon: <CalendarIcon />,
  },
  {
    url: "#",
    label: "Availability Overview",
    icon: "",
  },
];
const today = new Date();
export default function AvailabilityOverview() {
  const dispatch = useAppDispatch();

  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Availability Overview",
        pageDescription: "Availability overview",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);
  const [search, setSeach] = useState("");
  const [selectedApt, setSelectedApt] = useState<apartmentById>({} as any);
  const [month, setMonth] = useState(daysMonths?.months[today?.getMonth()]);
  const [year, setYear] = useState(String(today?.getFullYear()));

  const [currentDay, setCurrentDay] = useState(
    new Date(today?.getFullYear(), today?.getMonth(), today?.getDate())
  );
  const [currentDays, setCurrentDays] = useState<
    {
      currentMonth: boolean;
      date: Date;
      month: number;
      day: number;
      isoStringDate: string;
      weekday: string;
      selected: boolean;
      year: number;
      highlight: boolean;
    }[]
  >([]);

  // apartment lists
  const { data, isLoading, isFailed, setIsFailed, retryFunction, pagination } =
    useGetAllApartmentLists({
      page: 1,
      search: search,
    });

  // calendar data fetching based on filtered dates
  const { data: calendarDates } = useGetApartmentCalendar({
    id: String(selectedApt?.id || ""),
  });
  const { data: data_result } = useGetApartmentsCalendar({
    start_date: "",
    end_date: "",
  });

  // const changeHandler = useCallback(
  //   (event: { year: number; month: number; day: number }) => {
  //     const selectedDate = new Date(event.year, event.month, event.day);
  //     setCurrentDay(selectedDate);
  //   },
  //   []
  // );
  const generateDays = useCallback(() => {
    const daysArray = generateCalendarData({
      selectedDate: currentDay,
      highlights: [
        ...calendarDates?.booked_dates,
        ...calendarDates?.blocked_dates,
      ],
      booked: calendarDates?.booked_dates,
      blocked: calendarDates?.blocked_dates,
    });
    setCurrentDays(daysArray);
  }, [currentDay, calendarDates]);

  useEffect(() => {
    setMonth(daysMonths?.months[currentDay?.getMonth()]);
    setYear(String(currentDay?.getFullYear()));
    generateDays();
  }, [currentDay, calendarDates]);

  const prevMonthHandler = useCallback(() => {
    setCurrentDay(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    );
  }, []);

  const nextMonthHandler = useCallback(() => {
    setCurrentDay(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
  }, []);

  return (
    <div className=" w-full my-5 flex flex-col gap-4">
      <div className=" w-full flex justify-between flex-col md:flex-row items-center gap-4">
        <div className=" flex items-center gap-4">
          <Select
            isRequired={true}
            value={month}
            setValue={setMonth}
            id="month"
          >
            {daysMonths?.months?.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
          <Select isRequired={true} value={year} setValue={setYear} id="year">
            {Array.from({ length: 8 }, (_, index) => (
              <option key={index} value={`${index + 2020}`}>
                {index + 2020}
              </option>
            ))}
          </Select>
        </div>
        <div className=" flex items-center justify-center gap-4">
          <div className=" flex gap-2 items-center">
            <div className=" h-5 w-5 aspect-square bg-red-400 rounded-sm overflow-hidden"></div>
            <span>Booked</span>
          </div>
          <div className=" flex gap-2 items-center">
            <div className=" h-5 w-5 aspect-square bg-gray-200 rounded-sm relative overflow-hidden"></div>
            <span>Not available</span>
          </div>
          <div className=" flex gap-2 items-center">
            <div className=" h-5 w-5 aspect-square bg-yellow-500 rounded-sm relative overflow-hidden"></div>
            <span>Maintenance</span>
          </div>
        </div>
      </div>
      <div className="w-full flex gap-4 md:gap-0 items-stretch overflow-auto">
        <div className="w-full flex-1 flex flex-col">
          <div className="w-full flex">
            <div className=" flex items-center gap-2 text-primary p-4 w-52 min-w-52 bg-gray-100">
              <BuildingIcon />
              <h2 className=" font-semibold text-lg">Apartments</h2>
            </div>
            <div className="w-full flex items-center justify-between bg-primary text-white gap-4 p-2">
              <button
                type="button"
                title="prev"
                onClick={() => prevMonthHandler()}
              >
                <ChevronLeftIcon className=" size-4" />
              </button>{" "}
              <h3>
                {daysMonths?.months[currentDay.getMonth()]}{" "}
                {currentDay.getFullYear()}
              </h3>
              <button
                type="button"
                title="prev"
                onClick={() => nextMonthHandler()}
              >
                <ChevronRightIcon className=" size-4" />
              </button>
            </div>
          </div>
          <div className=" w-full">
            <div className="w-full flex items-stretch">
              <div className="w-52 min-w-52  bg-gray-100">
                <ApartmentSingleSearch
                  placeholder="Search"
                  setSelected={setSelectedApt}
                  selected={selectedApt}
                />
              </div>
              <div className=" w-full">
                {/* WEEKSDAYS ROW */}
                <div className="w-full flex items-center flex-nowrap bg-gray-100">
                  {currentDays?.map((item, index) => {
                    if (item?.currentMonth) {
                      return (
                        <div
                          key={index}
                          className="h-[39px] w-[39px] flex flex-col items-center gap-2 p-3"
                        >
                          <span className=" text-xs">{item?.weekday}</span>
                        </div>
                      );
                    }
                  })}
                </div>
                {/* DAYS ROW */}
                <div className="w-full flex items-center flex-nowrap  bg-gray-100">
                  {currentDays?.map((item, index) => {
                    if (item?.currentMonth) {
                      return (
                        <div
                          key={index}
                          className=" h-[39px] w-[39px] flex items-center justify-center"
                        >
                          <span className=" text-xl font-extrabold text-primary">
                            {item?.day}
                          </span>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
            {/* APARTMENT ROWS */}
            <div className="w-full flex flex-row">
              <div className=" flex flex-col">
                {data_result?.map((apt, apitId) => (
                  <div key={apt?.name} className=" flex">
                    <div className=" w-52 bg-gray-100 py-1 px-2 border-b">
                      <span>{apt?.name}</span>
                    </div>
                    <div className=" flex">
                      {Array.from(
                        {
                          length: currentDays.filter(
                            (item) => item.currentMonth
                          ).length,
                        },
                        (_, ind) => (
                          <span
                            key={ind}
                            className={`${
                              apt?.booked?.find(
                                (item) =>
                                  item?.date ===
                                  currentDays?.find(
                                    (item) => item?.day === ind + 1
                                  )?.isoStringDate
                              )
                                ? "bg-red-500"
                                : apt?.blocked?.find(
                                    (item) =>
                                      item?.date ===
                                      currentDays?.find(
                                        (item) => item?.day === ind + 1
                                      )?.isoStringDate
                                  )
                                ? " bg-yellow-500"
                                : "bg-white"
                            } h-[39px] w-[39px]  border`}
                          ></span>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* OLD CODE LOGIC */}
          {/* <div className="w-full flex items-center flex-nowrap overflow-x-scroll bg-gray-100">
            {currentDays?.map((item, index) => {
              console.log({ item });
              if (item?.currentMonth) {
                return (
                  <div key={index} className=" flex flex-col">
                    <div className=" flex flex-col items-center gap-2 px-3 mt-2">
                      <span className=" text-xs">{item?.weekday}</span>
                      <span className=" text-2xl font-extrabold text-primary">
                        {item?.day}
                      </span>
                    </div>
                    {Array.from({ length: 24 }, (_, ind) => (
                      <div
                        key={ind}
                        className={`w-full h-10 border ${
                          item?.highlight ? " bg-red-400" : "bg-white"
                        } `}
                      ></div>
                    ))}
                  </div>
                );
              }
            })}
          </div> */}
        </div>
      </div>
    </div>
  );
}
