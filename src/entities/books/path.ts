import type { BookSummary } from "@/types/book";

export const API = {
  root: "books",
  /**
   * 책 조회/생성 API
   * @method GET
   * @method POST
   */
  list: () => API.root,
  /**
   * 책 상세 조회/수정/삭제 API
   * @method GET
   * @method PUT
   * @method DELETE
   * @param id
   */
  detail: (id: BookSummary["id"]) => `${API.root}/${id}`,
};
