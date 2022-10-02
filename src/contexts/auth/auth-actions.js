// Context/actions.js


const ROOT_URL = 'http://23.239.16.175:3001/api';

export async function loginUser(dispatch, loginPayload) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginPayload),
  };

  try {
    dispatch({ type: 'LOGIN_REQUESTED' });
    let response = await fetch(`${ROOT_URL}/login`, requestOptions);
    let data = await response.json();
    
    if (typeof(data._id) == 'string' && data._id.length>0) {
      dispatch({ type: 'LOGGED_IN', payload: data });
      localStorage.setItem('currentUser', JSON.stringify(data));
      return data
    }

    dispatch({ type: 'ERRORED', error: data.message });
    return;
  } catch (error) {
    dispatch({ type: 'ERRORED', error: error });
  }
}

export async function logout(dispatch) {
  dispatch({ type: 'LOGGED_OUT' });
  localStorage.removeItem('currentUser');
  localStorage.removeItem('token');
}