"use client";

import { Controller, useFormContext } from "react-hook-form";

import { READ_STATUS } from "@/config/read-status";
import { type InferredBookReviewSchema } from "@/schema/review-schema";
import { RHFDateTimePicker } from "@/shared/components/form/rhf-date-picker.client";
import { RHFSelect } from "@/shared/components/form/rhf-select";
import RHFTextField from "@/shared/components/form/rhf-text-field";
import { typedEntries } from "@/shared/utils/type";
import { Card, MenuItem, Stack, Typography } from "@mui/material";

const BookStep1 = () => {
  const { control, getValues, setValue, clearErrors } =
    useFormContext<InferredBookReviewSchema>();

  /** 독서 상태에 따라 독서 기간을 초기화합니다. */
  const handleInitDateOnStatusChange = (status: string) => {
    console.log("handleInitDateOnStatusChange", status);
    if (status === READ_STATUS.TODO.value) {
      setValue("startDate", null);
      setValue("endDate", null);
      return;
    }

    if (status === READ_STATUS.PROGRESS.value) {
      const endDate = getValues("endDate");
      if (endDate) {
        setValue("endDate", null);
      }
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <Stack spacing={2} sx={{ mb: 2 }}>
        <Stack spacing={2}>
          <Typography variant={"body2"} sx={{ display: "flex", gap: 1 }}>
            {"독서 상태"}
          </Typography>
          <RHFSelect
            name="status"
            onChange={(e) => handleInitDateOnStatusChange(e.target.value)}
            fullWidth
          >
            {typedEntries(READ_STATUS).map(([key, { value, label }]) => (
              <MenuItem key={key} value={value}>
                {label}
              </MenuItem>
            ))}
          </RHFSelect>
        </Stack>
        <Stack spacing={2}>
          <Typography variant={"body2"} sx={{ display: "flex", gap: 1 }}>
            {"책 제목"}
          </Typography>
          <RHFTextField name="title" />
        </Stack>
        <Stack spacing={2}>
          <Typography variant={"body2"} sx={{ display: "flex", gap: 1 }}>
            {"저자"}
          </Typography>
          <RHFTextField name="author" />
        </Stack>
        <Stack spacing={2}>
          <Typography variant={"body2"} sx={{ display: "flex", gap: 1 }}>
            {"도서 출판일"}
          </Typography>
          <RHFDateTimePicker
            name="publishDate"
            label="도서 출판일"
            handleChange={() => clearErrors("publishDate")}
          />
        </Stack>
        <Controller
          name="status"
          control={control}
          render={({ field }) => {
            // 상태가 TODO인 경우 날짜 선택을 숨김
            if (field.value === "TODO") return <></>;
            return (
              <Stack gap={2}>
                <Typography variant={"body2"} sx={{ display: "flex", gap: 1 }}>
                  {"독서 기간"}
                </Typography>

                <Stack direction="row" spacing={2}>
                  <RHFDateTimePicker
                    name="startDate"
                    label="독서 시작일"
                    handleChange={() => clearErrors("startDate")}
                  />

                  <RHFDateTimePicker
                    disabled={field.value !== "DONE"}
                    name="endDate"
                    label="독서 종료일"
                    handleChange={() => clearErrors("endDate")}
                  />
                </Stack>
              </Stack>
            );
          }}
        />
      </Stack>
    </Card>
  );
};

export default BookStep1;
