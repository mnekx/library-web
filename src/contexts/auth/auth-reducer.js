let user = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser'))
  : '';
let token = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser')).token
  : '';

export const initialAuthState = {
  userDetails: '' || user,
  token: '' || token,
  loading: false,
  errorMessage: null,
};

export const authReducer = (prev, action) => {
  
  switch (action.type) {
    case 'LOGIN_REQUESTED':
      return {
        ...prev,
        loading: true,
      };
    case 'LOGGED_IN':
      return {
        ...prev,
        userDetails: action.payload,
        token: action.payload.token,
        loading: false,
      };
    case 'ERRORED':
      return {
        ...prev,
        loading: false,
        errorMessage: action.error || action.message,
      };
    case 'LOGGED_OUT':
      return {
        ...prev,
        userDetails: '',
        token: '',
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
