import { useCallback, useState } from "react";
import ModalTemplate from "../modal";
import BinIcon from "../../assets/icons/bin-icon";
import LoadingButton from "../button";
import CheckIcon from "../../assets/icons/check";
import TextAreaInput from "../inputs/textArea";

export default function CloseRequest({
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
  const [reason, setReason] = useState("");

  const handleConfirmationFunction = useCallback(() => {
    confirmationHandler();
  }, [confirmationHandler]);

  return (
    <ModalTemplate open={open} setOpen={setOpen} className=" max-w-md">
      <div className={` w-full flex  flex-col gap-8 my-6`}>
        <CheckIcon className=" text-[#2A3F8F] h-12 w-12" />
        <div className=" w-full flex flex-col gap-2 text-left">
          <h4 className={`font-semibold text-lg text-[#101828]`}>{title}</h4>
          <p className=" text-sm font-normal text-[#475467]">{description}</p>
        </div>
        <div>
          <label
            htmlFor="reason-for-closure"
            className="text-[#667085] font-medium text-sm leading-8"
          >
            Reason for closure
          </label>
          <TextAreaInput
            isRequired={true}
            value={reason}
            setValue={setReason}
            id="reason for closure"
            placeholder=""
          />
        </div>
      </div>
      <div className=" flex flex-row-reverse items-center gap-3">
        <LoadingButton
          type="button"
          label={btnTitle}
          disabled={false}
          isLoading={isLoading}
          clickHandler={() => handleConfirmationFunction()}
          variant={3}
          className=" bg-[#2A3F8F] text-white whitespace-nowrap hover:bg-opacity-75"
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
    </ModalTemplate>
  );
}
