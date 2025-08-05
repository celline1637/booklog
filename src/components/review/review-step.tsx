import { Funnel } from "@/shared/components/form/funnel";

interface ReviewStepProps {
  name: string;
  Component: React.ComponentType;
  showSkip?: boolean;
  isFinal?: boolean;
  handleNextStep: (stepName: string) => () => Promise<void>;
}

const ReviewStep = ({
  name,
  Component,
  showSkip,
  isFinal,
  handleNextStep,
}: ReviewStepProps) => {
  return (
    <Funnel.Step name={name}>
      <Component />
      <Funnel.Navigation>
        <Funnel.Prev />
        {showSkip && <Funnel.Skip />}
        {isFinal ? (
          <Funnel.Submit label="제출" />
        ) : (
          <Funnel.Next onClick={handleNextStep(name)} />
        )}
      </Funnel.Navigation>
    </Funnel.Step>
  );
};

export default ReviewStep;
