import { ChangeEvent, useCallback } from "react";
import CautionIcon from "../../../assets/icons/caution";
import PhotoIcon from "../../../assets/icons/photo";
import CancelIcon from "../../../assets/icons/cancel";
import { useAppDispatch } from "../../../stores/hooks";
import { openSnackbar } from "../../../stores/appFunctionality/snackbar";

interface Props {
  value: { name: string; size: number; preview: string };
  setValue: Function;
  label?: string;
  isRequired?: boolean;
  id: string;
}

export default function FileInput({
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
    if (
      singleImage.type === "image/jpeg" ||
      singleImage.type === "image/jpg" ||
      singleImage.type === "image/png" ||
      singleImage.type === "image/svg+xml"
    ) {
      Object.assign(singleImage, {
        preview: URL.createObjectURL(singleImage),
      });
      setValue(singleImage);
    } else {
      dispatch(
        openSnackbar({ message: "unsupported file type", isError: true })
      );
    }
  }, []);

  return (
    <div className="w-full flex items-center justify-between gap-3 p-3 rounded-lg border bg-gray-200/15">
      {value?.preview ? (
        <div className=" flex gap-2 items-center">
          {/* <div className=" bg-primary/10 text-primary rounded-full p-2">
            <PhotoIcon className=" h-6 w-6" />
          </div>
          <div className=" flex flex-col">
            <span className=" font-semibold text-ellipsis max-w-16 overflow-hidden line-clamp-1">
              {value?.name}
            </span>
            <span className=" text-xs">{Math.floor(value?.size / 1000)}kb</span>
          </div> */}
          <div>
            <img
              src={value?.preview}
              alt={value?.name}
              className=" w-28 h-auto rounded-sm"
            />
          </div>
          <button
            title="cancel"
            type="button"
            onClick={() => setValue({})}
            className=" p-1 bg-primary/10 rounded-full hover:bg-primary/20"
          >
            <CancelIcon className=" h-5 w-5" />
          </button>
        </div>
      ) : (
        <label htmlFor={id} className=" flex items-center gap-2 text-gray-400">
          <span>Upload Image</span>
          <CautionIcon />
        </label>
      )}
      <label
        htmlFor={id}
        className="text-sm font-medium text-primary bg-primary/10 p-2 rounded-md hover:bg-primary/20 transition-all cursor-pointer"
      >
        {label}
      </label>
      <input
        id={id}
        type="file"
        accept="image/jpg, image/png, image/jpeg"
        onChange={(e) => addUpload(e)}
        className="w-full hidden focus:ring-[#17594F] focus:border-[#17594F]"
      />
    </div>
  );
}
