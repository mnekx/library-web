import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthState } from '../../contexts/auth/auth-context';
import { editUser } from '../../contexts/users/users-actions';
import {
  useUsersDispatchContext,
  useUsersStateContext,
} from '../../contexts/users/users-context';
import { useNavigate } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
const theme = createTheme();

const EditUserComp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const params = useParams();
  const usersStateContext = useUsersStateContext();
  const usersDispatchContext = useUsersDispatchContext();
  const { token, userDetails } = useAuthState();
  const navigate = useNavigate();
  useEffect(() => {
    const editedUser = usersStateContext.users.filter((user) => {
      return user._id === params['id'];
    })[0];
    setEmail(editedUser.email);
    setRole(editedUser.role)
  }, [params, usersStateContext.users]);
  const handleSave = async (e) => {
    e.preventDefault()
    const editedUser = await editUser(
      usersDispatchContext,
      {email, password, role},
      params['id'],
      token,
      userDetails
    );
    
    if (editedUser?.acknowledged) {
      setError('');
      navigate('/users')
    }
    if (editedUser?.error) setError(editedUser?.error);
  };
  return (<ThemeProvider theme={theme}>
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <EditIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Edit User
        </Typography>
        <Box
          component='form'
          onSubmit={handleSave}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email'
            name='email'
            aria-required
            autoFocus
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='role'
            label='Role'
            name='role'
            aria-required
            autoFocus
            placeholder='Role'
            onChange={(e) => setRole(e.target.value)}
            value={role}
          />
          <TextField
          aria-required
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Save
          </Button>
        </Box>
      </Box>
      {error.length > 0? <p style={{color: 'red'}}>{error}</p>: <></>}
    </Container>
  </ThemeProvider>)
};

export default EditUserComp;
