import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import TextInput from "../inputs/textInput";
import LoadingButton from "../button";
import FileInput from "../inputs/fileInput";
import Select from "../inputs/select";
import useGetAmenity from "../../services-hooks/useGetAmenity";
import useAxiosMultipart from "../../useHooks/useAxiosMultipart";
import { useAppDispatch } from "../../stores/hooks";
import { addAmenity, replaceAmenity } from "../../stores/apiData/amenities";
import { openSnackbar } from "../../stores/appFunctionality/snackbar";
import TextAreaInput from "../inputs/textArea";

export default function AddEditAmenities({
  id,
  setOpen,
}: {
  id?: string;
  setOpen: Function;
}) {
  const axios = useAxiosMultipart({
    disableSuccMssg: false,
    disableErrMssg: false,
  });
  const dispatch = useAppDispatch();
  const { data } = useGetAmenity({ id });
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<{
    name: string;
    size: number;
    preview: string;
  }>({} as any);
  // const [preInstalledCharacters, setPreInstralledCharacters] = useState("");
  // const [fontIconHTML, setFontIconHTML] = useState("");
  // const [room, setRoom] = useState("");
  const [description, setDescription] = useState("");
  const [ordering, setOrdering] = useState("");

  const [isCreating, setIsCreating] = useState(false);
  //auto update fields
  useEffect(() => {
    if (id) {
      const { name, image, ordering_position, description } = data;
      if (name) {
        setTitle(name);
        setFile({ name, size: 100, preview: image || "" });
        setDescription(description || "");
        // setPreInstralledCharacters(preInstalledCharacters);
        // setFontIconHTML(fontIconHTML);
        // setRoom(room);
        setOrdering(String(ordering_position || "1"));
      }
    }
  }, [id, data]);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  const saveAmenity = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      setIsCreating(true);
      const payload = {
        name: title,
        description: description,
        image: file,
        ordering_position: ordering,
      };
      try {
        if (id) {
          //run update endpoint
          const response = await axios.post(`/admin/amenity/${id}`, payload);
          const { amenity } = response?.data?.data;
          dispatch(
            openSnackbar({
              message: "Amenity successfully updated",
              isError: false,
            })
          );
          dispatch(replaceAmenity(amenity));
        } else {
          //run create enpoint
          const response = await axios.post("/admin/amenity", payload);
          const { amenity } = response?.data?.data;
          dispatch(
            openSnackbar({
              message: "Amenity successfully added",
              isError: false,
            })
          );
          dispatch(addAmenity(amenity));
        }
        setOpen(false);
      } catch (error) {
      } finally {
        setIsCreating(false);
      }
    },
    [title, file, description, ordering, id]
  );

  return (
    <div className="w-full">
      <form className=" flex flex-col gap-10" onSubmit={saveAmenity}>
        <div className=" w-full grid grid-cols-1 gap-5">
          <TextInput
            inputType="text"
            isRequired={true}
            value={title}
            setValue={setTitle}
            id="Title"
            placeholder="Enter Title"
          />
          <FileInput
            value={file}
            setValue={setFile}
            label="Choose File"
            isRequired={true}
            id="amenity-image"
          />
          <TextAreaInput
            isRequired={false}
            placeholder="description"
            id="description"
            setValue={setDescription}
            value={description}
          />
          {/* <Select
            isRequired={true}
            value={preInstalledCharacters}
            setValue={setPreInstralledCharacters}
            id="pre-installed-characters"
          >
            <option value="" disabled>
              Select pre-installed characteristics
            </option>
            <option value="tv">television</option>
          </Select>
          <TextInput
            inputType="text"
            isRequired={true}
            value={fontIconHTML}
            setValue={setFontIconHTML}
            id="font-icon-html"
            placeholder="Enter Font Icon HTML"
          />
          <Select
            isRequired={true}
            value={room}
            setValue={setRoom}
            id="room-assignment"
          >
            <option value="" disabled>
              Select room to be assigned to
            </option>
            <option value="1-bedroom">One bedroom</option>
          </Select> */}
          <Select
            isRequired={true}
            value={ordering}
            setValue={setOrdering}
            id="ordering"
          >
            <option value="" disabled>
              Select ordering position
            </option>
            {Array.from({ length: 4 }, (_, index) => (
              <option value={`${index}`} key={index}>
                {index}
              </option>
            ))}
          </Select>
        </div>
        <div className=" flex items-center gap-5">
          <LoadingButton
            type="button"
            label="Cancel"
            variant={2}
            disabled={false}
            isLoading={false}
            clickHandler={() => close()}
          />

          <LoadingButton
            type="submit"
            label={id ? "Save Changes" : "Create Characteristics"}
            disabled={isCreating}
            isLoading={isCreating}
          />
        </div>
      </form>
    </div>
  );
}
