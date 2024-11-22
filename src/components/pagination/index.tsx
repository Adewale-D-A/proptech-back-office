import { useCallback } from "react";
import NextArrowIcon from "../../assets/icons/next-arrow";
import LoaderIcon from "../../assets/icons/loader";
import PreviousArrowIcon from "../../assets/icons/previous-arrow";
import { pagination } from "../../types/pagination";
import NavigateNextIcon from "../../assets/icons/navigate-next";
import NavigatePrevIcon from "../../assets/icons/navigate-prev";

export default function Pagination({
  pagination,
  setCurrentPage,
  isLoading,
  label,
}: {
  pagination: pagination;
  setCurrentPage: Function;
  isLoading: boolean;
  label?: string;
}) {
  // productsArray next function
  const showNextproductsArray = useCallback(() => {
    if (pagination?.total >= pagination?.current_page * pagination?.per_page) {
      setCurrentPage((prev: number) => prev + 1);
    }
  }, [pagination]);

  // productsArray next previous
  const showPrevproductsArray = useCallback(() => {
    if (!(pagination?.current_page < 1)) {
      setCurrentPage((prev: number) => prev - 1);
    }
  }, [pagination]);
  return (
    <div className="w-full flex items-center flex-col md:flex-row justify-end gap-2 my-8">
      <span>
        showing {pagination?.to} of {pagination?.total} {label}{" "}
      </span>
      <div className=" flex items-center gap-2">
        <button
          title="previous"
          type="button"
          disabled={pagination?.current_page < 2 || isLoading}
          className={`${
            pagination?.current_page < 2
              ? "border-gray-500 cursor-not-allowed"
              : "hover:bg-primary hover:text-white border-primary cursor-pointer "
          } md:w-fit aspect-square  p-2 flex items-center justify-center border rounded-full transition-all `}
          onClick={() => showPrevproductsArray()}
        >
          {isLoading ? (
            <LoaderIcon className=" h-4 w-4 animate-spin" />
          ) : (
            <NavigatePrevIcon className=" h-4 w-4 min-h-4 min-w-4" />
          )}
        </button>
        <div className="flex gap-2 flex-wrap justify-between md:justify-center">
          {Array.from({ length: pagination?.last_page }, (_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentPage(index + 1)}
              className={` border min-h-4 min-w-4 aspect-square flex items-center justify-center rounded-full p-3 hover:border-primary transition-all cursor-pointer ${
                index + 1 === pagination?.current_page
                  ? "border-primary bg-primary text-white "
                  : ""
              }}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          type="button"
          title="next"
          disabled={
            pagination?.last_page <= pagination?.current_page || isLoading
          }
          className={`${
            pagination?.last_page <= pagination?.current_page
              ? "border-gray-500 cursor-not-allowed"
              : "hover:bg-primary hover:text-white border-primary cursor-pointer "
          } md:w-fit aspect-square  p-2 flex items-center justify-center border rounded-full transition-all `}
          onClick={() => showNextproductsArray()}
        >
          {isLoading ? (
            <LoaderIcon className=" h-4 w-4 animate-spin" />
          ) : (
            <NavigateNextIcon className=" h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}
