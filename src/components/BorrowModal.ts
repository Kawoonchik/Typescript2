import { IUser } from '../models/interfaces/IUser';

export class BorrowModal {
  static render(users: IUser[], onConfirm: (userId: string) => void) {
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:1000;';

    const modal = document.createElement('div');
    modal.className = 'bg-white p-4 rounded shadow';
    modal.style.minWidth = '300px';
    modal.innerHTML = '<h5 class="mb-3">Оберіть читача</h5>';

    const select = document.createElement('select');
    select.className = 'form-select mb-3';

    if (users.length === 0) {
      select.innerHTML = '<option disabled selected>Немає зареєстрованих користувачів</option>';
    } else {
      users.forEach(u => {
        const opt = document.createElement('option');
        opt.value = u.id;
        opt.textContent = `${u.name} (${u.email})`;
        select.appendChild(opt);
      });
    }

    const btnGroup = document.createElement('div');
    btnGroup.className = 'd-flex justify-content-end gap-2';

    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'btn btn-secondary';
    cancelBtn.textContent = 'Скасувати';
    cancelBtn.onclick = () => document.body.removeChild(overlay);

    const confirmBtn = document.createElement('button');
    confirmBtn.className = 'btn btn-primary';
    confirmBtn.textContent = 'Підтвердити';
    confirmBtn.disabled = users.length === 0;
    confirmBtn.onclick = () => {
      onConfirm(select.value);
      document.body.removeChild(overlay);
    };

    btnGroup.append(cancelBtn, confirmBtn);
    modal.append(select, btnGroup);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
  }
}