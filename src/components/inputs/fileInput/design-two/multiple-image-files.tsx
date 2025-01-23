import { ChangeEvent, useCallback } from "react";
import PhotoIcon from "../../../../assets/icons/photo";
import CancelIcon from "../../../../assets/icons/cancel";
import { useAppDispatch } from "../../../../stores/hooks";
import { openSnackbar } from "../../../../stores/appFunctionality/snackbar";
import { addRemovableImages } from "../../../../stores/inAppDataInterations/addEditApartmentInfo";
import BinIcon from "../../../../assets/icons/bin-icon";
import CameraSolidIcon from "../../../../assets/icons/camera";

interface Props {
  value: { name: string; size: number; preview: string; id?: number }[];
  setValue: (payload: any) => void;
  label?: string;
  isRequired?: boolean;
  id: string;
}

export default function MultipleFileInputDesignTwo({
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
        imageArray.push(file);
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
    <div className="w-full">
      {value?.length > 0 ? (
        <div className=" flex items-center flex-wrap gap-3">
          {value.map((item, index) => (
            <div key={index} className=" flex gap-2 items-center relative">
              <div>
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
                className=" absolute top-0 right-2 p-1 bg-black/20 text-white rounded-full hover:bg-primary/20"
              >
                <BinIcon className=" h-5 w-5" />
              </button>
            </div>
          ))}

          <label
            htmlFor={id}
            className=" font-semibold text-primary border-dotted border-2 border-primary hover:cursor-pointer hover:bg-primary/20 transition-all rounded-md h-full aspect-square p-3 bg-primary/10"
          >
            <CameraSolidIcon />
          </label>
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
            className=" w-full border transition-all cursor-pointer rounded-xl flex items-center overflow-hidden "
          >
            <div className=" flex items-center gap-2 bg-primary text-white  p-4">
              <PhotoIcon /> <span className=" font-semibold">Choose image</span>
            </div>
            <span className=" p-4 text-gray-400">No file chosen</span>
          </label>
        </div>
      )}
      <input
        id={id}
        type="file"
        accept="image/jpg, image/png, image/jpeg"
        multiple
        onChange={(e) => addUpload(e)}
        className="w-full hidden focus:ring-[#17594F] focus:border-[#17594F]"
      />
    </div>
  );
}
