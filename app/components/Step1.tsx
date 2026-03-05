import React from 'react';
import { Step1Props } from '../types';
import { CITIES } from '../utils/cities';
import { formatPhoneNumber } from '../utils/phoneMask';

const Step1: React.FC<Step1Props> = ({ formData, updateFormData, onNext }) => {
  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    onNext();
  };
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    updateFormData({ senderPhone: formatted });
  };
  //
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="senderName" className="block text-sm font-medium text-gray-700 mb-1">
          Имя отправителя *
        </label>
        <input
          type="text"
          id="senderName"
          value={formData.senderName}
          onChange={(e) => updateFormData({ senderName: e.target.value })}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300`}
        />
      </div>

      <div>
        <label htmlFor="senderPhone" className="block text-sm font-medium text-gray-700 mb-1">
          Телефон *
        </label>
        <input
          type="tel"
          id="senderPhone"
          value={formData.senderPhone}
          onChange={handlePhoneChange}
          placeholder="+7 (___) ___-__-__"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300`}
        />
      </div>

      <div>
        <label htmlFor="senderCity" className="block text-sm font-medium text-gray-700 mb-1">
          Город отправления *
        </label>
        <select
          id="senderCity"
          value={formData.senderCity}
          onChange={(e) => updateFormData({ senderCity: e.target.value })}
          className={`text-gray-700 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300`}>
          <option value="">Выберите город</option>
          {CITIES.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

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
