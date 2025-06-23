import { SyntheticEvent, useCallback, useState } from "react";
import SearchIcon from "../../../assets/icons/search";
import ArrowCircleIcon from "../../../assets/icons/arrow-circle";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export default function TableSearch({
  setValue,
  placeholder,
}: {
  setValue?: (val: string) => void;
  placeholder?: string;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [keywords, setKeywords] = useState(searchParams.get("search") || "");

  const handleSubmit = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      setValue?.(keywords);
      let queries: { [key: string]: string } = {};
      searchParams.forEach((value, key) => {
        queries[key] = value;
      });
      const params = new URLSearchParams(queries);
      params.set("search", keywords);
      params.set("page", "1");
      navigate(location.pathname + "?" + params.toString());
    },
    [keywords, location.pathname]
  );
  return (
    <form
      onSubmit={handleSubmit}
      className=" flex items-center p-2 w-full gap-2 border rounded-lg text-sm"
    >
      <label htmlFor={"keyword-search"} className=" flex items-center">
        <SearchIcon />
        <input
          id={"keyword-search"}
          placeholder={placeholder}
          value={keywords}
          onChange={(event) => setKeywords(event.target.value)}
          className=" w-full p-2 outline-none"
        />
      </label>
      <div className=" flex justify-end lg:pl-20">
        <button
          className=" text-primary hover:scale-110 transition-all"
          title="search"
          type="submit"
        >
          <ArrowCircleIcon />
        </button>
      </div>
    </form>
  );
}
