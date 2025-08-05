"use client";

import { useMemo } from "react";

import { Stack } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";

import BookStep1 from "@/components/review/step1-form";
import BookStep2 from "@/components/review/step2-form";
import BookStep3 from "@/components/review/step3-form";
import { LinearStepper } from "@/components/review/stepper";
import { type InferredBookReviewSchema } from "@/schema/review-schema";
import { useFunnel } from "@/shared/components/form/funnel";
import BookStep4 from "./step4-form";
import BookStep5 from "./step5-form";

const STEPS = ["기본정보", "평가", "독후감", "인용구", "공개 여부"] as const;

const ReviewFunnel = () => {
  const { trigger, control } = useFormContext<InferredBookReviewSchema>();

  const 별점 = useWatch({
    control,
    name: "rating",
  });

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
        기본정보: [
          "title",
          "status",
          "publishDate",
          "startDate",
          "endDate",
          "selectedBook",
        ],
        평가: ["rating"],
        독후감: 독후감필수 ? ["review"] : [],
        인용구: ["quotes"],
        "공개 여부": ["isPublic"],
      }),
      [독후감필수]
    );

  const handleNextStep = (stepName: string) => () => {
    const fieldsToValidate = validateFields[stepName] || [];
    return createValidatedNextHandler(fieldsToValidate, trigger)();
  };

  const handleSubmit = async () => {
    const isValid = await trigger();
    if (isValid) {
      // 폼 제출 로직
      console.log("폼 제출!");
    }
  };

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
            <Funnel.Next onClick={handleNextStep("기본정보")} />
          </Funnel.Navigation>
        </Funnel.Step>

        <Funnel.Step name="평가">
          <BookStep2 />

          <Funnel.Navigation>
            <Funnel.Prev onClick={goPrevStep} />
            <Funnel.Next onClick={handleNextStep("평가")} />
          </Funnel.Navigation>
        </Funnel.Step>

        <Funnel.Step name="독후감">
          <BookStep3 />

          <Funnel.Navigation>
            <Funnel.Prev onClick={goPrevStep} />

            {!독후감필수 && <Funnel.Skip onClick={goNextStep} />}
            <Funnel.Next onClick={handleNextStep("독후감")} />
          </Funnel.Navigation>
        </Funnel.Step>

        <Funnel.Step name="인용구">
          <BookStep4 />
          <Funnel.Navigation>
            <Funnel.Prev onClick={goPrevStep} />
            <Funnel.Next onClick={handleNextStep("인용구")} />
          </Funnel.Navigation>
        </Funnel.Step>

        <Funnel.Step name="공개 여부">
          <BookStep5 />
          <Funnel.Navigation>
            <Funnel.Prev onClick={goPrevStep} />
            <Funnel.Next onClick={handleSubmit} label="제출" />
          </Funnel.Navigation>
        </Funnel.Step>
      </Funnel>
    </Stack>
  );
};

export default ReviewFunnel;
