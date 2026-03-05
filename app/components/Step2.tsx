import React from 'react';
import { CargoType, Step2Props } from '../types';
import { CITIES } from '../utils/cities';

const Step2: React.FC<Step2Props> = ({ formData, updateFormData, onNext, onBack }) => {
  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    onNext();
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === '') {
      updateFormData({ weight: '' });
    } else {
      const numValue = Number(value);
      if (!isNaN(numValue)) {
        updateFormData({ weight: numValue });
      }
    }
  };

  const cargoTypes: { value: CargoType; label: string }[] = [
    { value: 'documents', label: 'Документы' },
    { value: 'fragile', label: 'Хрупкое' },
    { value: 'regular', label: 'Обычное' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="receiverName" className="block text-sm font-medium text-gray-700 mb-1">
          Имя получателя *
        </label>
        <input
          type="text"
          id="receiverName"
          value={formData.receiverName}
          onChange={(e) => {
            updateFormData({ receiverName: e.target.value });
          }}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300`}
        />
      </div>

      <div>
        <label htmlFor="receiverCity" className="block text-sm font-medium text-gray-700 mb-1">
          Город назначения *
        </label>
        <select
          id="receiverCity"
          value={formData.receiverCity}
          onChange={(e) => {
            updateFormData({ receiverCity: e.target.value });
          }}
          className={`text-gray-700 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300`}>
          <option value="">Выберите город</option>
          {CITIES.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Тип груза *</label>
        <div className="space-y-2">
          {cargoTypes.map((type) => (
            <label key={type.value} className="flex items-center">
              <input
                type="radio"
                name="cargoType"
                value={type.value}
                checked={formData.cargoType === type.value}
                onChange={(e) => {
                  updateFormData({ cargoType: e.target.value as CargoType });
                }}
                className="mr-2"
              />
              {type.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
          Вес, кг * (0.1 - 30)
        </label>
        <input
          type="number"
          id="weight"
          value={formData.weight === '' ? '' : formData.weight}
          onChange={handleWeightChange}
          step="0.1"
          min="0.1"
          max="30"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300`}
        />
      </div>

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
