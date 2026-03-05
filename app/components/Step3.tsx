import React, { useEffect, useState } from 'react';
import { Step3Props } from '../types';
import { agreementSchema } from '../utils/validation';
import { z } from 'zod';

const Step3: React.FC<Step3Props> = ({ formData, updateFormData, onSubmit, onBack }) => {
  const [error, setError] = useState<string>('');
  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      agreementSchema.parse({ agreedToTerms: formData.agreedToTerms });
      setError('');
      onSubmit();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstIssue = error.issues[0];
        setError(firstIssue.message);
      } else {
        setError('Необходимо согласиться с условиями');
      }
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    updateFormData({ agreedToTerms: checked });
    if (error) {
      setError('');
    }
  };

  const cargoTypeLabels = {
    documents: 'Документы',
    fragile: 'Хрупкое',
    regular: 'Обычное',
  };

  useEffect(() => {
    if (formData.agreedToTerms) {
      setError('');
    }
  }, [formData.agreedToTerms]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-50 p-6 rounded-lg space-y-4 border border-gray-300">
        <h3 className="text-lg font-semibold mb-4">Проверьте введенные данные</h3>

        <div className="border-b border-gray-200 pb-4">
          <h4 className="font-medium text-gray-700 mb-2">Отправитель</h4>
          <p className="text-gray-600">Имя: {formData.senderName}</p>
          <p className="text-gray-600">Телефон: {formData.senderPhone}</p>
          <p className="text-gray-600">Город: {formData.senderCity}</p>
        </div>

        <div className="border-b border-gray-200 pb-4">
          <h4 className="font-medium text-gray-700 mb-2">Получатель и посылка</h4>
          <p className="text-gray-600">Имя получателя: {formData.receiverName}</p>
          <p className="text-gray-600">Город назначения: {formData.receiverCity}</p>
          <p className="text-gray-600">Тип груза: {cargoTypeLabels[formData.cargoType]}</p>
          <p className="text-gray-600">Вес: {`${formData.weight} кг`}</p>
        </div>
      </div>

      <div className="space-y-2">
        <label className="flex items-start cursor-pointer group">
          <input
            type="checkbox"
            checked={formData.agreedToTerms}
            onChange={handleCheckboxChange}
            className="mt-1 mr-3 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700 select-none">
            Я согласен с условиями обработки данных *
          </span>
        </label>
        {error && <p className="text-sm text-red-600 ml-7">{error}</p>}
      </div>

      <div className="flex justify-between pt-4">
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
