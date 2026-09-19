export const Validation = {
  isRequired(value: string): boolean {
    return value.trim().length > 0;
  },

  isValidUserId(id: string): boolean {
    const regex = /^\d+$/;
    return regex.test(id);
  },

  isValidYear(year: string): boolean {
    const regex = /^(1[0-9]{3}|20[0-9]{2})$/;
    return regex.test(year);
  },
};
