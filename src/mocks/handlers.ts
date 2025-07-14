import type { BookDetail } from "@/types/book";
import { http, HttpResponse } from "msw";
import { mockBookDetails, mockBooks } from "./data";

export const handlers = [
  // 책 목록 조회
  http.get("/api/books", () => {
    return HttpResponse.json({
      data: mockBooks,
    });
  }),

  // 책 상세 조회
  http.get("/api/books/:id", ({ params }) => {
    const id = Number(params.id);
    const book = mockBookDetails.find((book) => book.id === id);

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

  // 책 생성
  http.post("/api/books", async ({ request }) => {
    const body = (await request.json()) as Omit<
      BookDetail,
      "id" | "createdAt" | "updatedAt"
    >;

    const newBook: BookDetail = {
      ...body,
      id: mockBookDetails.length + 1,
      createdAt: new Date().toLocaleDateString("ko-KR"),
      updatedAt: new Date().toLocaleDateString("ko-KR"),
    };

    mockBookDetails.push(newBook);
    mockBooks.push({
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
