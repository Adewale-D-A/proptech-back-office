import SearchIcon from "../../../assets/icons/search";

export default function Search({
  id,
  placeholder,
}: {
  id: string;
  placeholder: string;
}) {
  return (
    <div className=" flex text-gray-400 gap-2 items-center border rounded-lg">
      <label htmlFor={id} className=" p-2">
        <SearchIcon />
      </label>
      <input id={id} placeholder={placeholder} className="" />
    </div>
  );
}
