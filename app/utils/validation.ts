import { z } from 'zod';

export const senderSchema = z.object({
  senderName: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  senderPhone: z.string().regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Неверный формат телефона'),
  senderCity: z.string().min(1, 'Выберите город отправления'),
});
