// import { useCallback } from "react";

import { ReactNode, useCallback } from "react";

interface Props {
  label: string;
  type: "button" | "submit" | "reset" | undefined;
  isLoading: boolean;
  disabled?: boolean;
  clickHandler?: Function;
  variant?: 1 | 2;
  startIcon?: ReactNode;
}

export default function LoadingButton({
  label,
  type,
  isLoading,
  disabled,
  clickHandler,
  variant = 1,
  startIcon,
}: Props) {
  const handleClick = useCallback(() => {
    if (clickHandler) {
      clickHandler();
    }
  }, []);
  return (
    <button
      type={type}
      disabled={disabled}
      className={`w-full flex justify-center p-3 px-6 rounded-full transition-all  
        ${
          disabled
            ? "bg-primary/30 text-white"
            : variant === 2
            ? " border hover:border-primary"
            : "bg-primary hover:bg-transparent hover:border hover:border-primary  hover:text-primary text-white"
        }`}
      onClick={() => handleClick()}
    >
      {isLoading ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 animate-spin"
        >
          <path
            fillRule="evenodd"
            d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <span className=" flex items-center gap-2">
          {startIcon} {label}
        </span>
      )}
    </button>
  );
}
