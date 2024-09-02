import { useCallback } from "react";
import ModalTemplate from "../modal";
import BinIcon from "../../assets/icons/bin-icon";
import LoadingButton from "../button";

export default function DeleteConfirmation({
  open,
  setOpen,
  isLoading,
  confirmationHandler,
  title,
  description,
  btnTitle,
}: {
  open: boolean;
  setOpen: Function;
  confirmationHandler: Function;
  isLoading: boolean;
  title: string;
  description: string;
  btnTitle: string;
}) {
  const closeModal = useCallback(() => {
    setOpen(false);
  }, []);

  const handleConfirmationFunction = useCallback(() => {
    confirmationHandler();
  }, [confirmationHandler]);

  return (
    <ModalTemplate open={open} setOpen={setOpen} className=" max-w-md">
      <div className={` w-full flex items-center flex-col gap-8 my-6`}>
        <BinIcon className=" text-red-500 h-24 w-24" />
        <div className=" w-ful flex flex-col gap-2 text-center">
          <h4 className={`font-semibold text-3xl`}>{title}</h4>
          <p className=" text-sm text-gray-600">{description}</p>
        </div>
        <div className=" flex items-center gap-3">
          <LoadingButton
            type="button"
            label={btnTitle}
            disabled={false}
            isLoading={isLoading}
            clickHandler={() => handleConfirmationFunction()}
            variant={3}
            className=" bg-red-200 text-red-500 whitespace-nowrap hover:bg-primary hover:text-white"
          />
          <LoadingButton
            type="button"
            label="No, Cancel"
            variant={2}
            disabled={false}
            isLoading={false}
            clickHandler={() => closeModal()}
          />
        </div>
      </div>
    </ModalTemplate>
  );
}
