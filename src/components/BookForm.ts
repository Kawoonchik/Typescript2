export class BookForm {
  private containerId: string;

  constructor(containerId: string) {
    this.containerId = containerId;
  }

  render(): void {
    const container = document.querySelector(`#${this.containerId} .card-body`);
    if (!container) return;

    // Заголовок форми
    const title = document.createElement('h4');
    title.className = 'card-title mb-3';
    title.textContent = 'Додати Книгу';

    // Форма
    const form = document.createElement('form');
    form.id = 'add-book-form';

    // Поля форми
    const titleInput = this.createInput('text', 'Назва книги', 'book-title');
    const authorInput = this.createInput('text', 'Автор', 'book-author');
    const yearInput = this.createInput('text', 'Рік видання', 'book-year');

    // Кнопка
    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.className = 'btn btn-success mt-2';
    submitBtn.textContent = 'Додати Книгу';

    // Додаємо елементи до форми
    form.append(titleInput, authorInput, yearInput, submitBtn);
    
    // Обробник сабміту (поки що лише заглушка, логіку валідації додамо пізніше)
    form.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      console.log('Спроба додати книгу...');
    });

    // Монтуємо в контейнер
    container.append(title, form);
  }

  private createInput(type: string, placeholder: string, id: string): HTMLDivElement {
    const wrapper = document.createElement('div');
    wrapper.className = 'mb-2';

    const input = document.createElement('input');
    input.type = type;
    input.className = 'form-control';
    input.placeholder = placeholder;
    input.id = id;

    wrapper.appendChild(input);
    return wrapper;
  }
}