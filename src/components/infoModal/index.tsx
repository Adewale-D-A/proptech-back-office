import { Fragment, useCallback } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { closeSnackBar } from "../../stores/appFunctionality/snackbar";

const AlertModal = ({ openModal }: { openModal: boolean }) => {
  const dispatch = useAppDispatch();
  const { message, isError } = useAppSelector((state) => state.snackbar.value);

  const closeModal = useCallback(() => {
    dispatch(closeSnackBar());
  }, []);

  return (
    <Transition appear show={openModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => closeModal()}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 backgrop-bg-filter" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-screen-sm transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex flex-col gap-6 justify-center items-center">
                  <div className="flex justify-end w-full">
                    {/* <button
                      type="button"
                      title="clode modal"
                      onClick={() => closeModal()}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                    </button> */}
                  </div>
                  <div
                    className={`${
                      isError ? "text-red-500" : "text-primary"
                    } w-full flex items-center flex-col gap-5`}
                  >
                    {isError ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-24 h-24 text-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-24 h-24 text-green-500"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}

                    <h4 className={`font-semibold text-3xl`}>
                      {isError ? "Error" : "Success"}
                    </h4>
                    <p className=" text-sm">{message}</p>
                    <button
                      type="button"
                      onClick={() => closeModal()}
                      className={`${
                        isError
                          ? "border-red-300 hover:bg-red-500"
                          : "border-primary hover:bg-primary"
                      } p-2 px-4 text-lg font-semibold rounded-md bg-white border-2   hover:text-white  transition-all`}
                    >
                      Okay
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AlertModal;
