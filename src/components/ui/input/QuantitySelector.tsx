"use client";

import { useEffect, useState } from "react";
import { cn } from "@utils/cn";

type QuantitySelectorProps = {
  onQuantityChange?: (newQuantity: number) => void;
  buttonClassName?: string;
  initialQuantity?: number;
  inputClassName?: string;
};

const QuantitySelector = ({
  buttonClassName = "w-8 h-8",
  inputClassName = "w-8 h-8",
  initialQuantity = 1,
  onQuantityChange,
}: QuantitySelectorProps) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const max = 99;
  const min = 1;

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const handleDecrease = () => {
    const newQuantity = Math.max(min, quantity - 1);
    setQuantity(newQuantity);
    onQuantityChange?.(newQuantity);
  };

  const handleIncrease = () => {
    const newQuantity = Math.min(max, quantity + 1);
    setQuantity(newQuantity);
    onQuantityChange?.(newQuantity);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    const newQuantity = isNaN(value)
      ? min
      : Math.min(max, Math.max(min, value));
    setQuantity(newQuantity);
    onQuantityChange?.(newQuantity);
  };

  return (
    <>
      <button
        className={cn(
          "text-button-1 flex items-center justify-center rounded-l-xl border border-border-default !text-text-secondary disabled:cursor-not-allowed",
          buttonClassName,
        )}
        disabled={quantity <= min}
        onClick={handleDecrease}
        aria-label="수량 감소"
      >
        -
      </button>
      <input
        className={cn(
          "text-button-1 border-y border-border-default text-center !text-text-secondary focus:ring-0 focus:outline-none",
          "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
          inputClassName,
        )}
        onChange={handleInputChange}
        value={quantity}
        aria-label="수량"
        type="number"
        min={min}
        max={max}
      />
      <button
        className={cn(
          "text-button-1 flex items-center justify-center rounded-r-xl border border-border-default !text-text-secondary disabled:cursor-not-allowed",
          buttonClassName,
        )}
        disabled={quantity >= max}
        onClick={handleIncrease}
        aria-label="수량 증가"
      >
        +
      </button>
    </>
  );
};

export default QuantitySelector;
