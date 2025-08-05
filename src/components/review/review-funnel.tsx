"use client";

import { useMemo } from "react";

import { Stack } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";

import BookStep1 from "@/components/review/step1-form";
import BookStep2 from "@/components/review/step2-form";
import BookStep3 from "@/components/review/step3-form";
import { LinearStepper } from "@/components/review/stepper";
import { type BookReviewFormValues } from "@/schema/review-schema";
import { Funnel, useFunnelContext } from "@/shared/components/form/funnel";
import ReviewStep from "./review-step";
import BookStep4 from "./step4-form";
import BookStep5 from "./step5-form";

const ReviewFunnel = () => {
  const { steps, step, goNextStep } = useFunnelContext();
  const currentStepIndex = steps.indexOf(step);

  const { trigger } = useFormContext<BookReviewFormValues>();

  const 별점 = useWatch({
    name: "rating",
  });

  const 독후감필수 = 별점 <= 1 || 별점 === 5;

  const stepsMapper = useMemo(
    () => [
      { name: "기본정보", Component: BookStep1 },
      { name: "평가", Component: BookStep2 },
      { name: "독후감", Component: BookStep3, showSkip: !독후감필수 },
      { name: "인용구", Component: BookStep4 },
      { name: "공개 여부", Component: BookStep5, isFinal: true },
    ],
    [독후감필수]
  );

  const requiredFieldsByStep: Record<string, (keyof BookReviewFormValues)[]> =
    useMemo(
      () => ({
        기본정보: ["selectedBook", "status", "startDate", "endDate"],
        평가: ["rating"],
        독후감: 독후감필수 ? ["review"] : [],
        인용구: ["quotes"],
        "공개 여부": ["isPublic"],
      }),
      [독후감필수]
    );

  const handleNextStep = (stepName: string) => async () => {
    const fieldsToValidate = requiredFieldsByStep[stepName] || [];

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      goNextStep();
    }
  };

  return (
    <Stack spacing={4}>
      {/* 진행 상태 표시 */}
      <LinearStepper steps={steps} activeStep={currentStepIndex} />

      {/* 폼 단계별 컨텐츠 */}
      <Funnel>
        {stepsMapper.map((step) => (
          <ReviewStep
            key={step.name}
            name={step.name}
            Component={step.Component}
            showSkip={step.showSkip}
            isFinal={step.isFinal}
            handleNextStep={handleNextStep}
          />
        ))}
      </Funnel>
    </Stack>
  );
};

export default ReviewFunnel;
