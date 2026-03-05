export const formatPhoneNumber = (value: string): string => {
  const numbers = value.replace(/\D/g, '');

  if (numbers.length === 0) return '';
  if (numbers.length < 2) return `+7 (${numbers}`;
  if (numbers.length < 5) return `+7 (${numbers.slice(1, 4)}`;
  if (numbers.length < 8) return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}`;
  if (numbers.length < 10)
    return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7, 9)}`;

  return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7, 9)}-${numbers.slice(9, 11)}`;
};
