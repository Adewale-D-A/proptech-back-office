import { Link } from "react-router-dom";
import { useAppSelector } from "../stores/hooks";

export default function Unauthorised() {
  const { status } = useAppSelector((state) => state?.userProfile?.value);

  return (
    <div className="flex w-full h-screen flex-col gap-4 items-center justify-center">
      <h1 className=" text-3xl font-semibold">
        You are not authorised to view this page
      </h1>
      <Link
        to={status ? "/dashboard" : "/"}
        className="w-fit flex justify-center bg-primary_green-500 text-white  gap-3 p-3 px-6 rounded-lg hover:bg-transparent hover:border hover:border-primary_green-500 transition-all hover:text-primary_green-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z"
          />
        </svg>

        <span>Back</span>
      </Link>
    </div>
  );
}
