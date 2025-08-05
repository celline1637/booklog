import { request } from "@/shared/lib/api";
import type { ApiResponse } from "@/shared/lib/api/type";
import type { Book } from "@/types/book";
import { API } from "./path";

export const booksApi = {
  // 책 목록 조회
  getBooks: async (): Promise<ApiResponse<Book[]>> => {
    const response = await request.get<ApiResponse<Book[]>>(API.list());
    return response.data;
  },
};
