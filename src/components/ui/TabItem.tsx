import { VariantProps, cva } from "class-variance-authority";
import { X as Close, StarHalf, Star } from "lucide-react";
import React, { FunctionComponent } from "react";
import Icon from "@components/ui/Icon";
import { cn } from "@utils/cn";

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

interface VolumeToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof volumeToggleVariants> {
  text?: string;
}

export const VolumeToggle: FunctionComponent<VolumeToggleProps> = ({
  text = "mL",
  isOn,
  ...props
}) => (
  <button
    className={cn(volumeToggleVariants({ isOn }))}
    type="button"
    {...props}
  >
    {text}
  </button>
);

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

interface GenderToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof genderToggleVariants> {
  label: string;
}

export const GenderToggle: FunctionComponent<GenderToggleProps> = ({
  selected,
  label,
  ...props
}) => (
  <button
    className={cn(genderToggleVariants({ selected }))}
    type="button"
    {...props}
  >
    {label}
  </button>
);

// ==========================================================
// 3. Tag (with Close Icon and onDelete handler)
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
  onDelete?: () => void;
  text: string;
}

export const Tag: FunctionComponent<TagProps> = ({
  deletable,
  onDelete,
  text,
  size,
}) => (
  <div className={cn(tagVariants({ deletable, size }))}>
    <span className={deletable ? "mr-1" : ""}>{text}</span>
    {deletable && size === "lg" && onDelete && (
      <button
        className="ml-1 h-6 w-6"
        onClick={onDelete}
        aria-label="close"
        type="button"
      >
        <Icon className="text-bg-default" As={Close} />
      </button>
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

interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof actionButtonVariants> {
  text: string;
}

export const ActionButton: FunctionComponent<ActionButtonProps> = ({
  selected,
  text,
  ...props
}) => (
  <button
    className={cn(actionButtonVariants({ selected }))}
    type="button"
    {...props}
  >
    {text}
  </button>
);

// ==========================================================
// 5. SortFilterButton
// ==========================================================
const sortFilterButtonVariants =
  "px-4 py-2 rounded-md inline-block text-sm cursor-pointer text-text-primary transition-colors duration-200";

interface SortFilterButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export const SortFilterButton: FunctionComponent<SortFilterButtonProps> = ({
  text,
  ...props
}) => (
  <button className={cn(sortFilterButtonVariants)} type="button" {...props}>
    <div className="flex items-center justify-center">{text}</div>
  </button>
);

// ==========================================================
// 6. StarRating (non-interactive, using Icon)
// ==========================================================
interface StarRatingProps {
  rating: number;
}

export const StarRating: FunctionComponent<StarRatingProps> = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating % 1 !== 0;

  return (
    <div
      className="inline-flex items-center space-x-0.5"
      aria-label={`Rating: ${rating} out of 5 stars`}
    >
      {[...Array(full)].map((_, i) => (
        <Icon
          className="fill-yellow-400 text-yellow-400"
          aria-hidden="true"
          key={`full-${i}`}
          As={Star}
        />
      ))}
      {half && (
        <Icon
          className="fill-yellow-400 text-yellow-400"
          aria-hidden="true"
          As={StarHalf}
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
