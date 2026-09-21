import { IUser } from '../models/interfaces/IUser';

export class UserList {
  private containerId: string;
  private onDelete: (userId: string) => void;

  constructor(containerId: string, onDelete: (userId: string) => void) {
    this.containerId = containerId;
    this.onDelete = onDelete;
  }

  render(users: IUser[]): void {
    const container = document.querySelector(`#${this.containerId} .card-body`);
    if (!container) return;

    container.innerHTML = '<h4 class="card-title mb-3">Список Користувачів</h4>';

    if (users.length === 0) {
      const emptyMsg = document.createElement('p');
      emptyMsg.className = 'text-muted';
      emptyMsg.textContent = 'Користувачів поки немає.';
      container.appendChild(emptyMsg);
      return;
    }

    const listGroup = document.createElement('ul');
    listGroup.className = 'list-group list-group-flush';

    users.forEach((user) => {
      const listItem = document.createElement('li');
      listItem.className = 'list-group-item d-flex justify-content-between align-items-center px-0';

      const details = document.createElement('span');
      details.textContent = `${user.name} (${user.email}) - Книг на руках: ${user.borrowedBooks ? user.borrowedBooks.length : 0}`;

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'btn btn-danger btn-sm';
      deleteBtn.textContent = 'Видалити';
      deleteBtn.addEventListener('click', () => this.onDelete(user.id));

      listItem.append(details, deleteBtn);
      listGroup.appendChild(listItem);
    });

    container.appendChild(listGroup);
  }
}
