import LoaderIcon from "../../../assets/icons/loader";

interface Props {
  label: string;
  type: "button" | "submit" | "reset" | undefined;
  isLoading: boolean;
  disabled?: boolean;
  clickHandler: () => void;
}

export default function FloatButton({
  label,
  type,
  isLoading,
  disabled,
  clickHandler,
}: Props) {
  return (
    <div className=" fixed bottom-6 right-6">
      <button
        type={type}
        disabled={disabled}
        className={
          disabled
            ? "w-full flex justify-center bg-gray-400 p-3 px-6 rounded-full text-white"
            : "w-full flex justify-center  bg-primary_green-500 text-white p-3 px-6 rounded-full hover:bg-transparent hover:border hover:border-primary_green-500 transition-all hover:text-primary_green-500"
        }
        onClick={clickHandler}
      >
        {isLoading ? <LoaderIcon className="w-6 h-6 animate-spin" /> : label}
      </button>
    </div>
  );
}
