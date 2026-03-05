import React from 'react';
import { Step2Props } from '../types';

const Step2: React.FC<Step2Props> = ({ onNext, onBack }) => {
  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">
          Назад
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Далее
        </button>
      </div>
    </form>
  );
};

export default Step2;
