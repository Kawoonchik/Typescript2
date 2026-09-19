import 'bootstrap/dist/css/bootstrap.min.css';
import { renderAppLayout } from './components/render';
import { BookForm } from './components/BookForm';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Будуємо базову розмітку (контейнери)
  renderAppLayout();

  // 2. Рендеримо форму в підготовлений контейнер
  const bookForm = new BookForm('book-form-container');
  bookForm.render();
});