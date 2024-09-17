import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import TextInput from "../inputs/textInput";
import LoadingButton from "../button";
import FileInput from "../inputs/fileInput";
import Select from "../inputs/select";

export default function AddEditAmenities({
  id,
  setOpen,
}: {
  id?: string;
  setOpen: Function;
}) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<{
    name: string;
    size: number;
    preview: string;
  }>({} as any);
  const [preInstalledCharacters, setPreInstralledCharacters] = useState("");

  const [fontIconHTML, setFontIconHTML] = useState("");
  const [room, setRoom] = useState("");
  const [ordering, setOrdering] = useState("");

  const [isCreating, setIsCreating] = useState(false);

  //auto update fields
  useEffect(() => {
    if (id) {
      const {
        title,
        file,
        preInstalledCharacters,
        fontIconHTML,
        room,
        ordering,
      } = {
        title: "title",
        file: { name: "tv.png", size: 1644, preview: "" },
        preInstalledCharacters: "tv",
        fontIconHTML: "<i>bi tv</i>",
        room: "1-bedroom",
        ordering: "2",
      };
      if (title) {
        setTitle(title);
        setFile(file);
        setPreInstralledCharacters(preInstalledCharacters);
        setFontIconHTML(fontIconHTML);
        setRoom(room);
        setOrdering(ordering);
      }
    }
  }, [id]);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  const saveAmenity = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      setIsCreating(true);
      try {
        if (id) {
          //run update endpoint
        } else {
          //run create enpoint
        }
        console.log({
          title,
          file,
          preInstalledCharacters,
          fontIconHTML,
          room,
          ordering,
        });
        setOpen(false);
      } catch (error) {
      } finally {
        setIsCreating(false);
      }
    },
    [title, file, preInstalledCharacters, fontIconHTML, room, ordering, id]
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
          <Select
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
          </Select>
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
            disabled={false}
            isLoading={isCreating}
          />
        </div>
      </form>
    </div>
  );
}
