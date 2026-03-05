'use client';

import { useEffect, useState } from 'react';
import ProgressBar from './components/ProgressBar';
import { useRouter } from 'next/navigation';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import { OrderFormData } from './types';
import { saveOrder } from './utils/storage';
import { ORDER } from './constants';

const initialFormData: OrderFormData = {
  senderName: '',
  senderPhone: '',
  senderCity: '',
  receiverName: '',
  receiverCity: '',
  cargoType: 'regular',
  weight: '',
  agreedToTerms: false,
};

export default function Home() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OrderFormData>(initialFormData);

  const handleNext = () => {
    setCurrentStep((num) => Math.min(num + 1, 3));
  };

  const handleSubmit = () => {
    saveOrder(formData);
    localStorage.removeItem(ORDER);
    router.push('/orders');
  };

  const handleBack = () => {
    setCurrentStep((num) => Math.max(num - 1, 1));
  };

  const updateFormData = (data: Partial<OrderFormData>) => {
    const newData = { ...formData, ...data };
    setFormData(newData);
    localStorage.setItem(ORDER, JSON.stringify(newData));
  };

  useEffect(() => {
    const orders = localStorage.getItem(ORDER);
    if (orders) {
      try {
        setFormData(JSON.parse(orders));
      } catch (error) {
        console.error('Failed to load orders:', error);
      }
    }
  }, []);

  return (
    <div className="">
      <ProgressBar currentStep={currentStep} totalSteps={3} />
      {currentStep === 1 && (
        <Step1 formData={formData} updateFormData={updateFormData} onNext={handleNext} />
      )}
      {currentStep === 2 && (
        <Step2
          formData={formData}
          updateFormData={updateFormData}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {currentStep === 3 && (
        <Step3
          formData={formData}
          updateFormData={updateFormData}
          onSubmit={handleSubmit}
          onBack={handleBack}
        />
      )}
    </div>
  );
}
