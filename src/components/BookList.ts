import { IBook } from '../models/interfaces/IBook';

export class BookList {
  private containerId: string;
  private onBorrow: (bookId: string) => void;
  private onReturn: (bookId: string) => void;
  private onDelete: (bookId: string) => void;
  private books: IBook[] = [];
  private authorSearch = '';

  constructor(
    containerId: string,
    onBorrow: (bookId: string) => void,
    onReturn: (bookId: string) => void,
    onDelete: (bookId: string) => void,
  ) {
    this.containerId = containerId;
    this.onBorrow = onBorrow;
    this.onReturn = onReturn;
    this.onDelete = onDelete;
  }

  render(books: IBook[]): void {
    this.books = books;
    const container = document.querySelector(`#${this.containerId} .card-body`);
    if (!container) return;

    container.innerHTML = '<h4 class="card-title mb-3">Список Книг</h4>';

    const searchInput = document.createElement('input');
    searchInput.type = 'search';
    searchInput.className = 'form-control mb-3';
    searchInput.placeholder = 'Пошук за ім’ям автора';
    searchInput.value = this.authorSearch;
    searchInput.addEventListener('input', () => {
      this.authorSearch = searchInput.value;
      const cursorPosition = searchInput.selectionStart;
      this.render(this.books);
      const updatedSearchInput = document.querySelector(
        `#${this.containerId} .card-body input[type="search"]`,
      ) as HTMLInputElement | null;
      updatedSearchInput?.focus();
      if (cursorPosition !== null) {
        updatedSearchInput?.setSelectionRange(cursorPosition, cursorPosition);
      }
    });
    container.appendChild(searchInput);

    const filteredBooks = books.filter((book) =>
      book.author.toLocaleLowerCase().includes(this.authorSearch.trim().toLocaleLowerCase()),
    );

    if (filteredBooks.length === 0) {
      const emptyMsg = document.createElement('p');
      emptyMsg.className = 'text-muted';
      emptyMsg.textContent =
        books.length === 0 ? 'Книг поки немає.' : 'Книг цього автора не знайдено.';
      container.appendChild(emptyMsg);
      return;
    }

    const listGroup = document.createElement('ul');
    listGroup.className = 'list-group list-group-flush';

    filteredBooks.forEach((book) => {
      const listItem = document.createElement('li');
      listItem.className = 'list-group-item d-flex justify-content-between align-items-center px-0';
      listItem.textContent = `${book.title} by ${book.author} (${book.year})`;

      const actions = document.createElement('div');
      actions.className = 'd-flex gap-2';

      const actionBtn = document.createElement('button');
      actionBtn.className = book.isBorrowed ? 'btn btn-warning btn-sm' : 'btn btn-primary btn-sm';
      actionBtn.textContent = book.isBorrowed ? 'Повернути' : 'Позичити';

      actionBtn.addEventListener('click', () => {
        if (book.isBorrowed) {
          this.onReturn(book.id);
        } else {
          this.onBorrow(book.id);
        }
      });

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'btn btn-danger btn-sm';
      deleteBtn.textContent = 'Видалити';
      deleteBtn.addEventListener('click', () => this.onDelete(book.id));

      actions.append(actionBtn, deleteBtn);
      listItem.appendChild(actions);
      listGroup.appendChild(listItem);
    });

    container.appendChild(listGroup);
  }
}
