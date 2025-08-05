// src/types/book.ts
export type BookSummary = {
  id: number;
  emoji: string;
  title: string;
  createdAt: string;
};

export interface BookDetail extends BookSummary {
  author: string;
  publisher: string;
  publishedAt: string;
  updatedAt: string;
  review: string;
  rating: number;
  tags: string[];
}

export interface Book {
  id: number;
  title: string;
  author: string;
  publisher: string;
  publishedAt: string;
  totalPages: number;
}

export type CreateBookRequest = Omit<
  BookDetail,
  "id" | "createdAt" | "updatedAt"
>;
export type UpdateBookRequest = Partial<CreateBookRequest>;
