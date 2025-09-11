import { z } from "zod";

const selectedBookSchema = z.object({
  id: z.number(),
  title: z.string({ message: "도서 제목을 입력해주세요." }),
  author: z.string({ message: "저자명을 입력해주세요." }),
  publisher: z.string({ message: "출판사명을 입력해주세요." }),
  publishedAt: z.string({ message: "출판일을 입력해주세요." }),
  totalPages: z.number({ message: "전체 페이지 수를 입력해주세요." }),
});

const quoteSchema = z.object({
  text: z.string({ message: "인용구 내용을 입력해주세요." }),
  page: z
    .number()
    .min(1, "페이지 번호는 1 이상이어야 합니다.")
    .nullable()
    .optional(),
});

export const BookReviewSchema = z
  .object({
    selectedBook: selectedBookSchema,

    status: z.enum(["TODO", "PROGRESS", "DONE", "HOLD"], {
      message: "독서 상태를 선택해주세요.",
    }),

    startDate: z.coerce.date().nullable().optional(),
    endDate: z.coerce.date().nullable().optional(),

    rating: z
      .number()
      .min(0.5, "별점은 0.5 이상이어야 합니다.")
      .max(5, "별점은 0~5 사이여야 합니다."),
    isRecommended: z.boolean().optional().default(false),
    review: z.string().min(100, "최소 100자 이상 작성해주세요.").optional(),

    quotes: z.array(quoteSchema).min(1, "최소 1개의 인용구를 입력해주세요."),

    isPublic: z.boolean(),
  })
  .superRefine((data, ctx) => {
    const { selectedBook, status, startDate, endDate, rating, review, quotes } =
      data;

    const publishDate = new Date(selectedBook.publishedAt);
    const totalPages = selectedBook.totalPages;

    // 시작일 조건
    if (["PROGRESS", "DONE", "HOLD"].includes(status)) {
      if (!startDate) {
        ctx.addIssue({
          path: ["startDate"],
          message: "독서 시작일을 입력해주세요.",
          code: z.ZodIssueCode.custom,
        });
      } else if (startDate < publishDate) {
        ctx.addIssue({
          path: ["startDate"],
          message: "출판일 이후로 시작일을 설정해주세요.",
          code: z.ZodIssueCode.custom,
        });
      }
    }

    // 종료일 조건
    if (status === "DONE" && !endDate) {
      ctx.addIssue({
        path: ["endDate"],
        message: "독서 종료일을 입력해주세요.",
        code: z.ZodIssueCode.custom,
      });
    }

    if (startDate && endDate && endDate < startDate) {
      ctx.addIssue({
        path: ["endDate"],
        message: "종료일은 시작일 이후여야 합니다.",
        code: z.ZodIssueCode.custom,
      });
    }

    // 별점 후기 조건
    if ((rating === 1 || rating === 5) && (!review || review.length < 100)) {
      ctx.addIssue({
        path: ["review"],
        message: "별점 1점 또는 5점에는 후기를 100자 이상 작성해주세요.",
        code: z.ZodIssueCode.custom,
      });
    }

    // 인용구 페이지 조건
    quotes.forEach((quote, i) => {
      if (quotes.length >= 2 && !quote.page) {
        ctx.addIssue({
          path: ["quotes", i, "page"],
          message: "인용구가 2개 이상일 때는 페이지 번호가 필수입니다.",
          code: z.ZodIssueCode.custom,
        });
      }

      if (quote.page && quote.page > totalPages) {
        ctx.addIssue({
          path: ["quotes", i, "page"],
          message: "전체 페이지 수를 넘을 수 없습니다.",
          code: z.ZodIssueCode.custom,
        });
      }
    });
  });

export type BookReviewFormValues = z.infer<typeof BookReviewSchema>;
