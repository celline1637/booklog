/* eslint-disable perfectionist/sort-imports */

"use client";

import dayjs from "dayjs";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider as Provider } from "@mui/x-date-pickers/LocalizationProvider";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function LocalizationProvider({ children }: Props) {
  const currentLang = {
    value: "ko",
    countryCode: "KR",
    adapterLocale: "ko",
    numberFormat: { code: "ko-KR", currency: "KRW" },
  };

  dayjs.locale(currentLang.adapterLocale);

  return (
    <Provider
      dateAdapter={AdapterDayjs}
      adapterLocale={currentLang.adapterLocale}
    >
      {children}
    </Provider>
  );
}
