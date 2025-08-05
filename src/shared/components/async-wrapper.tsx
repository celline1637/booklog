import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import { memo, ReactNode, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

// 기본 로딩 컴포넌트
export const DefaultLoadingFallback = memo(function DefaultLoadingFallback() {
  return (
    <Box display="flex" alignItems="center" gap={2} p={2}>
      <CircularProgress size={20} />
      <Typography variant="body2" color="text.secondary">
        로딩 중...
      </Typography>
    </Box>
  );
});

// 기본 에러 컴포넌트
export const DefaultErrorFallback = memo(function DefaultErrorFallback({
  error,
}: {
  error: Error;
}) {
  return (
    <Alert severity="error" sx={{ my: 2 }}>
      <Typography variant="body2">일시적인 오류가 발생했습니다.</Typography>
      <Typography variant="caption" color="text.secondary">
        {error.message}
      </Typography>
    </Alert>
  );
});

// AsyncWrapper 컴포넌트 타입 정의
interface AsyncWrapperProps {
  children: ReactNode;
  loadingFallback?: ReactNode;
  errorFallback?: (error: Error) => ReactNode;
  loadingText?: string;
  errorTitle?: string;
}

/**
 * ErrorBoundary + Suspense를 조합한 비동기 처리 래퍼 컴포넌트
 *
 * @param children - 래핑할 자식 컴포넌트
 * @param loadingFallback - 로딩 중 표시할 컴포넌트 (기본: 스피너 + "로딩 중...")
 * @param errorFallback - 에러 발생 시 표시할 컴포넌트 (기본: Alert + 에러 메시지)
 * @param loadingText - 로딩 텍스트 커스터마이징
 * @param errorTitle - 에러 제목 커스터마이징
 */
export const AsyncWrapper = memo(function AsyncWrapper({
  children,
  loadingFallback,
  errorFallback,
  loadingText = "로딩 중...",
  errorTitle = "일시적인 오류가 발생했습니다.",
}: AsyncWrapperProps) {
  // 커스텀 로딩 컴포넌트 또는 기본 컴포넌트
  const LoadingComponent = loadingFallback || (
    <Box display="flex" alignItems="center" gap={2} p={2}>
      <CircularProgress size={20} />
      <Typography variant="body2" color="text.secondary">
        {loadingText}
      </Typography>
    </Box>
  );

  // 커스텀 에러 컴포넌트 또는 기본 컴포넌트
  const ErrorComponent =
    errorFallback ||
    ((error: Error) => (
      <Alert severity="error" sx={{ my: 2 }}>
        <Typography variant="body2">{errorTitle}</Typography>
        <Typography variant="caption" color="text.secondary">
          {error.message}
        </Typography>
      </Alert>
    ));

  return (
    <ErrorBoundary fallbackRender={({ error }) => ErrorComponent(error)}>
      <Suspense fallback={LoadingComponent}>{children}</Suspense>
    </ErrorBoundary>
  );
});
