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
  formData: OrderFormData;
  updateFormData: (data: Partial<OrderFormData>) => void;
  onBack: () => void;
}

export interface Step3Props {
  onSubmit: () => void;
  formData: OrderFormData;
  updateFormData: (data: Partial<OrderFormData>) => void;
  onBack: () => void;
}

export interface OrderFormData {
  senderName: string;
  senderPhone: string;
  senderCity: string;
  receiverName: string;
  receiverCity: string;
  cargoType: CargoType;
  weight: number | '';
  agreedToTerms: boolean;
}

export interface Order {
  id: string;
  senderName: string;
  senderPhone: string;
  senderCity: string;
  receiverName: string;
  receiverCity: string;
  cargoType: CargoType;
  weight: number;
  createdAt: string;
  status: OrderStatus;
}

export type CargoType = 'documents' | 'fragile' | 'regular';

export type OrderStatus = 'pending' | 'confirmed' | 'delivered';
