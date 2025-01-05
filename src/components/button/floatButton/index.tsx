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
    <div className=" fixed bottom-6 right-6 ">
      <button
        type={type}
        disabled={disabled}
        className={`w-full flex justify-center p-3 px-12 rounded-full transition-all ${
          disabled
            ? "w-full flex justify-center bg-gray-400 p-3 px-6 rounded-full text-white"
            : "bg-primary hover:bg-transparent hover:border hover:border-primary  hover:text-primary text-white"
        }`}
        onClick={clickHandler}
      >
        {isLoading ? <LoaderIcon className="w-6 h-6 animate-spin" /> : label}
      </button>
    </div>
  );
}
