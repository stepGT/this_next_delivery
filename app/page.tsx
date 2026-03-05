'use client';

import { useState } from 'react';
import ProgressBar from './components/ProgressBar';
import { useRouter } from 'next/navigation';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';

export default function Home() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep((num) => Math.min(num + 1, 3));
  };

  const handleSubmit = () => {
    router.push('/orders');
  };

  const handleBack = () => {
    setCurrentStep((num) => Math.max(num - 1, 1));
  };

  return (
    <div className="">
      <ProgressBar currentStep={currentStep} totalSteps={3} />
      {currentStep === 1 && <Step1 onNext={handleNext} />}
      {currentStep === 2 && <Step2 onNext={handleNext} onBack={handleBack} />}
      {currentStep === 3 && <Step3 onSubmit={handleSubmit} onBack={handleBack} />}
    </div>
  );
}
