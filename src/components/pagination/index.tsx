import { useCallback } from "react";

export default function Pagination({
  pagination,
  setCurrentPage,
  isLoading,
}: {
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
  };
  setCurrentPage: Function;
  isLoading: boolean;
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
    <div className=" text-sm md:text-md flex justify-center md:justify-between flex-col md:flex-row items-start gap-3 md:gap-6 w-full  px-4 mt-10 md:mt-16">
      <button
        title="previous"
        type="button"
        disabled={pagination?.current_page < 2 || isLoading}
        className={`${
          pagination?.current_page < 2
            ? "text-gray-300"
            : "hover:border-primary_green-500"
        }  w-full md:w-fit items-center justify-center border rounded-md p-3 px-5  transition-all flex gap-3`}
        onClick={() => showPrevproductsArray()}
      >
        {isLoading ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 animate-spin"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 md:w-6 md:h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            <span>Previous</span>
          </>
        )}
      </button>
      <div className="flex gap-2 flex-wrap w-full justify-between md:justify-center">
        {Array.from({ length: pagination?.last_page }, (_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentPage(index + 1)}
            className={`border rounded-md p-3 hover:border-primary_green-500 transition-all cursor-pointer ${
              index + 1 === pagination?.current_page
                ? "border-primary_green-500 "
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
            ? "bg-gray-300"
            : "hover:border-primary_green-500"
        }  w-full md:w-fit items-center justify-center border rounded-md p-3 px-5  transition-all flex gap-3`}
        onClick={() => showNextproductsArray()}
      >
        {isLoading ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 animate-spin"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        ) : (
          <>
            <span>Next</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 md:w-6 md:h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </>
        )}
      </button>
    </div>
  );
}
