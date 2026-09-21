export function renderAppLayout(): void {
  const appContainer = document.getElementById('app');
  if (!appContainer) return;

  const container = document.createElement('div');
  container.className = 'container my-5';

  const header = document.createElement('h2');
  header.className = 'text-center mb-4';
  header.textContent = 'Система Управління Бібліотекою';

  const bookFormContainer = createSectionContainer('book-form-container');
  const userFormContainer = createSectionContainer('user-form-container');
  const bookListContainer = createSectionContainer('book-list-container');
  const userListContainer = createSectionContainer('user-list-container');

  container.append(
    header,
    bookFormContainer,
    userFormContainer,
    bookListContainer,
    userListContainer,
  );

  appContainer.appendChild(container);
}

function createSectionContainer(id: string): HTMLDivElement {
  const wrapper = document.createElement('div');
  wrapper.className = 'card mb-3 shadow-sm';
  wrapper.id = id;

  const body = document.createElement('div');
  body.className = 'card-body';
  wrapper.appendChild(body);

  return wrapper;
}
