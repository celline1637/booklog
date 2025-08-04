"use client";

import { Controller, useFormContext } from "react-hook-form";

import { type BookReviewFormValues } from "@/schema/review-schema";
import { RHFSwitch } from "@/shared/components/form/rhf-switch";
import { Box, Card, Rating, Stack, Typography } from "@mui/material";

const BookStep2 = () => {
  const { control } = useFormContext<BookReviewFormValues>();

  return (
    <Card sx={{ p: 3 }}>
      <Stack spacing={3}>
        {/* 도서 추천 여부 */}
        <Stack spacing={2}>
          <Typography variant="body2">
            이 책을 다른 사람에게 추천하나요?
          </Typography>

          <RHFSwitch
            name="isRecommended"
            dynamicLabel={{
              checked: "추천함",
              unchecked: "추천하지 않음",
            }}
          />
        </Stack>

        {/* 별점 */}
        <Stack spacing={2}>
          <Typography variant="body2">
            이 책에 대한 평점을 남겨주세요
          </Typography>
          <Controller
            name="rating"
            control={control}
            render={({ field }) => (
              <Box>
                <Rating
                  value={field.value || 0}
                  onChange={(_, newValue) => {
                    field.onChange(newValue);
                  }}
                  precision={0.5}
                  size="large"
                  sx={{ fontSize: "2rem" }}
                />
                <Typography
                  variant="caption"
                  display="block"
                  sx={{ mt: 1, color: "text.secondary" }}
                >
                  {field.value ? `${field.value}점` : "평점을 선택해주세요"}
                </Typography>
              </Box>
            )}
          />
        </Stack>
      </Stack>
    </Card>
  );
};

export default BookStep2;
