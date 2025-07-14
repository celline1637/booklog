import { request } from "@/shared/lib/api";
import type { ApiResponse } from "@/shared/lib/api/type";
import type { BookDetail, BookSummary, CreateBookRequest } from "@/types/book";
import { API } from "./path";

export const booksApi = {
  // 책 목록 조회
  getBooks: async (): Promise<ApiResponse<BookSummary[]>> => {
    const response = await request.get<ApiResponse<BookSummary[]>>(API.list());
    return response.data;
  },

  // 책 생성
  createBook: async (
    book: CreateBookRequest
  ): Promise<ApiResponse<BookDetail>> => {
    const response = await request.post<ApiResponse<BookDetail>>(
      API.list(),
      book
    );
    return response.data;
  },
};
