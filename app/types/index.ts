export interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export interface Step1Props {
  onNext: () => void;
}

export interface Step2Props {
  onNext: () => void;
  onBack: () => void;
}

export interface Step3Props {
  onSubmit: () => void;
  onBack: () => void;
}
