import { ChangeEvent, useCallback } from "react";
import CautionIcon from "../../../assets/icons/caution";
import PhotoIcon from "../../../assets/icons/photo";
import CancelIcon from "../../../assets/icons/cancel";
import { useAppDispatch } from "../../../stores/hooks";
import { openSnackbar } from "../../../stores/appFunctionality/snackbar";
import BinIcon from "../../../assets/icons/bin-icon";
import { addRemovableImages } from "../../../stores/inAppDataInterations/addEditApartmentInfo";

interface Props {
  value: {
    name: string;
    size: number;
    preview: string;
    id?: number;
    is_local?: boolean;
  }[];
  setValue: Function;
  label?: string;
  isRequired?: boolean;
  id: string;
}

export default function MultipleFileInput({
  value,
  setValue,
  label,
  isRequired = false,
  id,
}: Props) {
  const dispatch = useAppDispatch();

  const addUpload = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files as any;
    const imageArray = [] as any;
    for (let i = 0; i < uploadedFile.length; ++i) {
      const file = uploadedFile[i];
      if (
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png" ||
        file.type === "image/svg+xml"
      ) {
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        });
        imageArray.push({ ...file, is_local: true });
      } else {
        dispatch(
          openSnackbar({ message: "unsupported file type", isError: true })
        );
      }
    }
    setValue((prev: any) => [...prev, ...imageArray]);
  }, []);

  const removeImage = useCallback(
    (index: number) => {
      // provided the image already has an ID appended, that essentially,
      //means the image is already in the database and wants to be romoved
      //this redux state stores the ID of the removed images to use in
      //querying the db to remove these sets of images
      const imageData = value[index];
      if (imageData?.id) {
        dispatch(addRemovableImages({ id: imageData?.id }));
      }
      setValue((prev: any) => {
        const deepCopy = [...prev];
        deepCopy.splice(index, 1);
        return deepCopy;
      });
    },
    [value]
  );

  return (
    <div className="w-full flex items-center justify-between gap-3 p-3 rounded-lg border bg-gray-200/15">
      {value?.length > 0 ? (
        <div className=" flex items-center flex-wrap gap-3">
          {value.map((item, index) => (
            <div key={index} className=" flex gap-2 items-center">
              <div>
                {/* <div className=" bg-primary/10 text-primary rounded-full p-2">
                <PhotoIcon className=" h-6 w-6" />
              </div>
              <div className=" flex flex-col">
                <span className=" font-semibold text-ellipsis max-w-16 overflow-hidden line-clamp-1">
                  {item?.name}
                </span>
                <span className=" text-xs">
                  {Math.floor(item?.size / 1000)}kb
                </span>
              </div> */}
                <img
                  src={item?.preview}
                  alt={item?.name}
                  className=" w-28 h-auto rounded-sm"
                />
              </div>
              <button
                title="cancel"
                type="button"
                onClick={() => removeImage(index)}
                className=" p-1 bg-primary/10 rounded-full hover:bg-primary/20"
              >
                <CancelIcon className=" h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <label htmlFor={id} className=" flex items-center gap-2 text-gray-400">
          <span>Upload Image</span>
          <CautionIcon />
        </label>
      )}
      <div className=" flex whitespace-nowrap gap-3">
        <button
          title="remove all"
          type="button"
          onClick={() => setValue([])}
          className=" p-1 text-red-500 aspect-square rounded-full hover:text-red-700 transition-all"
        >
          <BinIcon />
        </button>
        <label
          htmlFor={id}
          className="text-sm whitespace-nowrap font-medium text-primary bg-primary/10 p-2 rounded-md hover:bg-primary/20 transition-all cursor-pointer"
        >
          {label}
        </label>
        <input
          id={id}
          required={false}
          type="file"
          multiple
          accept="image/jpg, image/png, image/jpeg"
          onChange={(e) => addUpload(e)}
          className="w-full hidden focus:ring-[#17594F] focus:border-[#17594F]"
        />
      </div>
    </div>
  );
}
