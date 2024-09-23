import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  label: string;
  url: string;
  disabled?: boolean;
  variant?: 1 | 2 | 3;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  className?: string;
}

export default function LinkButton({
  label,
  url,
  disabled,
  variant = 1,
  startIcon,
  endIcon,
  className,
}: Props) {
  return (
    <Link
      to={url}
      className={`w-full flex justify-center whitespace-nowrap p-3 px-6 rounded-full transition-all  
        ${
          disabled
            ? "bg-primary/30 text-white"
            : variant === 2
            ? " border hover:border-primary/60 border-primary text-primary"
            : variant === 3
            ? className
            : "bg-primary hover:bg-transparent hover:border hover:border-primary  hover:text-primary text-white"
        }`}
    >
      {startIcon} {label} {endIcon}
    </Link>
  );
}
