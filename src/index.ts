import 'bootstrap/dist/css/bootstrap.min.css';
import { renderAppLayout } from './components/render';
import { BookForm } from './components/BookForm';
import { BookList } from './components/BookList';
import { UserForm } from './components/UserForm';
import { UserList } from './components/UserList';
import { BorrowModal } from './components/BorrowModal';
import { NotificationService } from './utils/NotificationService';
import { Library } from './services/Library';
import { Storage } from './services/Storage';
import { IBook } from './models/interfaces/IBook';
import { IUser } from './models/interfaces/IUser';
import { generateId } from './utils/idGenerator';

const BOOKS_STORAGE_KEY = 'library_books';
const USERS_STORAGE_KEY = 'library_users';

document.addEventListener('DOMContentLoaded', () => {
  renderAppLayout();

  const savedBooks = Storage.load<IBook[]>(BOOKS_STORAGE_KEY) || [];
  const savedUsers = Storage.load<IUser[]>(USERS_STORAGE_KEY) || [];

  const bookLibrary = new Library<IBook>(savedBooks);
  const userLibrary = new Library<IUser>(savedUsers);

  const userList = new UserList('user-list-container');

  const bookList = new BookList(
    'book-list-container',
    (bookId: string) => {
      const book = bookLibrary.findById(bookId);
      const users = userLibrary.getAll();

      if (book) {
        BorrowModal.render(users, (userId: string) => {
          const user = userLibrary.findById(userId);
          if (user) {
            book.isBorrowed = true;
            user.borrowedBooks = user.borrowedBooks || [];
            user.borrowedBooks.push(bookId);

            Storage.save(BOOKS_STORAGE_KEY, bookLibrary.getAll());
            Storage.save(USERS_STORAGE_KEY, userLibrary.getAll());
            bookList.render(bookLibrary.getAll());
            userList.render(userLibrary.getAll());
            NotificationService.show(`Книгу "${book.title}" позичено читачу ${user.name}`);
          }
        });
      }
    },
    (bookId: string) => {
      const book = bookLibrary.findById(bookId);
      if (book) {
        book.isBorrowed = false;

        const users = userLibrary.getAll();
        const user = users.find((u: IUser) => u.borrowedBooks?.includes(bookId));
        if (user && user.borrowedBooks) {
          user.borrowedBooks = user.borrowedBooks.filter((id: string) => id !== bookId);
        }

        Storage.save(BOOKS_STORAGE_KEY, bookLibrary.getAll());
        Storage.save(USERS_STORAGE_KEY, userLibrary.getAll());
        bookList.render(bookLibrary.getAll());
        userList.render(userLibrary.getAll());
        NotificationService.show(`Книгу "${book.title}" успішно повернуто`);
      }
    },
  );

  bookList.render(bookLibrary.getAll());
  userList.render(userLibrary.getAll());

  const bookForm = new BookForm('book-form-container', (bookData) => {
    const newBook: IBook = {
      id: generateId(),
      title: bookData.title,
      author: bookData.author,
      year: bookData.year,
      isBorrowed: false,
    };
    bookLibrary.add(newBook);
    Storage.save(BOOKS_STORAGE_KEY, bookLibrary.getAll());
    bookList.render(bookLibrary.getAll());
    NotificationService.show(`Книгу "${newBook.title}" додано!`);
  });
  bookForm.render();

  const userForm = new UserForm('user-form-container', (userData) => {
    const newUser: IUser = {
      id: generateId(),
      name: userData.name,
      email: userData.email,
      borrowedBooks: [],
    };
    userLibrary.add(newUser);
    Storage.save(USERS_STORAGE_KEY, userLibrary.getAll());
    userList.render(userLibrary.getAll());
    NotificationService.show(`Користувача "${newUser.name}" додано!`);
  });
  userForm.render();
});
