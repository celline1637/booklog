"use client";

import BookLayout from "@/shared/layout/layout";

import { bookReviewSchema } from "@/schema/review-schema";
import FormProvider from "@/shared/components/form/form-provider";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { READ_STATUS } from "@/config/read-status";
import ReviewFunnel from "./review-funnel";

const ReviewPage = () => {
  const methods = useForm({
    resolver: yupResolver(bookReviewSchema),
    defaultValues: {
      selectedBook: undefined,
      title: "",
      author: "",
      publishDate: undefined,
      totalPageCount: 0,
      status: READ_STATUS.TODO.value,
      startDate: null,
      endDate: null,
      rating: 0,
      isRecommended: false,
      review: "",
      quotes: [],
      isPublic: false,
    },
  });

  const { reset, handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();

      console.info("DATA", data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <BookLayout>
      <BookLayout.Header
        title="독서기록장을 남겨보아요"
        desc="좋았던 책, 남기고 싶은 문장들을 모아보세요."
      />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <ReviewFunnel />
      </FormProvider>
    </BookLayout>
  );
};

export default ReviewPage;
