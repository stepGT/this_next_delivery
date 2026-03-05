import { z } from 'zod';

export const senderSchema = z.object({
  senderName: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  senderPhone: z.string().regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Неверный формат телефона'),
  senderCity: z.string().min(1, 'Выберите город отправления'),
});

export const receiverSchema = z.object({
  receiverName: z.string().min(2, 'Имя получателя должно содержать минимум 2 символа'),
  receiverCity: z.string().min(1, 'Выберите город назначения'),
  cargoType: z.enum(['documents', 'fragile', 'regular']),
  weight: z.number().min(0.1, 'Вес должен быть от 0.1 кг').max(30, 'Вес должен быть до 30 кг'),
});

export const agreementSchema = z.object({
  agreedToTerms: z.boolean().refine((val) => val === true, {
    message: 'Необходимо согласиться с условиями',
  }),
});
