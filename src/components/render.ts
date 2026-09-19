export function renderAppLayout(): void {
  const appContainer = document.getElementById('app');
  if (!appContainer) return;

  // Головний контейнер Bootstrap
  const container = document.createElement('div');
  container.className = 'container my-5';

  // Заголовок
  const header = document.createElement('h2');
  header.className = 'text-center mb-4';
  header.textContent = 'Система Управління Бібліотекою';

  // Контейнери для секцій (картки)
  const bookFormContainer = createSectionContainer('book-form-container');
  const userFormContainer = createSectionContainer('user-form-container');
  const bookListContainer = createSectionContainer('book-list-container');
  const userListContainer = createSectionContainer('user-list-container');

  // Монтуємо все в DOM
  container.append(
    header,
    bookFormContainer,
    userFormContainer,
    bookListContainer,
    userListContainer
  );

  appContainer.appendChild(container);
}

// Допоміжна функція для створення блоків-карток
function createSectionContainer(id: string): HTMLDivElement {
  const wrapper = document.createElement('div');
  wrapper.className = 'card mb-3 shadow-sm';
  wrapper.id = id;

  const body = document.createElement('div');
  body.className = 'card-body';
  wrapper.appendChild(body);

  return wrapper;
}
