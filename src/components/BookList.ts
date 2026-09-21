import { IBook } from '../models/interfaces/IBook';

export class BookList {
  private containerId: string;
  private onBorrow: (bookId: string) => void;
  private onReturn: (bookId: string) => void;

  constructor(
    containerId: string,
    onBorrow: (bookId: string) => void,
    onReturn: (bookId: string) => void,
  ) {
    this.containerId = containerId;
    this.onBorrow = onBorrow;
    this.onReturn = onReturn;
  }

  render(books: IBook[]): void {
    const container = document.querySelector(`#${this.containerId} .card-body`);
    if (!container) return;

    container.innerHTML = '<h4 class="card-title mb-3">Список Книг</h4>';

    if (books.length === 0) {
      const emptyMsg = document.createElement('p');
      emptyMsg.className = 'text-muted';
      emptyMsg.textContent = 'Книг поки немає.';
      container.appendChild(emptyMsg);
      return;
    }

    const listGroup = document.createElement('ul');
    listGroup.className = 'list-group list-group-flush';

    books.forEach((book) => {
      const listItem = document.createElement('li');
      listItem.className = 'list-group-item d-flex justify-content-between align-items-center px-0';
      listItem.textContent = `${book.title} by ${book.author} (${book.year})`;

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

      listItem.appendChild(actionBtn);
      listGroup.appendChild(listItem);
    });

    container.appendChild(listGroup);
  }
}
