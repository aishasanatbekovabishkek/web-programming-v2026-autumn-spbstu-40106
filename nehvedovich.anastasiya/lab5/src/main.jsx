import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {createRoot} from 'react-dom/client';
import './styles.css';

const ThemeContext = createContext(null);

function ThemeProvider({children}) {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('book-store-theme');
    return savedTheme === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('book-store-theme', theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => {
        setTheme((currentTheme) =>
          currentTheme === 'light' ? 'dark' : 'light',
        );
      },
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme должен использоваться внутри ThemeProvider');
  }

  return context;
}

const books = [
  {
    id: 1,
    title: 'На привязи',
    author: 'А Чжи',
    genre: 'Манхва',
    price: 100,
  },
  {
    id: 2,
    title: 'Преступление и наказание',
    author: 'Фёдор Достоевский',
    genre: 'Классика',
    price: 200,
  },
  {
    id: 3,
    title: '1984',
    author: 'Джордж Оруэлл',
    genre: 'Антиутопия',
    price: 350,
  },
  {
    id: 4,
    title: 'Цветы для Элджернона',
    author: 'Дэниел Киз',
    genre: 'Научная фантастика',
    price: 400,
  },
  {
    id: 5,
    title: 'Точка зрения всеведующего читателя',
    author: 'singNsong',
    genre: 'Новелла',
    price: 10000,
  },
  {
    id: 6,
    title: 'Три товарища',
    author: 'Эрих Мария Ремарк',
    genre: 'Роман',
    price: 500,
  },
];

function ThemeToggle() {
  const {theme, toggleTheme} = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      className="theme-toggle"
      data-testid="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Включить светлую тему' : 'Включить тёмную тему'}
      title={isDark ? 'Светлая тема' : 'Тёмная тема'}
    >
      <span className="theme-toggle-icon" aria-hidden="true">
        {isDark ? '☀️' : '🌙'}
      </span>

      <span>{isDark ? 'Светлая тема' : 'Тёмная тема'}</span>
    </button>
  );
}

function BookCard({book}) {
  return (
    <article className="book-card">
      <div className="book-card__content">
        <p className="book-card__genre">{book.genre}</p>
        <h2>{book.title}</h2>
        <p className="book-card__author">{book.author}</p>
        <strong className="book-card__price">{book.price} ₽</strong>
      </div>
    </article>
  );
}

function BookList() {
  return (
    <section className="catalog" aria-labelledby="catalog-title">
      <div className="catalog-heading">
        <div>
          <p className="eyebrow">Каталог</p>
          <h1 id="catalog-title">Книжный магазин</h1>
        </div>
      </div>

      <div className="book-grid" data-testid="book-list">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}

function App() {
  return (
    <div className="app-shell" data-testid="app">
      <header className="header">
        <a className="logo" href="#catalog-title" aria-label="BookStore">
          <span className="logo__mark">B</span>
          <span>BookStore</span>
        </a>
        <ThemeToggle />
      </header>

      <main>
        <BookList />
      </main>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
