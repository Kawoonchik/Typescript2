import { IUser } from '../models/interfaces/IUser';

export class UserList {
  private containerId: string;

  constructor(containerId: string) {
    this.containerId = containerId;
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
      listItem.className = 'list-group-item px-0';
      listItem.textContent = `${user.name} (${user.email}) - Книг на руках: ${user.borrowedBooks ? user.borrowedBooks.length : 0}`;
      listGroup.appendChild(listItem);
    });

    container.appendChild(listGroup);
  }
}
