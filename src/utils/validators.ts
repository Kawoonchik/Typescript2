export namespace Validation {
  // Перевірка на обов'язковість поля (не порожнє)
  export function isRequired(value: string): boolean {
    return value.trim().length > 0;
  }

  // Перевірка ID користувача (тільки цифри)
  export function isValidUserId(id: string): boolean {
    const regex = /^\d+$/;
    return regex.test(id);
  }

  // Перевірка року видання (тільки цифри, реалістичний рік від 1000 до 2099)
  export function isValidYear(year: string): boolean {
    const regex = /^(1[0-9]{3}|20[0-9]{2})$/;
    return regex.test(year);
  }
}
