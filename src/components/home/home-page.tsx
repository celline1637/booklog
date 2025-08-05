"use client";

import BookLayout from "@/shared/layout/layout";
import { useRouter } from "@/shared/routes/hooks";
import { Button } from "@mui/material";
import { Suspense } from "react";
import BookList from "./book-list";

export default function HomeView() {
  const router = useRouter();

  const handleCreateNew = () => {
    router.push("/review/new");
  };

  return (
    <BookLayout>
      <BookLayout.Header
        title="독서기록장을 남겨보아요"
        desc="좋았던 책, 남기고 싶은 문장들을 모아보세요."
      >
        <Button variant={"soft"} onClick={handleCreateNew}>
          + 새로 만들기
        </Button>
      </BookLayout.Header>

      <Suspense fallback={<div>로딩 중...</div>}>
        <BookList />
      </Suspense>
    </BookLayout>
  );
}
