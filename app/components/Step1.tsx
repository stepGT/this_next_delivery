import React, { useState } from 'react';
import { Step1Props } from '../types';
import { CITIES } from '../utils/cities';
import { formatPhoneNumber } from '../utils/phoneMask';
import { senderSchema } from '../utils/validation';
import z from 'zod';

const Step1: React.FC<Step1Props> = ({ formData, updateFormData, onNext }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      senderSchema.parse({
        senderName: formData.senderName,
        senderPhone: formData.senderPhone,
        senderCity: formData.senderCity,
      });
      setErrors({});
      onNext();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
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
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.senderName ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.senderName && <p className="mt-1 text-sm text-red-600">{errors.senderName}</p>}
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
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.senderPhone ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.senderPhone && <p className="mt-1 text-sm text-red-600">{errors.senderPhone}</p>}
      </div>

      <div>
        <label htmlFor="senderCity" className="block text-sm font-medium text-gray-700 mb-1">
          Город отправления *
        </label>
        <select
          id="senderCity"
          value={formData.senderCity}
          onChange={(e) => updateFormData({ senderCity: e.target.value })}
          className={`text-gray-700 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.senderCity ? 'border-red-500' : 'border-gray-300'
          }`}>
          <option value="">Выберите город</option>
          {CITIES.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        {errors.senderCity && <p className="mt-1 text-sm text-red-600">{errors.senderCity}</p>}
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
