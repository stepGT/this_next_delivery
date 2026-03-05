import React from 'react';
import { ProgressBarProps } from '../types';

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between mb-2">
        {['Отправитель', 'Получатель', 'Подтверждение'].map((step, index) => (
          <div
            key={step}
            className={`text-sm font-medium ${
              index + 1 <= currentStep ? 'text-blue-600' : 'text-gray-400'
            }`}>
            {step}
          </div>
        ))}
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full">
        <div
          className="h-full bg-blue-600 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
//
export default ProgressBar;
