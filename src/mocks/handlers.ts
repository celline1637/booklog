import type { BookDetail } from "@/types/book";
import { http, HttpResponse } from "msw";
import { mockBooks, mockReviews, mockReviewsDetails } from "./data";

export const handlers = [
  // 도서 목록 조회
  http.get("/api/books", () => {
    return HttpResponse.json({
      data: mockBooks,
    });
  }),

  // 리뷰 목록 조회
  http.get("/api/reviews", () => {
    return HttpResponse.json({
      data: mockReviews,
    });
  }),

  // 리뷰 상세 조회
  http.get("/api/reviews/:id", ({ params }) => {
    const id = Number(params.id);
    const book = mockReviewsDetails.find((book) => book.id === id);

    if (!book) {
      return HttpResponse.json(
        { message: "책을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      data: book,
    });
  }),

  // 리뷰 생성
  http.post("/api/reviews", async ({ request }) => {
    const body = (await request.json()) as Omit<
      BookDetail,
      "id" | "createdAt" | "updatedAt"
    >;

    const newBook: BookDetail = {
      ...body,
      id: mockReviewsDetails.length + 1,
      createdAt: new Date().toLocaleDateString("ko-KR"),
      updatedAt: new Date().toLocaleDateString("ko-KR"),
    };

    mockReviewsDetails.push(newBook);
    mockReviews.push({
      id: newBook.id,
      emoji: newBook.emoji,
      title: newBook.title,
      createdAt: newBook.createdAt,
    });

    return HttpResponse.json(
      {
        data: newBook,
      },
      { status: 201 }
    );
  }),
];
