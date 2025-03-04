import { ChangeEvent, useCallback } from "react";
import CancelIcon from "../../../../assets/icons/cancel";
import { useAppDispatch } from "../../../../stores/hooks";
import { openSnackbar } from "../../../../stores/appFunctionality/snackbar";
import DocumentIcon from "../../../../assets/icons/document";

interface Props {
  value: { name: string; size: number; preview: string; is_local?: boolean };
  setValue: Function;
  label?: string;
  isRequired?: boolean;
  id: string;
}

export default function FileInputDesignTwo({
  value,
  setValue,
  label,
  isRequired = false,
  id,
}: Props) {
  const dispatch = useAppDispatch();
  const addUpload = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files as any;
    const singleImage = uploadedFile[0];
    if (singleImage.type === "application/pdf") {
      Object.assign(singleImage, {
        preview: URL.createObjectURL(singleImage),
      });
      setValue({ ...singleImage, is_local: true });
    } else {
      dispatch(
        openSnackbar({ message: "unsupported file type", isError: true })
      );
    }
  }, []);
  return (
    <div className="w-full">
      {value?.preview ? (
        <div className="w-full border rounded-md flex gap-2 p-2 items-center justify-between">
          <div className=" p-3 text-primary bg-primary/15 rounded-full">
            <DocumentIcon className=" h-12 w-12" />
          </div>
          <button
            onClick={() => setValue({})}
            className=" p-2 rounded-full bg-red-500/15 hover:scale-125 transition-all"
          >
            <CancelIcon className=" text-red-500 h-6 w-6" />
          </button>
        </div>
      ) : (
        <div className=" flex flex-col gap-2">
          {label && (
            <label htmlFor={id} className=" font-semibold">
              {label}
            </label>
          )}
          <label
            htmlFor={id}
            className=" w-full border transition-all cursor-pointer rounded-xl flex items-center overflow-hidden"
          >
            <div className=" flex items-center gap-2 bg-primary text-white  p-4">
              <DocumentIcon />{" "}
              <span className=" font-semibold">Choose file</span>
            </div>
            <span className=" p-4 text-gray-400">No file chosen</span>
          </label>
        </div>
      )}
      <input
        id={id}
        type="file"
        accept="application/pdf"
        onChange={(e) => addUpload(e)}
        className="w-full hidden focus:ring-[#17594F] focus:border-[#17594F]"
      />
    </div>
  );
}
