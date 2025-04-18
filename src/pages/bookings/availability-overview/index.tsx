import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useAppDispatch } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import CalendarIcon from "../../../assets/icons/calendar";
import Select from "../../../components/inputs/select";
import daysMonths from "../../../assets/days-months.json";
import ChevronLeftIcon from "../../../assets/icons/chevron-left";
import ChevronRightIcon from "../../../assets/icons/chevron-right";
import BuildingIcon from "../../../assets/icons/building";
import generateCalendarData from "../../../utils/generateCalendarData";
import useGetApartmentsCalendar from "../../../services-hooks/useGetApartmentsCalendar";
import CalendarAvailabilitySymbol from "../../../components/calender-availability-symbol";
import ArrowCircleIcon from "../../../assets/icons/arrow-circle";
import SearchIcon from "../../../assets/icons/search";
import { reformedApartmentCalendar } from "../../../types/apiData/apartment/reformed-apartment-calendar";

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
  const [allApartmentCalendar, setAllApartmentCalendar] = useState<
    reformedApartmentCalendar[]
  >([]);
  const [search, setSearch] = useState("");
  const [month, setMonth] = useState(String(today?.getMonth()));
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

  const { data: data_result } = useGetApartmentsCalendar({
    start_date: "",
    end_date: "",
  });

  const generateDays = useCallback(() => {
    const daysArray = generateCalendarData({
      selectedDate: currentDay,
      highlights: [],
      booked: [],
      blocked: [],
    });
    setCurrentDays(daysArray);
  }, [currentDay]);

  useEffect(() => {
    setMonth(String(currentDay?.getMonth()));
    setYear(String(currentDay?.getFullYear()));
    generateDays();
  }, [currentDay]);

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

  const handleDateMonthChange = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      const filteredDate = new Date(Number(year), Number(month) + 1, 1);
      setCurrentDay(filteredDate);
    },
    [month, year]
  );

  // filter apartment calendar by apartment name
  useEffect(() => {
    if (search) {
      const filteredDataset = data_result?.filter((item) =>
        item?.name.toLowerCase().includes(search.toLowerCase())
      );
      setAllApartmentCalendar(filteredDataset);
    } else {
      setAllApartmentCalendar(data_result);
    }
  }, [data_result, search]);

  return (
    <div className=" w-full my-5 flex flex-col gap-4">
      <div className=" w-full flex justify-between flex-col md:flex-row items-center gap-4">
        <form
          onSubmit={handleDateMonthChange}
          className=" flex items-center gap-4 border p-2 rounded-md bg-primary/15 "
        >
          <Select
            isRequired={true}
            value={month}
            setValue={setMonth}
            id="month"
          >
            {daysMonths?.months?.map((item, index) => (
              <option key={item} value={String(index)}>
                {item}
              </option>
            ))}
          </Select>
          <Select isRequired={true} value={year} setValue={setYear} id="year">
            {Array.from({ length: 8 }, (_, index) => (
              <option
                key={index}
                value={`${index + (today.getFullYear() - 2)}`}
              >
                {index + (today.getFullYear() - 2)}
              </option>
            ))}
          </Select>
          <button
            className=" text-primary hover:scale-110 transition-all"
            title="search"
            type="submit"
          >
            <ArrowCircleIcon />
          </button>
        </form>
        <CalendarAvailabilitySymbol />
      </div>
      <div className="w-full flex-1 flex flex-col overflow-x-auto items-stretch">
        {/* top row mentioning 'apartments and month navigator */}
        <div className="w-full flex items-stretch">
          <div className=" flex items-center gap-2 text-primary p-4 w-52 min-w-52 bg-gray-100">
            <BuildingIcon />
            <h2 className=" font-semibold text-lg">Apartments</h2>
          </div>
          <div className="w-full flex items-stretch md:items-center justify-between bg-primary text-white gap-4 p-2">
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
        {/* boottom row mentioning list of apartments, weekdays, day, and activity highlight */}
        <div className=" w-full items-stretch">
          <div className="w-full flex items-center">
            <div className="w-52 min-w-52 border-primary border rounded-md">
              <label
                htmlFor={"keyword-search"}
                className=" flex items-center rounded-sm"
              >
                <SearchIcon />
                <input
                  id={"keyword-search"}
                  placeholder="search..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className=" w-full p-2 outline-none text-sm "
                />
              </label>
            </div>
            <div className=" w-full">
              {/* WEEKSDAYS ROW */}
              <div className="w-full flex items-center flex-nowrap bg-gray-100">
                {currentDays?.map((item, index) => {
                  if (item?.currentMonth) {
                    return (
                      <div
                        key={index}
                        className="min-h-[39px] min-w-[39px] flex items-center justify-center"
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
                        className=" min-h-[39px] min-w-[39px] flex items-center justify-center"
                      >
                        <span className=" text-xs md:text-xl font-extrabold text-primary">
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
              {allApartmentCalendar?.map((apt, apitId) => (
                <div key={apt?.name} className=" flex">
                  <button
                    onClick={() => setSearch(apt?.name)}
                    className=" text-left w-52 bg-gray-100 py-1 px-2 border-b hover:bg-primary hover:text-white hover:rounded-md transition-all "
                  >
                    <span>{apt?.name}</span>
                  </button>
                  <div className=" flex">
                    {Array.from(
                      {
                        length: currentDays.filter((item) => item.currentMonth)
                          .length,
                      },
                      (_, ind) => {
                        const isBooked = apt?.booked?.find(
                          (item) =>
                            item?.date ===
                            currentDays?.find((item) => item?.day === ind + 1)
                              ?.isoStringDate
                        );
                        const isBlocked = apt?.blocked?.find(
                          (item) =>
                            item?.date ===
                            currentDays?.find((item) => item?.day === ind + 1)
                              ?.isoStringDate
                        );
                        return (
                          <div
                            key={ind}
                            className={`min-h-[37px] min-w-[37px] m-[1px]  border rounded-md relative overflow-hidden`}
                            title={isBlocked?.reason}
                            style={{
                              backgroundColor: isBlocked
                                ? isBlocked?.hex_code
                                : isBooked
                                ? isBooked?.hex_code
                                : "#e5e7eb",
                            }}
                          >
                            {!(isBlocked || isBooked) && (
                              <div className=" absolute top-0 right-0 aspect-square border-l-8 border-l-transparent border-b-8 border-b-transparent border-8 border-green-500"></div>
                            )}
                          </div>
                        );
                      }
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
  );
}
