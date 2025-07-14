import type { BookDetail, BookSummary } from "@/types/book";

export const mockBooks: BookSummary[] = [
  {
    id: 1,
    emoji: "📘",
    title: "리액트 완벽 가이드",
    createdAt: "2025. 7. 10.",
  },
  {
    id: 2,
    emoji: "🌟",
    title: "AI로 바뀌는 세상",
    createdAt: "2025. 6. 30.",
  },
  {
    id: 3,
    emoji: "📝",
    title: "프론트엔드 개발자의 회고록",
    createdAt: "2025. 6. 18.",
  },
];

export const mockBookDetails: BookDetail[] = [
  {
    id: 1,
    emoji: "📘",
    title: "리액트 완벽 가이드",
    author: "김개발",
    publisher: "테크출판사",
    publishedAt: "2024. 12. 1.",
    createdAt: "2025. 7. 10.",
    updatedAt: "2025. 7. 10.",
    review:
      "리액트의 기본부터 고급 패턴까지 자세히 설명되어 있어서 정말 도움이 되었습니다. 특히 훅의 사용법과 상태 관리 부분이 인상적이었어요.",
    rating: 5,
    tags: ["React", "프론트엔드", "자바스크립트"],
  },
  {
    id: 2,
    emoji: "🌟",
    title: "AI로 바뀌는 세상",
    author: "박미래",
    publisher: "미래출판사",
    publishedAt: "2024. 11. 15.",
    createdAt: "2025. 6. 30.",
    updatedAt: "2025. 6. 30.",
    review:
      "AI 기술의 현재와 미래에 대해 쉽게 설명해주는 책입니다. 비전공자도 이해하기 쉽게 작성되어 있어요.",
    rating: 4,
    tags: ["AI", "기술", "미래"],
  },
  {
    id: 3,
    emoji: "📝",
    title: "프론트엔드 개발자의 회고록",
    author: "이경험",
    publisher: "개발자출판사",
    publishedAt: "2024. 10. 20.",
    createdAt: "2025. 6. 18.",
    updatedAt: "2025. 6. 18.",
    review:
      "실무에서 겪는 다양한 상황들과 문제 해결 방법이 잘 정리되어 있습니다. 주니어 개발자에게 특히 추천합니다.",
    rating: 4,
    tags: ["프론트엔드", "개발", "회고"],
  },
];
