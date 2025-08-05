"use client";

import BookLayout from "@/shared/layout/layout";

import { BookReviewSchema } from "@/schema/review-schema";
import FormProvider from "@/shared/components/form/form-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { READ_STATUS } from "@/config/read-status";
import { Funnel } from "@/shared/components/form/funnel";
import ReviewFunnel from "./review-funnel";

const STEPS = ["기본정보", "평가", "독후감", "인용구", "공개 여부"] as const;

const ReviewPage = () => {
  const methods = useForm({
    resolver: zodResolver(BookReviewSchema),
    defaultValues: {
      selectedBook: undefined,
      status: READ_STATUS.TODO.value,
      startDate: null,
      endDate: null,
      rating: 0.5,
      isRecommended: false,
      review: "",
      quotes: [{ text: "", page: null }],
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
        <Funnel.Provider steps={STEPS} initialStep="기본정보">
          <ReviewFunnel />
        </Funnel.Provider>
      </FormProvider>
    </BookLayout>
  );
};

export default ReviewPage;
