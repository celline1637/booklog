"use client";

import dynamic from "next/dynamic";

export const RHFDateTimePicker = dynamic(
  () =>
    import("@/shared/components/form/rhf-date-picker").then(
      (mod) => mod.RHFDateTimePicker
    ),
  { ssr: false }
);
