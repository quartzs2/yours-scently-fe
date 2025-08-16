"use client";

import { OverlayProvider as Provider } from "overlay-kit";
import { ReactNode } from "react";

export default function OverlayProvider({ children }: { children: ReactNode }) {
  return <Provider>{children}</Provider>;
}
