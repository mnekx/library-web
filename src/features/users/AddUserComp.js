import { useState } from 'react';
import { useAuthState } from '../../contexts/auth/auth-context';
import { addUser } from '../../contexts/users/users-actions';
import {
  useUsersDispatchContext,
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
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
const theme = createTheme();

const AddUserComp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('')
  const [error, setError] = useState('');
  const usersDispatchContext = useUsersDispatchContext();
  const { token, userDetails } = useAuthState();
  const navigate = useNavigate();
 
  const handleSave = async (e) => {
    e.preventDefault()
    const addedUser = await addUser(
      usersDispatchContext,
      {email, password, role},
      token,
      userDetails
    );
    if (typeof addedUser?._id === 'string' && addedUser?._id?.length > 0) {
      setError('');
      navigate('/users')
    }
    if (addedUser?.error) setError(addedUser?.error);
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
          <PersonAddAltIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Add User
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
            Add
          </Button>
        </Box>
      </Box>
      {error.length > 0? <p style={{color: 'red'}}>{error}</p>: <></>}
    </Container>
  </ThemeProvider>)
};

export default AddUserComp;
