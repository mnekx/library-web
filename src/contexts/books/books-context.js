import React, { useContext } from "react"
import { booksReducer } from "./books-reducer";
import { useReducer } from "react";

const BooksStateContext = React.createContext()
const BooksDispacthContext = React.createContext()

const initialState = {
    loading: false,
    books: [],
    error: null
  }

  export const useBookStateContext = () => {
    const context = useContext(BooksStateContext)
    if(context === undefined) {
        throw new Error('useBookStateContext should be called within BooksProvider!')
    }
    return context
  }

  export const useBooksDispatchContext = () => {
    const context = useContext(BooksDispacthContext)
    if(context === undefined) {
        throw new Error('useBooksDispatchContext should be called within BooksProvider!')
    }
    return context
  }

const BooksProvider = ({ children }) => {
    const [state, dispatch] = useReducer(booksReducer, initialState);
   
    return (
      <BooksStateContext.Provider value={state}>
        <BooksDispacthContext.Provider value={dispatch}>
          {children}
        </BooksDispacthContext.Provider>
      </BooksStateContext.Provider>
    );
  };

  export {BooksDispacthContext, BooksProvider, BooksStateContext}