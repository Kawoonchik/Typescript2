export class Library<T extends { id: string }> {
  private items: T[];

  constructor(initialItems: T[] = []) {
    this.items = initialItems;
  }

  add(item: T): void {
    this.items.push(item);
  }

  remove(id: string): void {
    this.items = this.items.filter((item) => item.id !== id);
  }

  findById(id: string): T | undefined {
    return this.items.find((item) => item.id === id);
  }

  find(predicate: (item: T) => boolean): T[] {
    return this.items.filter(predicate);
  }

  getAll(): T[] {
    return [...this.items];
  }

  update(id: string, updatedFields: Partial<T>): void {
    const index = this.items.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.items[index] = { ...this.items[index], ...updatedFields };
    }
  }
}
