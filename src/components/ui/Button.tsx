import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@utils/cn";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
} & VariantProps<typeof buttonStyles>;

const buttonStyles = cva(
  "inline-flex items-center justify-center rounded font-semibold transition-colors",
  {
    variants: {
      size: {
        "160x56R": "w-[160px] h-[56px] rounded-full text-button-1",
        "112x48": "w-[112px] h-[48px] text-button-1",
        "120x40": "w-[120px] h-[40px] text-button-1",
        "160x48": "w-[160px] h-[48px] text-button-1",
        "224x56": "w-[224px] h-[56px] text-button-1",
        "328x48": "w-[328px] h-[48px] text-button-1",
        "420x48": "w-[420px] h-[48px] text-button-1",
        "80x34": "w-[80px] h-[34px] text-button-2",
      },
      theme: {
        light:
          "bg-[var(--color-bg-default)] text-[var(--color-primary-main)] border border-[var(--color-primary-main)]",
        dark: "bg-[var(--color-primary-main)] text-[var(--color-bg-default)]",
      },
      hover: {
        false: "",
        true: "",
      },
    },
    compoundVariants: [
      {
        className:
          "hover:bg-[var(--color-primary-dark)] hover:text-[var(--color-bg-default)]",
        theme: "dark",
        hover: true,
      },
      {
        className:
          "hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-primary-dark)] hover:border-[var(--color-primary-dark)]",
        theme: "light",
        hover: true,
      },
    ],
    defaultVariants: {
      theme: "dark",
      hover: false,
    },
  },
);

const Button: React.FC<ButtonProps> = ({
  className,
  children,
  theme,
  hover,
  size,
}) => {
  return (
    <button className={cn(buttonStyles({ theme, hover, size }), className)}>
      {children}
    </button>
  );
};

export default Button;
