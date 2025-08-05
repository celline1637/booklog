"use client";

import { useFormContext, useWatch } from "react-hook-form";

import { type InferredBookReviewSchema } from "@/schema/review-schema";
import { RHFSwitch } from "@/shared/components/form/rhf-switch";
import LockIcon from "@mui/icons-material/Lock";
import PublicIcon from "@mui/icons-material/Public";
import { Alert, Box, Card, Divider, Stack, Typography } from "@mui/material";

const BookStep5 = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<InferredBookReviewSchema>();

  const isPublic = useWatch({
    control,
    name: "isPublic",
  });

  return (
    <Card sx={{ p: 3 }}>
      <Stack spacing={3}>
        <Stack spacing={2}>
          <Typography variant="h6">🌍 공개 여부 설정</Typography>
          <Typography variant="body2" color="text.secondary">
            작성한 독서 기록을 다른 사람들과 공유할지 선택해주세요.
          </Typography>
        </Stack>

        {/* 공개 여부 스위치 */}
        <Card variant="outlined" sx={{ p: 3 }}>
          <Stack spacing={3}>
            <RHFSwitch
              name="isPublic"
              label="독서 기록 공개"
              helperText={
                errors.isPublic?.message ||
                "공개로 설정하면 다른 사용자들이 내 독서 기록을 볼 수 있습니다."
              }
            />

            <Divider />

            {/* 공개/비공개 설명 */}
            <Stack spacing={2}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 1,
                  backgroundColor: isPublic ? "success.50" : "grey.50",
                  border: "1px solid",
                  borderColor: isPublic ? "success.200" : "grey.200",
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  {isPublic ? (
                    <PublicIcon color="success" />
                  ) : (
                    <LockIcon color="action" />
                  )}
                  <Stack spacing={1}>
                    <Typography variant="subtitle2">
                      {isPublic ? "🌍 공개 설정" : "🔒 비공개 설정"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {isPublic
                        ? "다른 사용자들이 내 독서 기록을 볼 수 있고, 검색 결과에도 표시됩니다."
                        : "나만 볼 수 있으며, 다른 사용자들에게는 표시되지 않습니다."}
                    </Typography>
                  </Stack>
                </Stack>
              </Box>

              {/* 공개 시 추가 안내 */}
              {isPublic && (
                <Alert severity="info" sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    <strong>공개 시 포함되는 정보:</strong>
                    <br />
                    • 도서 정보 (제목, 저자, 출판사)
                    <br />
                    • 별점 및 추천 여부
                    <br />
                    • 독후감 (작성한 경우)
                    <br />
                    • 인용구 (작성한 경우)
                    <br />
                    <br />
                    개인정보(독서 시작/종료일 등)는 공개되지 않습니다.
                  </Typography>
                </Alert>
              )}

              {/* 비공개 시 추가 안내 */}
              {!isPublic && (
                <Alert severity="warning" sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    <strong>비공개 설정:</strong>
                    <br />
                    나중에 언제든지 공개로 변경할 수 있습니다.
                    <br />내 개인 독서 기록 페이지에서는 항상 모든 정보를 확인할
                    수 있습니다.
                  </Typography>
                </Alert>
              )}
            </Stack>
          </Stack>
        </Card>

        {/* 완료 안내 */}
        <Box
          sx={{
            p: 3,
            backgroundColor: "primary.50",
            borderRadius: 1,
            border: "1px solid",
            borderColor: "primary.200",
            textAlign: "center",
          }}
        >
          <Typography variant="subtitle1" color="primary.main" gutterBottom>
            🎉 독서 기록 작성이 거의 완료되었습니다!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            "제출" 버튼을 눌러 독서 기록을 저장해주세요.
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
};

export default BookStep5;
