export class Library<T extends { id: string }> {
  private items: T[];

  constructor(initialItems: T[] = []) {
    this.items = initialItems;
  }

  // Додавання об'єкта
  add(item: T): void {
    this.items.push(item);
  }

  // Видалення об'єкта за id
  remove(id: string): void {
    this.items = this.items.filter(item => item.id !== id);
  }

  // Пошук конкретного об'єкта за id
  findById(id: string): T | undefined {
    return this.items.find(item => item.id === id);
  }

  // Універсальний пошук за певного умовою (дозволить шукати за автором або назвою)
  find(predicate: (item: T) => boolean): T[] {
    return this.items.filter(predicate);
  }

  // Отримання всіх об'єктів
  getAll(): T[] {
    return [...this.items]; // Повертаємо копію масиву для безпеки
  }

  // Оновлення об'єкта (знадобиться для зміни стану isBorrowed у книг)
  update(id: string, updatedFields: Partial<T>): void {
    const index = this.items.findIndex(item => item.id === id);
    if (index !== -1) {
      this.items[index] = { ...this.items[index], ...updatedFields };
    }
  }
}