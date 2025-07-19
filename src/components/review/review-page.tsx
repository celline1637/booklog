"use client";

import BookLayout from "@/shared/layout/layout";

import { bookReviewSchema } from "@/schema/review-schema";
import FormProvider from "@/shared/components/form/form-provider";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { READ_STATUS } from "@/config/read-status";
import ReviewForm from "./review-form";

const ReviewPage = () => {
  const methods = useForm({
    resolver: yupResolver(bookReviewSchema),
    defaultValues: {
      title: "",
      status: READ_STATUS.TODO.value,
      startDate: null,
      endDate: null,
      totalPageCount: 0,
      rating: 0,
      review: "",
      quotes: [],
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
        <ReviewForm />
      </FormProvider>
    </BookLayout>
  );
};

export default ReviewPage;
