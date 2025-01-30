import { SyntheticEvent, useCallback, useState } from "react";
import SearchIcon from "../../../assets/icons/search";
import ArrowCircleIcon from "../../../assets/icons/arrow-circle";

export default function TableSearch({
  setValue,
  placeholder,
}: {
  setValue: Function;
  placeholder: string;
}) {
  const [keywords, setKeywords] = useState("");
  const submitHandler = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      setValue(keywords);
    },
    [keywords]
  );
  return (
    <form
      onSubmit={submitHandler}
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
