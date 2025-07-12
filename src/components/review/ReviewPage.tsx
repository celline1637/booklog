"use client";

import BookLayout from "@/shared/layout/layout";
import BookStep1 from "./Step1";

import { bookReviewSchema } from "@/schema/review-schema";
import FormProvider from "@/shared/components/form/form-provider";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { LinearStepper } from "./stepper";

import { READ_STATUS } from "@/config/read-status";
import { useFunnel } from "@/shared/components/form/funnel";
import { Box, Button, Stack } from "@mui/material";

const STEPS = ["책 정보", "별점", "독후감", "인용구", "공개 여부"];

const ReviewPage = () => {
  const {
    FunnelElement: Funnel,
    step,
    goPrevStep,
    goNextStep,
  } = useFunnel(STEPS, STEPS[0]);

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

  const { reset, handleSubmit, trigger } = methods;

  const isCurrentStepValid = async (stepIndex: number) => {
    if (stepIndex === 0) {
      const isValid = await trigger([
        "title",
        "status",
        "publishDate",
        "startDate",
        "endDate",
      ]);

      return isValid;
    }
    return false;
  };

  const handleNextStep = async () => {
    const isValid = await isCurrentStepValid(STEPS.indexOf(step));
    if (!isValid) {
      console.warn("Step is not valid, cannot proceed to next step.");
      return;
    }

    goNextStep();
  };

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
        <Stack spacing={4} sx={{ mb: 2 }}>
          <LinearStepper activeStep={STEPS.indexOf(step)} steps={STEPS} />

          <Funnel>
            <Funnel.Step name="책 정보">
              <BookStep1 />
            </Funnel.Step>
          </Funnel>

          <Stack direction="row">
            <Button
              color="inherit"
              disabled={step === "책 정보"}
              onClick={goPrevStep}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flexGrow: 1 }} />

            <Button variant="contained" onClick={handleNextStep}>
              {step === STEPS[STEPS.length - 1] ? "Finish" : "Next"}
            </Button>
          </Stack>
        </Stack>
      </FormProvider>
    </BookLayout>
  );
};

export default ReviewPage;
