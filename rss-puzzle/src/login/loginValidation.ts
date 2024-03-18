export const validateName = (name: string): boolean => {
  const regex: RegExp = /^[A-Za-z-]{3,}$/;
  return regex.test(name.trim());
};

export const validateSurname = (surname: string): boolean => {
  const regex: RegExp = /^[A-Za-z-]{4,}$/;
  return regex.test(surname.trim());
};

export const capitalizeFirstLetter = (input: string): string => {
  return input.charAt(0).toUpperCase() + input.slice(1);
};
