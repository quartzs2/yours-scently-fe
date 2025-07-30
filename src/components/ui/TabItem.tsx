import { VariantProps, cva } from "class-variance-authority";
import { X as Close, StarHalf, Star } from "lucide-react";
import IconButton from "@components/ui/IconButton";
import React, { FunctionComponent } from "react";
import Link from "next/link";

function cn(...inputs: (undefined | boolean | string | null)[]) {
  return inputs.filter(Boolean).join(" ");
}

// ==========================================================
// 1. VolumeToggle
// ==========================================================
const volumeToggleVariants = cva(
  "px-3 py-2 rounded-md inline-block text-sm font-bold transition-colors duration-200",
  {
    variants: {
      isOn: {
        true: "bg-bg-default text-primary-main border border-primary-main",
        false: "bg-primary-main text-bg-default",
      },
    },
    defaultVariants: { isOn: false },
  },
);

interface VolumeToggleProps extends VariantProps<typeof volumeToggleVariants> {
  text?: string;
}

export const VolumeToggle: FunctionComponent<VolumeToggleProps> = ({
  text = "mL",
  isOn,
}) => <div className={cn(volumeToggleVariants({ isOn }))}>{text}</div>;

// ==========================================================
// 2. GenderToggle
// ==========================================================
const genderToggleVariants = cva(
  "px-4 py-2 rounded-full inline-block text-sm font-medium cursor-pointer transition-colors duration-200 mr-2",
  {
    variants: {
      selected: {
        true: "bg-bg-default text-primary-main border border-primary-main",
        false: "bg-primary-main text-bg-default",
      },
    },
    defaultVariants: { selected: false },
  },
);

interface GenderToggleProps extends VariantProps<typeof genderToggleVariants> {
  label: string;
}

export const GenderToggle: FunctionComponent<GenderToggleProps> = ({
  selected,
  label,
}) => <div className={cn(genderToggleVariants({ selected }))}>{label}</div>;

// ==========================================================
// 3. Tag (with Close Icon and Link)
// ==========================================================
const tagVariants = cva(
  "inline-flex items-center rounded-full bg-bg-default text-primary-main border border-primary-main transition-colors duration-200",
  {
    variants: {
      size: {
        sm: "px-2.5 py-1 text-xs",
        lg: "px-4 py-2 text-sm",
      },
      deletable: {
        true: "pr-2 pl-4",
        false: "",
      },
    },
    defaultVariants: { deletable: false, size: "lg" },
  },
);

interface TagProps extends VariantProps<typeof tagVariants> {
  deleteHref?: string;
  text: string;
}

export const Tag: FunctionComponent<TagProps> = ({
  deleteHref = "#",
  deletable,
  text,
  size,
}) => (
  <div className={cn(tagVariants({ deletable, size }))}>
    <span className={deletable ? "mr-1" : ""}>{text}</span>
    {deletable && size === "lg" && (
      <div className="h-6 w-6">
        <Link href={deleteHref}>
          <IconButton
            iconClassName="text-bg-default"
            aria-label="close"
            As={Close}
          />
        </Link>
      </div>
    )}
  </div>
);

// ==========================================================
// 4. ActionButton
// ==========================================================
const actionButtonVariants = cva(
  "px-4 py-2 rounded-md inline-block text-sm cursor-pointer transition-colors duration-200",
  {
    variants: {
      selected: {
        false: "text-text-disabled",
        true: "text-text-primary",
      },
    },
    defaultVariants: { selected: false },
  },
);

interface ActionButtonProps extends VariantProps<typeof actionButtonVariants> {
  text: string;
}

export const ActionButton: FunctionComponent<ActionButtonProps> = ({
  selected,
  text,
}) => <div className={cn(actionButtonVariants({ selected }))}>{text}</div>;

// ==========================================================
// 5. SortFilterButton
// ==========================================================
const sortFilterButtonVariants = cva(
  "px-4 py-2 rounded-md inline-block text-sm cursor-pointer text-text-primary transition-colors duration-200",
);

interface SortFilterButtonProps {
  text: string;
}

export const SortFilterButton: FunctionComponent<SortFilterButtonProps> = ({
  text,
}) => (
  <div className={cn(sortFilterButtonVariants())}>
    <div className="flex items-center justify-center">{text}</div>
  </div>
);

// ==========================================================
// 6. StarRating (IconButton + Lucide icons 적용)
// ==========================================================
interface StarRatingProps {
  rating: number;
}

export const StarRating: FunctionComponent<StarRatingProps> = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating % 1 !== 0;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <div className="inline-flex items-center space-x-0.5">
      {[...Array(full)].map((_, i) => (
        <IconButton
          iconClassName="text-yellow-400 fill-yellow-400"
          aria-label="꽉 찬 별"
          key={`full-${i}`}
          tabIndex={-1}
          As={Star}
        />
      ))}
      {half && (
        <IconButton
          iconClassName="text-yellow-400 fill-yellow-400"
          aria-label="반 별"
          As={StarHalf}
          tabIndex={-1}
          key="half"
        />
      )}
    </div>
  );
};

// ==========================================================
// 7. StatusTag
// ==========================================================
const statusTagVariants = cva(
  "px-3 py-1 rounded-md inline-block text-xs font-medium shadow-sm transition-colors duration-200",
  {
    variants: {
      type: {
        processing:
          "bg-bg-default text-primary-main border border-primary-main",
        preparing: "bg-bg-subtle text-primary-dark border border-primary-dark",
        temporarilyOut: "bg-orange-100 text-orange-800",
        delivered: "bg-primary-dark text-bg-default",
        shipped: "bg-primary-main text-bg-subtle",
        inventory: "bg-green-100 text-green-800",
        soldOut: "bg-red-100 text-red-800",
      },
    },
  },
);

interface StatusTagProps extends VariantProps<typeof statusTagVariants> {
  text: string;
}

export const StatusTag: FunctionComponent<StatusTagProps> = ({
  text,
  type,
}) => <div className={cn(statusTagVariants({ type }))}>{text}</div>;
