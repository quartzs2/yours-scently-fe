import { RefObject, useEffect } from "react";

function useScroll(
  refs: RefObject<HTMLDivElement | null>[],
  onChange: (activeIndex: number) => void,
) {
  useEffect(() => {
    const handleScroll = () => {
      const middle = window.innerHeight / 2;

      const distances = refs.map(
        (ref) => ref.current?.getBoundingClientRect().top ?? Infinity,
      );

      const closestIndex = distances.reduce((closestIdx, curr, idx, arr) => {
        return Math.abs(curr - middle) < Math.abs(arr[closestIdx] - middle)
          ? idx
          : closestIdx;
      }, 0);

      onChange(closestIndex);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [refs, onChange]);
}

export default useScroll;
