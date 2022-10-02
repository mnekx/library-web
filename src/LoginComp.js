import { useState } from 'react';
import { loginUser } from './contexts/auth/auth-actions';
import { useAuthDispatch, useAuthState } from './contexts/auth/auth-context';
import { useNavigate, useLocation } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Copyright = (props) => {
    return (
      <Typography
        variant='body2'
        color='text.secondary'
        align='center'
        {...props}
      >
        {'Copyright © '}
        <Link color='inherit' href='https://www.linkedin.com/in/mnemba-chambuya/'>
          Mnemba Chambuya
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  };
  
  const theme = createTheme();

const LoginComp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errored, setErrored] = useState(false);
  const dispatch = useAuthDispatch();
  const {errorMessage, loading} = useAuthState()
  const navigate = useNavigate();
  const location = useLocation()
  const handleLogin = async (e) => {
    e.preventDefault()
    const data = await loginUser(dispatch, { email, password });
    if (typeof data?._id == 'string' && data._id.length > 0) {
      setErrored(false)
      const origin = location.state?.from?.pathname || '/'
      navigate(origin);
    } else {
      setErrored(true);
    }
    setEmail('');
    setPassword('');
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs' data-testid='login'>
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Login
          </Typography>
          <Box
            component='form'
            onSubmit={handleLogin}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item>
                <Link href='/register' variant='body2'>
                  {"Don't have an account? Register"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {loading? 'Loading...': ''}
        {errorMessage && errorMessage.length > 0? <span style={{color: 'red'}}>{errorMessage}</span>: ''}
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default LoginComp;
