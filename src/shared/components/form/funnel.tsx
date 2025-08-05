import { Button, Stack } from "@mui/material";
import {
  Children,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

// --------------------------------------------
// Context & Provider
// --------------------------------------------
type FunnelContextType<T extends readonly string[]> = {
  steps: T;
  step: T[number];
  setStep: (step: T[number]) => void;
  goNextStep: () => void;
  goPrevStep: () => void;
};

const FunnelContext = createContext<FunnelContextType<any> | null>(null);

export function useFunnelContext<T extends readonly string[]>() {
  const ctx = useContext(FunnelContext);
  if (!ctx)
    throw new Error("useFunnelContext must be used within FunnelProvider");
  return ctx as FunnelContextType<T>;
}

const FunnelProvider = <T extends readonly string[]>({
  steps,
  initialStep,
  children,
}: {
  steps: T;
  initialStep?: T[number];
  children: ReactNode;
}) => {
  const [step, setStep] = useState<T[number]>(initialStep ?? steps[0]);

  const goNextStep = useCallback(() => {
    const currentIdx = steps.indexOf(step);
    if (currentIdx < steps.length - 1) setStep(steps[currentIdx + 1]);
  }, [step, steps]);

  const goPrevStep = useCallback(() => {
    const currentIdx = steps.indexOf(step);
    if (currentIdx > 0) setStep(steps[currentIdx - 1]);
  }, [step, steps]);

  const value = useMemo(
    () => ({ step, steps, setStep, goNextStep, goPrevStep }),
    [step, steps, goNextStep, goPrevStep]
  );

  return (
    <FunnelContext.Provider value={value}>{children}</FunnelContext.Provider>
  );
};

// --------------------------------------------
// Funnel / Step / Navigation
// --------------------------------------------
const Funnel = ({ children }: { children: ReactNode }) => {
  const { step } = useFunnelContext();
  const validChildren = Children.toArray(children).filter(isValidElement);

  const matched = validChildren.find(
    (child) => (child.props as any).name === step
  );

  return <>{matched}</>;
};

const Step = <T extends readonly string[]>({
  children,
}: {
  name: T[number];
  children: ReactNode;
}) => {
  return <>{children}</>;
};

const Navigation = ({
  children,
  justifyContent = "space-between",
  spacing = 2,
}: {
  children?: ReactNode;
  justifyContent?: "space-between" | "flex-start" | "flex-end" | "center";
  spacing?: number;
}) => {
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

// --------------------------------------------
// Buttons
// --------------------------------------------
interface FunnelButtonProps {
  onClick?: () => void | Promise<void>;
  disabled?: boolean;
  label?: string;
}

const Prev = ({ onClick, disabled, label = "이전" }: FunnelButtonProps) => {
  const { goPrevStep, step, steps } = useFunnelContext();

  const handleClick = async () => {
    if (onClick) await onClick();
    else goPrevStep();
  };

  return (
    <Button
      variant="outlined"
      onClick={handleClick}
      disabled={disabled ?? step === steps[0]}
    >
      {label}
    </Button>
  );
};

const Next = ({ onClick, disabled, label = "다음" }: FunnelButtonProps) => {
  const { goNextStep } = useFunnelContext();

  const handleClick = async () => {
    if (onClick) await onClick();
    else goNextStep();
  };

  return (
    <Button variant="contained" onClick={handleClick} disabled={disabled}>
      {label}
    </Button>
  );
};

const Skip = ({ onClick, disabled, label = "건너뛰기" }: FunnelButtonProps) => {
  const { goNextStep } = useFunnelContext();

  const handleClick = async () => {
    if (onClick) await onClick();
    else goNextStep();
  };

  return (
    <Button
      variant="outlined"
      color="secondary"
      onClick={handleClick}
      disabled={disabled}
    >
      {label}
    </Button>
  );
};

const Submit = ({ onClick, disabled, label = "제출" }: FunnelButtonProps) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      disabled={disabled}
      type="submit"
    >
      {label}
    </Button>
  );
};

const FunnelComponent = Object.assign(Funnel, {
  Provider: FunnelProvider,
  Step,
  Navigation,
  Prev,
  Next,
  Skip,
  Submit,
});

export { FunnelComponent as Funnel };
