"use client";

import type dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import type { FieldError } from "react-hook-form";
import { Controller, useFormContext } from "react-hook-form";

import type { TextFieldProps } from "@mui/material/TextField";
import { DateTimePicker, type DateTimePickerProps } from "@mui/x-date-pickers";
import type { DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import type { MobileDateTimePickerProps } from "@mui/x-date-pickers/MobileDateTimePicker";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";

import { formatStr } from "@/shared/utils/format-time";

// ----------------------------------------------------------------------

const generateHelperText = (error?: FieldError, textField?: TextFieldProps) => {
  if (error?.message) {
    return error.message;
  }
  if (textField?.helperText) {
    return textField.helperText as any;
  }
  return "";
};

type RHFDatePickerProps = DatePickerProps<Dayjs> & {
  name: string;
  // onChange 이벤트 발생 시점에 호출되는 함수
  handleChange?: (value: dayjs.Dayjs | null) => void;
};

export function RHFDatePicker({
  name,
  slotProps,
  handleChange,
  ...other
}: RHFDatePickerProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          {...field}
          value={field.value}
          onChange={(newValue) => {
            if (handleChange) handleChange(newValue);
            field.onChange(newValue);
          }}
          slotProps={{
            textField: {
              fullWidth: true,
              error: !!error,
              helperText: generateHelperText(
                error,
                slotProps?.textField as TextFieldProps
              ),
              ...slotProps?.textField,
            },
            ...slotProps,
          }}
          {...other}
        />
      )}
    />
  );
}

// ----------------------------------------------------------------------

type RHFDateTimePickerProps = DateTimePickerProps<Dayjs> & {
  name: string;
  // onChange 이벤트 발생 시점에 호출되는 함수
  handleChange?: (value: dayjs.Dayjs | null) => void;
};

export function RHFDateTimePicker({
  name,
  slotProps,
  handleChange,
  ...other
}: RHFDateTimePickerProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DateTimePicker
          {...field}
          value={field.value}
          onChange={(newValue) => {
            if (handleChange) handleChange(newValue);
            field.onChange(newValue);
          }}
          slotProps={{
            textField: {
              fullWidth: true,
              error: !!error,
              helperText: generateHelperText(
                error,
                slotProps?.textField as TextFieldProps
              ),
              ...slotProps?.textField,
            },
            ...slotProps,
          }}
          {...other}
          // NOTE: ampm={false} 설정 시, 시간 선택 시간이 24시간 기준으로 변경됨
          ampm={false}
        />
      )}
    />
  );
}

// ----------------------------------------------------------------------

type RHFMobileDateTimePickerProps = MobileDateTimePickerProps<Dayjs> & {
  name: string;
  // onChange 이벤트 발생 시점에 호출되는 함수
  handleChange?: (value: dayjs.Dayjs | null) => void;
};

export function RHFMobileDateTimePicker({
  name,
  slotProps,
  handleChange,
  ...other
}: RHFMobileDateTimePickerProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <MobileDateTimePicker
          {...field}
          value={field.value}
          onChange={(newValue) => {
            if (handleChange) handleChange(newValue);
            field.onChange(newValue);
          }}
          format={formatStr.split.dateTime}
          slotProps={{
            textField: {
              fullWidth: true,
              error: !!error,
              helperText: generateHelperText(
                error,
                slotProps?.textField as TextFieldProps
              ),
              ...slotProps?.textField,
            },
            ...slotProps,
          }}
          {...other}
        />
      )}
    />
  );
}
