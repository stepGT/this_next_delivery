import React from 'react';
import { Step1Props } from '../types';

const Step1: React.FC<Step1Props> = ({ onNext }) => {
  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    onNext();
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Далее
        </button>
      </div>
    </form>
  );
};

export default Step1;
