export const initialState = {
  loading: false,
  users: [],
  error: null,
};

export const usersReducer = (prev, action) => {
  
  switch (action.type) {
    case 'ADDED':
      return {
        ...prev,
        users: [...prev.users, action.payload],
        loading: false,
      };
    case 'DELETED':
      return {
        ...prev,
        loading: false,
        users: prev.users.filter((book) => book.id !== action.id),
      };
    case 'LOADING':
      return { ...prev, loading: true };
    case 'EDITED':
      const editedList = prev.users.map((book, index) => {
        if (book._id === action.id) {
          const updatedBook = { ...action.payload };
          return updatedBook;
        }
        return book;
      });
      return {...prev, users: editedList}
    case 'ERRORED':
      return { ...prev, loading: false, error: action.payload };
    case 'FETCHED':
      return { ...prev, users: action.payload, loading: false };
    default:
      return prev;
  }
};
