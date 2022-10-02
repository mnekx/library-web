import React, { useContext } from "react"
import { usersReducer } from "./users-reducer";
import { useReducer } from "react";

const UsersStateContext = React.createContext()
const UsersDispacthContext = React.createContext()

const initialState = {
    loading: false,
    users: [],
    error: null
  }

  export const useUsersStateContext = () => {
    const context = useContext(UsersStateContext)
    if(context === undefined) {
        throw new Error('useUsersStateContext should be called within UsersProvider!')
    }
    return context
  }

  export const useUsersDispatchContext = () => {
    const context = useContext(UsersDispacthContext)
    if(context === undefined) {
        throw new Error('useUsersDispatchContext should be called within UsersProvider!')
    }
    return context
  }

const UsersProvider = ({ children }) => {
    const [state, dispatch] = useReducer(usersReducer, initialState);
   
    return (
      <UsersStateContext.Provider value={state}>
        <UsersDispacthContext.Provider value={dispatch}>
          {children}
        </UsersDispacthContext.Provider>
      </UsersStateContext.Provider>
    );
  };

  export {UsersDispacthContext, UsersProvider, UsersStateContext}