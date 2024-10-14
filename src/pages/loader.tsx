import { useCallback } from "react";

export default function Loader({
  failed,
  setFailed,
  tryAgain,
}: {
  failed?: boolean;
  setFailed?: Function;
  tryAgain?: Function;
}) {
  const retryRequest = useCallback(() => {
    if (setFailed && tryAgain) {
      setFailed(false);
      tryAgain();
    }
  }, [tryAgain]);
  return (
    <div className="w-full flex items-center justify-center h-96">
      {failed ? (
        <div className="flex flex-col gap-4 items-center text-center text-red-500">
          <div className="flex items-center justify-center">
            <img
              src={"/logo_blue.png"}
              className=" w-16 loader-img"
              alt="99Apt logo"
            />
          </div>
          <h5 className=" text-lg font-semibold">
            Failed to load data, please try again
          </h5>
          <button
            type="button"
            onClick={() => retryRequest()}
            className="p-2 px-6 text-sm font-semibold rounded-lg bg-red-500 text-white border-2 border-gray-300 hover:bg-primary_green-500 hover:text-white  transition-all"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <img
            src={"/logo_blue.png"}
            className=" w-16 loader-img"
            alt="99Apt logo"
          />
        </div>
      )}
    </div>
  );
}
