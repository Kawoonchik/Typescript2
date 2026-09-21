import { Validation } from '../utils/validators';

export class BookForm {
  private containerId: string;
  private onSubmitCallback: (data: { title: string; author: string; year: number }) => void;

  constructor(
    containerId: string,
    onSubmitCallback: (data: { title: string; author: string; year: number }) => void,
  ) {
    this.containerId = containerId;
    this.onSubmitCallback = onSubmitCallback;
  }

  render(): void {
    const container = document.querySelector(`#${this.containerId} .card-body`);
    if (!container) return;

    container.innerHTML = '<h4 class="card-title mb-3">Додати Книгу</h4>';
    const form = document.createElement('form');
    form.id = 'add-book-form';

    const title = this.createInput('text', 'Назва книги', 'book-title');
    const author = this.createInput('text', 'Автор', 'book-author');
    const year = this.createInput('text', 'Рік видання', 'book-year');

    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.className = 'btn btn-success mt-2';
    submitBtn.textContent = 'Додати Книгу';

    form.append(title.wrapper, author.wrapper, year.wrapper, submitBtn);

    form.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      this.clearErrors();

      const titleVal = title.input.value;
      const authorVal = author.input.value;
      const yearVal = year.input.value;

      let isValid = true;

    
      if (!Validation.isRequired(titleVal)) {
        this.showError(title.wrapper, "Це поле є обов'язковим");
        isValid = false;
      }
      if (!Validation.isRequired(authorVal)) {
        this.showError(author.wrapper, "Це поле є обов'язковим");
        isValid = false;
      }
      if (!Validation.isRequired(yearVal) || !Validation.isValidYear(yearVal)) {
        this.showError(year.wrapper, 'Введіть коректний рік (тільки цифри)');
        isValid = false;
      }

      if (isValid) {
        this.onSubmitCallback({ title: titleVal, author: authorVal, year: parseInt(yearVal, 10) });
        form.reset();
      }
    });

    container.appendChild(form);
  }

  private createInput(type: string, placeholder: string, id: string) {
    const wrapper = document.createElement('div');
    wrapper.className = 'mb-2';

    const input = document.createElement('input');
    input.type = type;
    input.className = 'form-control';
    input.placeholder = placeholder;
    input.id = id;

    wrapper.appendChild(input);
    return { wrapper, input }; 
  }

  private showError(wrapper: HTMLDivElement, message: string) {
    const errorMsg = document.createElement('div');
    errorMsg.className = 'text-danger small mt-1 error-message';
    errorMsg.textContent = message;
    wrapper.appendChild(errorMsg);
  }

  private clearErrors() {
    document.querySelectorAll('.error-message').forEach((el) => el.remove());
  }
}
