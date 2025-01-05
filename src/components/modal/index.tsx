import { Fragment, ReactNode, useCallback } from "react";
import { Dialog, Transition } from "@headlessui/react";
import CancelIcon from "../../assets/icons/cancel";

export default function ModalTemplate({
  children,
  open,
  setOpen,
  showXicon,
  title,
  titleIcon,
  className,
}: {
  children: ReactNode;
  open: boolean;
  setOpen: Function;
  showXicon?: boolean;
  title?: string;
  titleIcon?: ReactNode;
  className?: string;
}) {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
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
              <Dialog.Panel
                className={`w-full ${
                  className ? className : "max-w-screen-sm"
                }  transform overflow-hidden rounded-lg bg-white p-4 text-left align-middle shadow-xl transition-all`}
              >
                <div className="flex flex-col gap-3 justify-center items-center">
                  {showXicon && (
                    <div className="flex justify-between w-full items-center mb-8">
                      <h4 className=" font-semibold text-xl flex items-center gap-2">
                        {titleIcon} {title}
                      </h4>
                      <button
                        type="button"
                        title="clode modal"
                        onClick={() => setOpen(false)}
                      >
                        <CancelIcon />
                      </button>
                    </div>
                  )}
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
