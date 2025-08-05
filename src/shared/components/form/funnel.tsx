import { Button, Stack } from "@mui/material";
import {
  Children,
  ReactNode,
  isValidElement,
  useCallback,
  useMemo,
  useState,
} from "react";

export interface FunnelProps<T extends readonly string[]> {
  step: T[number];
  children: ReactNode;
}

const Funnel = <T extends readonly string[]>({
  step,
  children,
}: FunnelProps<T>) => {
  const validElement = Children.toArray(children).filter(isValidElement);
  const targetElement = validElement.find(
    (child) => (child.props as StepProps<T>)?.name === step
  );

  if (!targetElement) {
    return null;
  }

  return <>{targetElement}</>;
};

export interface StepProps<T extends readonly string[]> {
  name: T[number];
  children?: ReactNode;
}

const Step = <T extends readonly string[]>({ children }: StepProps<T>) => {
  return <>{children}</>;
};

export interface NavigationProps {
  children?: ReactNode;
  justifyContent?: "space-between" | "flex-start" | "flex-end" | "center";
  spacing?: number;
}

const Navigation = ({
  children,
  justifyContent = "space-between",
  spacing = 2,
}: NavigationProps) => {
  return (
    <Stack
      direction="row"
      justifyContent={justifyContent}
      spacing={spacing}
      sx={{ mt: 4 }}
    >
      {children}
    </Stack>
  );
};

export interface ButtonProps {
  onClick?: () => void | Promise<void>;
  disabled?: boolean;
  label?: string;
  variant?: "contained" | "outlined" | "text";
}

const Prev = ({
  onClick,
  disabled,
  label = "이전",
  variant = "outlined",
}: ButtonProps) => {
  const handleClick = async () => {
    if (onClick) {
      await onClick();
    }
  };

  return (
    <Button variant={variant} onClick={handleClick} disabled={disabled}>
      {label}
    </Button>
  );
};

const Next = ({
  onClick,
  disabled,
  label = "다음",
  variant = "contained",
}: ButtonProps) => {
  const handleClick = async () => {
    if (onClick) {
      await onClick();
    }
  };

  return (
    <Button variant={variant} onClick={handleClick} disabled={disabled}>
      {label}
    </Button>
  );
};

const Skip = ({
  onClick,
  disabled,
  label = "건너뛰기",
  variant = "outlined",
}: ButtonProps) => {
  const handleClick = async () => {
    if (onClick) {
      await onClick();
    }
  };

  return (
    <Button
      variant={variant}
      onClick={handleClick}
      disabled={disabled}
      color="secondary"
    >
      {label}
    </Button>
  );
};

const Submit = ({
  onClick,
  disabled,
  label = "완료",
  variant = "contained",
}: ButtonProps) => {
  const handleClick = async () => {
    if (onClick) {
      await onClick();
    }
  };

  return (
    <Button
      variant={variant}
      onClick={handleClick}
      disabled={disabled}
      color="primary"
    >
      {label}
    </Button>
  );
};

export const useFunnel = <T extends readonly string[]>(
  steps: T,
  defaultStep?: T[number]
) => {
  const [step, setStep] = useState<T[number]>(defaultStep ?? steps[0]);

  const goNextStep = useCallback(() => {
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  }, [step, steps]);

  const goPrevStep = useCallback(() => {
    const currentIndex = steps.indexOf(step);
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  }, [step, steps]);

  const getCurrentStepIndex = useCallback(() => {
    return steps.indexOf(step);
  }, [step, steps]);

  const getValidSteps = useCallback(() => {
    return steps;
  }, [steps]);

  const isFirstStep = useCallback(() => {
    return steps[0] === step;
  }, [step, steps]);

  const isLastStep = useCallback(() => {
    return steps[steps.length - 1] === step;
  }, [step, steps]);

  /** 스텝별 검증과 함께 다음 단계로 이동하는 헬퍼 */
  const createValidatedNextHandler = useCallback(
    (validationFields?: any[], trigger?: any) => {
      return async () => {
        if (validationFields && trigger) {
          const isValid = await trigger(validationFields);
          if (!isValid) return;
        }
        goNextStep();
      };
    },
    [goNextStep]
  );

  const FunnelElement = useMemo(
    () =>
      Object.assign(
        (props: Omit<FunnelProps<T>, "step">) => {
          return <Funnel step={step} {...props} />;
        },
        {
          Step: (props: StepProps<T>) => <Step<T> {...props} />,
          Navigation: (props: NavigationProps) => <Navigation {...props} />,
          Prev: (props: ButtonProps) => <Prev {...props} />,
          Next: (props: ButtonProps) => <Next {...props} />,
          Skip: (props: ButtonProps) => <Skip {...props} />,
          Submit: (props: ButtonProps) => <Submit {...props} />,
        }
      ),
    [step]
  );

  return {
    FunnelElement,
    goNextStep,
    goPrevStep,
    getCurrentStepIndex,
    getValidSteps,
    isFirstStep,
    isLastStep,
    createValidatedNextHandler,
  };
};

export default Funnel;
