import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { RefreshCcw } from "lucide-react";
import { cn } from "../../utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-semibold whitespace-nowrap rounded-md text-sm  transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-black shadow  w-full text-center border-2 border-primary-dull hover:scale-105",
        urgent: "bg-red-500 border-0 text-white hover:bg-red-500/80",
        file: "bg-white text-gray-900 border border-[#E5E5E7] border-l-0 py-[14px]  md:py-[14px] ",
        unstyled: "text-gray-900 dark:text-dark-ash-900",
      },
      size: {
        default: "text-sm px-2 py-3",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        file: "px-4 lg:px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      isLoading,
      size,
      asChild = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        disabled={isLoading || disabled}
      >
        {isLoading ? (
          <RefreshCcw className=" h-4 w-4 animate-spin" />
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
