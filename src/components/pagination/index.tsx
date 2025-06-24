import { useCallback } from "react";
import LoaderIcon from "../../assets/icons/loader";
import { pagination } from "../../types/pagination";
import NavigateNextIcon from "../../assets/icons/navigate-next";
import NavigatePrevIcon from "../../assets/icons/navigate-prev";
import getPagination from "../../utils/get-pagination";
import Select from "../inputs/select";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { cn } from "../../utils/cn";
import useCreateQueryString from "../../useHooks/useCreateQueryString";

export default function Pagination({
  pagination,
  setCurrentPage,
  isLoading,
  label,
  onPageSizeChange,
}: {
  pagination: pagination;
  setCurrentPage?: (val: number) => void;
  isLoading: boolean;
  label?: string;
  onPageSizeChange?: (val: number) => void;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const result = getPagination(pagination?.current_page, pagination?.last_page);
  const createQueryString = useCreateQueryString();

  const handlePageSizeChange = useCallback(
    (val: number) => {
      onPageSizeChange?.(val);
      let queries: { [key: string]: string } = {};
      searchParams.forEach((value, key) => {
        queries[key] = value;
      });
      const params = new URLSearchParams(queries);
      params.set("size", String(val));
      params.set("page", "1");
      navigate(location.pathname + "?" + params.toString());
    },
    [location.pathname, searchParams]
  );

  const handlePageNumberChange = useCallback(
    (val: number) => {
      setCurrentPage?.(val);
      navigate(
        location.pathname + "?" + createQueryString("page", String(val))
      );
    },
    [location.pathname, createQueryString]
  );

  // productsArray next function
  const showNextproductsArray = useCallback(() => {
    if (pagination?.total >= pagination?.current_page * pagination?.per_page) {
      handlePageNumberChange(pagination?.current_page + 1);
    }
  }, [pagination, handlePageNumberChange]);

  // productsArray next previous
  const showPrevproductsArray = useCallback(() => {
    if (!(pagination?.current_page < 1)) {
      handlePageNumberChange(pagination?.current_page - 1);
    }
  }, [pagination, handlePageNumberChange]);

  return (
    <div className="w-full flex items-center flex-col md:flex-row justify-between gap-2 my-8 px-2.5">
      <span>
        showing {pagination?.to} of {pagination?.total} {label}{" "}
      </span>
      <div className=" w-fit">
        <Select
          id="page-size"
          value={String(searchParams.get("size") || 20)}
          setValue={(val: string) => handlePageSizeChange(Number(val))}
        >
          {[20, 50, 100, 200].map((v) => (
            <option key={String(v)} value={String(v)} className=" w-fit">
              {v}
            </option>
          ))}
        </Select>
      </div>
      <div className=" flex items-center gap-2">
        <button
          title="previous"
          type="button"
          disabled={pagination?.current_page < 2 || isLoading}
          className={cn(
            " md:w-fit aspect-square  p-2 flex items-center justify-center border rounded-full transition-all",
            "hover:bg-primary hover:text-white border-primary cursor-pointer "
          )}
          onClick={() => showPrevproductsArray()}
        >
          {isLoading ? (
            <LoaderIcon className=" h-4 w-4 animate-spin" />
          ) : (
            <NavigatePrevIcon className=" h-4 w-4 min-h-4 min-w-4" />
          )}
        </button>
        <div className="flex gap-2 flex-wrap justify-between md:justify-center">
          {result.map((page, index) => (
            <button
              key={index}
              type="button"
              disabled={page === "..."}
              onClick={() => handlePageNumberChange?.(page)}
              className={cn(
                "border min-h-4 min-w-4 aspect-square flex items-center justify-center rounded-full p-3 hover:border-primary hover:bg-primary transition-all cursor-pointer",
                page === pagination?.current_page &&
                  "border-primary bg-primary text-white "
              )}
            >
              {page}
            </button>
          ))}
        </div>
        <button
          type="button"
          title="next"
          disabled={
            pagination?.last_page <= pagination?.current_page || isLoading
          }
          className={cn(
            "md:w-fit aspect-square  p-2 flex items-center justify-center border rounded-full transition-all",
            pagination?.last_page <= pagination?.current_page
              ? "border-gray-500 cursor-not-allowed"
              : "hover:bg-primary hover:text-white border-primary cursor-pointer "
          )}
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
