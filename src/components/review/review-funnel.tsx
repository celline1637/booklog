"use client";

import { useMemo } from "react";

import { Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";

import BookStep1 from "@/components/review/step1-form";
import BookStep2 from "@/components/review/step2-form";
import BookStep3 from "@/components/review/step3-form";
import { LinearStepper } from "@/components/review/stepper";
import { type InferredBookReviewSchema } from "@/schema/review-schema";
import { useFunnel } from "@/shared/components/form/funnel";

const STEPS = ["기본정보", "평가", "독후감", "인용구", "공개 여부"] as const;

const ReviewFunnel = () => {
  const { trigger, getValues } = useFormContext<InferredBookReviewSchema>();

  // 폼 값들을 감시
  const 별점 = getValues("rating");
  const 독후감필수 = 별점 <= 1 || 별점 === 5;

  const {
    FunnelElement: Funnel,
    goNextStep,
    goPrevStep,
    getCurrentStepIndex,
    isFirstStep,
    getValidSteps,
    createValidatedNextHandler,
  } = useFunnel(STEPS, "기본정보");

  const validateFields: Record<string, (keyof InferredBookReviewSchema)[]> =
    useMemo(
      () => ({
        기본정보: ["title", "status", "publishDate"],
        평가: ["rating"],
        독후감: 독후감필수 ? ["review"] : [],
      }),
      [독후감필수]
    );

  // 스텝 별 검증과 함께 다음 단계로 이동하는 핸들러들
  const handleNextStep1 = createValidatedNextHandler(
    validateFields.기본정보,
    trigger
  );
  const handleNextStep2 = createValidatedNextHandler(
    validateFields.평가,
    trigger
  );
  const handleNextStep3 = createValidatedNextHandler(
    validateFields.독후감,
    trigger
  );

  const handleSubmit = async () => {
    const isValid = await trigger();
    if (isValid) {
      // 폼 제출 로직
      console.log("폼 제출!");
    }
  };

  // 현재 스텝이 독후감이고 필수가 아닌 경우
  const isReviewStepOptional = getCurrentStepIndex() === 2 && !독후감필수;

  return (
    <Stack spacing={4}>
      {/* 진행 상태 표시 */}
      <LinearStepper
        steps={getValidSteps()}
        activeStep={getCurrentStepIndex()}
      />

      {/* 폼 단계별 컨텐츠 */}
      <Funnel>
        <Funnel.Step name="기본정보">
          <BookStep1 />

          <Funnel.Navigation>
            <Funnel.Prev onClick={goPrevStep} disabled={isFirstStep()} />
            <Funnel.Next onClick={handleNextStep1} />
          </Funnel.Navigation>
        </Funnel.Step>

        <Funnel.Step name="평가">
          <BookStep2 />

          <Funnel.Navigation>
            <Funnel.Prev onClick={goPrevStep} />
            <Funnel.Next onClick={handleNextStep2} />
          </Funnel.Navigation>
        </Funnel.Step>

        <Funnel.Step name="독후감">
          <BookStep3 />

          <Funnel.Navigation>
            <Funnel.Prev onClick={goPrevStep} />

            {isReviewStepOptional && <Funnel.Skip onClick={goNextStep} />}
            <Funnel.Next onClick={handleNextStep3} />
          </Funnel.Navigation>
        </Funnel.Step>
      </Funnel>
    </Stack>
  );
};

export default ReviewFunnel;
