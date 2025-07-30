import { useEffect, useState } from "react";

type DebounceFunctionProps<T> = {
  delay?: number;
  value: T;
};

/**
 * 디바운스 훅
 * @param delay 디바운스 지연 시간, 기본값 500ms
 * @param value 디바운스 처리할 값
 * @returns 디바운스 처리된 값
 * @example
 * const debouncedValue = useDebounce({ delay: 500, value: "test" });
 * console.log(debouncedValue); // 500ms 후에 "test" 출력
 */
export const useDebounce = <T>({
  delay = 500,
  value,
}: DebounceFunctionProps<T>) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
