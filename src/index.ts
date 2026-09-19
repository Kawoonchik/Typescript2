import 'bootstrap/dist/css/bootstrap.min.css';
import { renderAppLayout } from './components/render';
import { BookForm } from './components/BookForm';
import { BookList } from './components/BookList';
import { Library } from './services/Library';
import { Storage } from './services/Storage';
import { IBook } from './models/interfaces/IBook';
import { generateId } from './utils/idGenerator';

const BOOKS_STORAGE_KEY = 'library_books';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Будуємо базову розмітку
  renderAppLayout();

  // 2. Витягуємо книги зі Storage та ініціалізуємо бібліотеку
  const savedBooks = Storage.load<IBook[]>(BOOKS_STORAGE_KEY) || [];
  const bookLibrary = new Library<IBook>(savedBooks);

  // 3. Ініціалізуємо список книг
  const bookList = new BookList('book-list-container');
  bookList.render(bookLibrary.getAll());

  // 4. Ініціалізуємо форму додавання книги
  const bookForm = new BookForm('book-form-container', (bookData) => {
    // Створюємо об'єкт нової книги
    const newBook: IBook = {
      id: generateId(),
      title: bookData.title,
      author: bookData.author,
      year: bookData.year,
      isBorrowed: false,
    };

    // Додаємо в логіку, зберігаємо в пам'ять і перемальовуємо UI
    bookLibrary.add(newBook);
    Storage.save(BOOKS_STORAGE_KEY, bookLibrary.getAll());
    bookList.render(bookLibrary.getAll());
  });

  bookForm.render();
});
