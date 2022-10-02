export const initialState = {
  loading: false,
  books: [],
  error: null,
};

export const booksReducer = (prev, action) => {

  switch (action.type) {
    case 'ADDED':
      return {
        ...prev,
        books: [...prev.books, action.payload],
        loading: false,
      };
    case 'DELETED':
      return {
        ...prev,
        loading: false,
        books: prev.books.filter((book) => book.id !== action.id),
      };
    case 'LOADING':
      return { ...prev, loading: true };
    case 'EDITED':
      const editedList = prev.books.map((book, index) => {
        if (book._id === action.id) {
          const updatedBook = { ...action.payload };
          return updatedBook;
        }
        return book;
      });
      return {...prev, books: editedList}
    case 'ERRORED':
      return { ...prev, loading: false, error: action.payload };
    case 'FETCHED':
      return { ...prev, books: action.payload, loading: false };
    default:
      return prev;
  }
};
