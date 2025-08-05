"use client";

import { useFormContext, useWatch } from "react-hook-form";

import { type InferredBookReviewSchema } from "@/schema/review-schema";
import RHFTextField from "@/shared/components/form/rhf-text-field";
import { Card, Stack, Typography } from "@mui/material";
import { useMemo } from "react";

const MIN_LENGTH = 100;

const BookStep3 = () => {
  const { control } = useFormContext<InferredBookReviewSchema>();

  // 별점 값을 감시
  const rating = useWatch({
    control,
    name: "rating",
  });

  // 독후감 값을 감시 (글자수 체크용)
  const review = useWatch({
    control,
    name: "review",
  });

  // 별점이 1점 또는 5점인 경우 최소 100자 필수
  const isReviewRequired = rating <= 1 || rating === 5;
  const currentLength = review?.length || 0;

  const isValidLength = !isReviewRequired || currentLength >= MIN_LENGTH;

  const label = useMemo(() => {
    if (isReviewRequired && rating <= 1) {
      return "어떤 점이 아쉬웠는지 알려주세요! 🥹";
    }
    if (isReviewRequired && rating === 5) {
      return "정말 좋았나봐요! 어떤 점이 좋았는지 알려주세요!";
    }
    return "이 책을 읽고 느낀 점을 자유롭게 작성해주세요";
  }, [isReviewRequired, rating]);

  return (
    <Card sx={{ p: 3 }}>
      <Stack spacing={3}>
        <Typography variant="h6">독후감 작성</Typography>

        <Stack spacing={2}>
          <Typography variant="body2">
            {label}
            {isReviewRequired && (
              <Typography component="span" color="error" sx={{ ml: 1 }}>
                *
              </Typography>
            )}
          </Typography>

          <RHFTextField
            name="review"
            multiline
            rows={8}
            placeholder={
              isReviewRequired
                ? `최소 ${MIN_LENGTH}자 이상 작성해주세요...`
                : "독후감을 자유롭게 작성해주세요..."
            }
            helperText={
              isReviewRequired
                ? `${currentLength}/${MIN_LENGTH}자 ${isValidLength ? "✓" : ""}`
                : `${currentLength}자`
            }
          />
        </Stack>
      </Stack>
    </Card>
  );
};

export default BookStep3;
