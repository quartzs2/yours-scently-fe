import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@utils/cn";
import React from "react";

const tabItemVariants = cva(
  "px-4 py-2 rounded-full border text-button-2 transition-colors duration-200 cursor-pointer",
  {
    variants: {
      selected: {
        false: "bg-transparent text-color-text-secondary",
        true: "bg-primary-main text-white",
      },
      variant: {
        tab: "border-transparent",
        tag: "border-default",
      },
      deletable: {
        true: "pr-8 relative",
        false: "",
      },
    },
    defaultVariants: {
      deletable: false,
      selected: false,
      variant: "tab",
    },
  },
);

type TabItemProps = {
  onDelete?: () => void;
  onClick?: () => void;
  label: string;
} & VariantProps<typeof tabItemVariants>;

const TabItem = ({
  deletable,
  selected,
  onDelete,
  variant,
  onClick,
  label,
}: TabItemProps) => {
  return (
    <div
      className={cn(tabItemVariants({ deletable, selected, variant }))}
      onClick={onClick}
    >
      <span>{label}</span>
      {deletable && (
        <button
          className="text-color-text-disabled hover:text-color-text-primary absolute top-1/2 right-2 -translate-y-1/2 text-sm"
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.();
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default TabItem;
