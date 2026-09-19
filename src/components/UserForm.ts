import { Validation } from '../utils/validators';

export class UserForm {
  private containerId: string;
  private onSubmitCallback: (data: { name: string; email: string }) => void;

  constructor(
    containerId: string,
    onSubmitCallback: (data: { name: string; email: string }) => void,
  ) {
    this.containerId = containerId;
    this.onSubmitCallback = onSubmitCallback;
  }

  render(): void {
    const container = document.querySelector(`#${this.containerId} .card-body`);
    if (!container) return;

    container.innerHTML = '<h4 class="card-title mb-3">Додати Користувача</h4>';
    const form = document.createElement('form');
    form.id = 'add-user-form';

    const name = this.createInput('text', "Ім'я користувача", 'user-name');
    const email = this.createInput('email', 'Email', 'user-email');

    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.className = 'btn btn-success mt-2';
    submitBtn.textContent = 'Додати';

    form.append(name.wrapper, email.wrapper, submitBtn);

    form.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      this.clearErrors();

      const nameVal = name.input.value;
      const emailVal = email.input.value;
      let isValid = true;

      if (!Validation.isRequired(nameVal)) {
        this.showError(name.wrapper, "Ім'я є обов'язковим");
        isValid = false;
      }
      if (!Validation.isRequired(emailVal) || !emailVal.includes('@')) {
        this.showError(email.wrapper, 'Введіть коректний email');
        isValid = false;
      }

      if (isValid) {
        this.onSubmitCallback({ name: nameVal, email: emailVal });
        form.reset();
      }
    });

    container.appendChild(form);
  }

  // Ті самі допоміжні методи, що й у BookForm
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
    document.querySelectorAll('#add-user-form .error-message').forEach((el) => el.remove());
  }
}
