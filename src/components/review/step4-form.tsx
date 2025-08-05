"use client";

import { useCallback } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";

import { type InferredBookReviewSchema } from "@/schema/review-schema";
import RHFTextField from "@/shared/components/form/rhf-text-field";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Card,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

const BookStep4 = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<InferredBookReviewSchema>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "quotes",
  });

  const totalPageCount = useWatch({
    control,
    name: "totalPageCount",
  });

  const quotes = useWatch({
    control,
    name: "quotes",
  });

  const quotesLength = quotes?.length || 0;

  // 인용구 추가
  const handleAddQuote = useCallback(() => {
    append({ text: "", page: undefined });
  }, [append]);

  // 인용구 삭제
  const handleRemoveQuote = useCallback(
    (index: number) => {
      remove(index);
    },
    [remove]
  );

  return (
    <Card sx={{ p: 3 }}>
      <Stack spacing={3}>
        <Stack spacing={2}>
          <Typography variant="h6">📝 인용구 등록</Typography>
          <Typography variant="body2" color="text.secondary">
            책에서 인상 깊었던 구절들을 기록해보세요.
            {quotesLength >= 2 && (
              <Typography
                component="span"
                variant="body2"
                color="warning.main"
                sx={{ display: "block", mt: 1 }}
              >
                ⚠️ 인용구가 2개 이상일 때는 모든 페이지 번호가 필수입니다.
              </Typography>
            )}
          </Typography>
        </Stack>

        {/* 인용구 목록 */}
        <Stack spacing={3}>
          {fields.map((field, index) => (
            <Card
              key={field.id}
              variant="outlined"
              sx={{ p: 2, position: "relative" }}
            >
              <Stack spacing={2}>
                {/* 헤더 */}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="subtitle2">
                    인용구 {index + 1}
                  </Typography>
                  {fields.length > 1 && (
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleRemoveQuote(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Stack>

                {/* 인용구 내용 */}
                <RHFTextField
                  name={`quotes.${index}.text`}
                  label="인용구 내용"
                  placeholder="책에서 인상 깊었던 구절을 입력하세요..."
                  multiline
                  rows={3}
                  helperText={
                    errors.quotes?.[index]?.text?.message ||
                    "책의 원문 그대로 입력해주세요."
                  }
                />

                {/* 페이지 번호 - 2개 이상일 때만 표시 */}
                {quotesLength >= 2 && (
                  <RHFTextField
                    name={`quotes.${index}.page`}
                    label="페이지 번호"
                    placeholder="페이지 번호를 입력하세요"
                    type="number"
                    inputProps={{
                      min: 1,
                      max: totalPageCount || undefined,
                    }}
                    helperText={
                      errors.quotes?.[index]?.page?.message ||
                      `1 ~ ${totalPageCount || "∞"} 범위로 입력해주세요.`
                    }
                  />
                )}
              </Stack>
            </Card>
          ))}
        </Stack>

        {/* 인용구 추가 버튼 */}
        <Box display="flex" justifyContent="center">
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleAddQuote}
            sx={{ minWidth: 200 }}
          >
            인용구 추가
          </Button>
        </Box>
      </Stack>
    </Card>
  );
};

export default BookStep4;
