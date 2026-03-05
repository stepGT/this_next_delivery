import React from 'react';
import { Step3Props } from '../types';

const Step3: React.FC<Step3Props> = ({ onSubmit, onBack }) => {
  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    onSubmit();
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400">
          Назад
        </button>
        <button
          type="submit"
          className={`px-6 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-600 text-white hover:bg-green-700 cursor-pointer`}>
          Отправить
        </button>
      </div>
    </form>
  );
};

export default Step3;
