"use client";

import { useCallback } from "react";
import { Controller, useFormContext } from "react-hook-form";

import BookSelectAutocomplete from "@/components/review/book-select-autocomplete";
import { READ_STATUS } from "@/config/read-status";
import { type BookReviewFormValues } from "@/schema/review-schema";
import { RHFDateTimePicker } from "@/shared/components/form/rhf-date-picker.client";
import { RHFSelect } from "@/shared/components/form/rhf-select";
import { typedEntries } from "@/shared/utils/type";
import type { Book } from "@/types/book";
import type { ReadStatus } from "@/types/read-status";
import { Card, Stack, Typography } from "@mui/material";

const BookStep1 = () => {
  const { control, getValues, setValue, clearErrors } =
    useFormContext<BookReviewFormValues>();

  /** 독서 상태에 따라 독서 기간을 초기화합니다. */
  const handleInitDateOnStatusChange = (status: ReadStatus) => {
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

  /** 도서 선택 시 폼 데이터 업데이트 */
  const handleBookSelect = useCallback(
    (book: Book | null) => {
      if (!book) {
        return;
      }

      setValue("selectedBook", book);

      // 에러 클리어
      clearErrors(["selectedBook"]);
    },
    [setValue, clearErrors]
  );

  return (
    <Card sx={{ p: 3 }}>
      <Stack spacing={3}>
        {/* 도서 검색 및 선택 */}
        <Stack spacing={2}>
          <Typography variant="h6">📚 도서 선택</Typography>
          <BookSelectAutocomplete
            name="selectedBook"
            label="도서 선택"
            placeholder="책 제목 또는 저자명을 입력하세요..."
            onBookSelect={handleBookSelect}
          />
        </Stack>

        {/* 선택된 도서 정보 표시 */}
        <Controller
          name="selectedBook"
          control={control}
          render={({ field }) => {
            if (!field.value) return <></>;

            return (
              <Stack spacing={2}>
                <Typography variant="h6">📖 선택된 도서 정보</Typography>
                <Stack spacing={1}>
                  <Typography variant="body2">
                    <strong>제목:</strong> {field.value.title}
                  </Typography>
                  <Typography variant="body2">
                    <strong>저자:</strong> {field.value.author}
                  </Typography>
                  <Typography variant="body2">
                    <strong>출판일:</strong>
                    {new Date(field.value.publishedAt).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2">
                    <strong>총 페이지:</strong> {field.value.totalPages}쪽
                  </Typography>
                </Stack>
              </Stack>
            );
          }}
        />

        {/* 독서 상태 */}
        <Stack spacing={2}>
          <Typography variant="h6">📊 독서 진행 상태</Typography>
          <RHFSelect
            name="status"
            label="독서 상태"
            onChange={(e) =>
              handleInitDateOnStatusChange(e.target.value as ReadStatus)
            }
            fullWidth
          >
            {typedEntries(READ_STATUS).map(([key, { value, label }]) => (
              <RHFSelect.Option key={key} value={value}>
                {label}
              </RHFSelect.Option>
            ))}
          </RHFSelect>
        </Stack>

        {/* 독서 기간 */}
        <Controller
          name="status"
          control={control}
          render={({ field }) => {
            // 상태가 TODO인 경우 날짜 선택을 숨김
            if (field.value === "TODO") return <></>;

            return (
              <Stack spacing={2}>
                <Typography variant="h6">📅 독서 기간</Typography>
                <Stack direction="row" spacing={2}>
                  <RHFDateTimePicker
                    name="startDate"
                    label="독서 시작일"
                    handleChange={() => {
                      clearErrors("startDate");
                    }}
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
