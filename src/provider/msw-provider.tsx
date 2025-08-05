"use client";

import { useEffect, useState } from "react";

interface MSWProviderProps {
  children: React.ReactNode;
}

export function MSWProvider({ children }: MSWProviderProps) {
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (
        typeof window !== "undefined" &&
        process.env.NODE_ENV === "development" &&
        process.env.NEXT_PUBLIC_MSW_ENABLED === "true"
      ) {
        try {
          const { initMocks } = await import("@/mocks");
          await initMocks();
          console.log("[MSW] Mocking enabled.");
        } catch (error) {
          console.error("MSW 초기화 실패:", error);
        }
      }
      setMswReady(true);
    };

    init();
  }, []);

  // MSW가 준비되지 않은 경우 로딩 표시 (개발 환경에서만)
  if (
    !mswReady &&
    process.env.NODE_ENV === "development" &&
    process.env.NEXT_PUBLIC_MSW_ENABLED === "true"
  ) {
    return <div>MSW 초기화 중...</div>;
  }

  return <>{children}</>;
}
