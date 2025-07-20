import { typedKeys } from "@/shared/utils/type";
import * as yup from "yup";
import { READ_STATUS } from "../config/read-status";

export const bookReviewSchema = yup.object({
  // 선택된 도서 정보
  selectedBook: yup
    .object({
      id: yup.number().required(),
      title: yup.string().required(),
      author: yup.string().required(),
      publisher: yup.string().required(),
      publishedAt: yup.string().required(),
      totalPages: yup.number().required(),
    })
    .required("도서를 선택해주세요."),

  title: yup.string().required("도서 제목을 입력해주세요."),
  author: yup.string().required("저자를 입력해주세요."),
  publishDate: yup.date().required("출판일을 입력해주세요."),

  status: yup
    .string()
    .oneOf(typedKeys(READ_STATUS))
    .required("독서 상태를 선택해주세요."),

  startDate: yup
    .date()
    .nullable()
    .min(yup.ref("publishDate"), "출판일 이후로 시작일을 설정해주세요.")
    .when("status", {
      is: (val: keyof typeof READ_STATUS) =>
        val === READ_STATUS.PROGRESS.value ||
        val === READ_STATUS.DONE.value ||
        val === READ_STATUS.HOLD.value,
      then: (schema) => schema.required("독서 시작일을 입력해주세요."),
      otherwise: (schema) => schema.notRequired().nullable(),
    }),

  endDate: yup
    .date()
    .nullable()
    .when("status", {
      is: READ_STATUS.DONE.value,
      then: (schema) =>
        schema
          .required("독서 종료일을 입력해주세요.")
          .min(yup.ref("startDate"), "종료일은 시작일 이후여야 합니다."),
      otherwise: (schema) => schema.notRequired().nullable(),
    }),

  totalPageCount: yup
    .number()
    .min(1)
    .required("전체 페이지 수를 입력해주세요."),

  rating: yup.number().min(0.5).max(5).required("별점을 입력해주세요."),

  isRecommended: yup.boolean().optional().default(false),

  review: yup.string().when("rating", {
    is: (val: number) => val <= 1 || val === 5,
    then: (schema) =>
      schema
        .required("별점 1점 또는 5점에는 후기를 입력해야 합니다.")
        .min(100, "최소 100자 이상 작성해주세요."),
    otherwise: (schema) => schema.notRequired(),
  }),

  quotes: yup
    .array()
    .of(
      yup.object({
        text: yup.string().required("인용구 내용을 입력해주세요."),
        page: yup
          .number()
          .min(1)
          .required("페이지 번호를 입력해주세요.")
          .test(
            "max-page",
            "전체 페이지 수를 넘을 수 없습니다.",
            function (value) {
              const { totalPageCount } = this.options.context || {};
              return !totalPageCount || (value ?? 0) <= totalPageCount;
            }
          ),
      })
    )
    .required(),

  isPublic: yup.boolean().required(),
});

export type InferredBookReviewSchema = yup.InferType<typeof bookReviewSchema>;
