const BASE_URL = 'http://23.239.16.175:3001/api';

export const addUser = async (dispatch, userData, token, user) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-access-token': token },
    body: JSON.stringify({ ...userData, user }),
  };
  dispatch({ type: 'LOADING' });
  console.log(token)
  let response = await fetch(`${BASE_URL}/staff/`, requestOptions);
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

export const deleteUser = async (dispatch, id, token, user) => {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', 'x-access-token': token },
    body: JSON.stringify({ user }),
  };
  dispatch({ type: 'LOADING' });
  let response = await fetch(`${BASE_URL}/staff/${id}`, requestOptions);
  let data = await response.json();
  if (data?.acknowledged) {
    dispatch({ type: 'DELETED', id });
    return data;
  }

  if (data.error) {
    dispatch({ type: 'ERRORED', error: data.error });
    return data;
  }
  return { error: 'something is wrong' };
};

export const getUsers = async (dispatch, token) => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'x-access-token': token },
  };
  dispatch({ type: 'LOADING' });
  let response = await fetch(`${BASE_URL}/staff/`, requestOptions);
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

export const editUser = async (dispatch, userData, id, token, user) => {
  const requestOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', 'x-access-token': token },
    body: JSON.stringify({ ...userData, user }),
  };
  dispatch({ type: 'LOADING' });
  let response = await fetch(`${BASE_URL}/staff/${id}`, requestOptions);
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
};
