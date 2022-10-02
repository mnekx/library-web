const BASE_URL = 'http://23.239.16.175:3001/api';

export const addBook = async (dispatch, book, token, user) => {

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-access-token': token },
    body: JSON.stringify({ ...book, user }),
  };
  dispatch({ type: 'LOADING' });
  let response = await fetch(`${BASE_URL}/books/`, requestOptions);
  let data = await response.json();
  if (data._id) {
    
    dispatch({ type: 'ADDED', payload: data });
    return data;
  }

  if (data.error) {
    dispatch({ type: 'ERRORED', payload: data.error });
    return data;
  }
  return { error: 'something is wrong' };
};

export const deleteBook = async (dispatch, id, token, user) => {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', 'x-access-token': token },
    body: JSON.stringify({ user }),
  };
  dispatch({ type: 'LOADING' });
  let response = await fetch(`${BASE_URL}/books/${id}`, requestOptions);
  let data = await response.json();
  if (data?.acknowledged){
    dispatch({ type: 'DELETED', id });
    return data;
  }

  console.log(id)

  if (data.error) {
    dispatch({ type: 'ERRORED', error: data.error });
    return data;
  }
  return { error: 'something is wrong' };
};

export const getBooks = async (dispatch, token) => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'x-access-token': token },
  };
  dispatch({ type: 'LOADING' });
  let response = await fetch(`${BASE_URL}/books/`, requestOptions);
  let data = await response.json();
  if (Array.isArray(data)) {
   
    dispatch({ type: 'FETCHED', payload: data });
    return data;
  }

  if (data.error) {
    dispatch({ type: 'ERRORED', payload: data.error });
    return data;
  }
  return { error: 'something is wrong' };
};

export const editBook = async (dispatch, book, id, token, user) => {
  
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-access-token': token },
        body: JSON.stringify({ ...book, user }),
      };
      dispatch({ type: 'LOADING' });
      let response = await fetch(`${BASE_URL}/books/${id}`, requestOptions);
      let data = await response.json();
      if (data.acknowledged) {
        dispatch({ type: 'EDITED', id, payload: data });
        return data;
      }
    
      if (data.error) {
        dispatch({ type: 'ERRORED', error: data.error });
        return data;
      }
      return { error: 'something is wrong' };
}
