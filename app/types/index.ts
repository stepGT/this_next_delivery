export interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export interface Step1Props {
  onNext: () => void;
  formData: OrderFormData;
  updateFormData: (data: Partial<OrderFormData>) => void;
}

export interface Step2Props {
  onNext: () => void;
  onBack: () => void;
}

export interface Step3Props {
  onSubmit: () => void;
  onBack: () => void;
}

export interface OrderFormData {
  senderName: string;
  senderPhone: string;
  senderCity: string;
}

export type CargoType = 'documents' | 'fragile' | 'regular';
