import SearchIcon from "../../assets/icons/search";

function NoResult({ title, message }: { title?: string; message?: string }) {
  return (
    <div className="w-full flex flex-col gap-3 items-center justify-center p-3 py-10">
      <div className=" p-1 shadow-sm shadow-primary_green-500 rounded-full h-12 w-12 text-primary_green-500 flex items-center justify-center bg-primary_green-500/30 ">
        <SearchIcon />
      </div>
      <h6 className=" font-semibold ">{title ? title : "No data found"}</h6>
      <p className=" text-sm text-gray-500">
        {message ? message : "Unable to find any data for this resource"}
      </p>
    </div>
  );
}

export default NoResult;
