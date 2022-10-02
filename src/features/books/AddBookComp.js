import { useState } from 'react';
import { useAuthState } from '../../contexts/auth/auth-context';
import { addBook } from '../../contexts/books/books-actions';
import {
  useBooksDispatchContext,
} from '../../contexts/books/books-context';
import { useNavigate } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
const theme = createTheme();

const AddBookComp = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState('');
  const booksDispatchContext = useBooksDispatchContext();
  const { token, userDetails } = useAuthState();
  const navigate = useNavigate();
 
  const handleSave = async (e) => {
    e.preventDefault()
    const addedBook = await addBook(
      booksDispatchContext,
      {title, author},
      token,
      userDetails
    );
    console.log(addedBook)
    if (typeof addedBook?._id === 'string' && addedBook?._id?.length > 0) {
      setError('');
      navigate('/');
    }
    if (addedBook?.error) setError(addedBook?.error);
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
          <AddCircleIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Add Book
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
            id='title'
            label='Title'
            name='title'
            aria-required
            autoFocus
            placeholder='Title'
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
          aria-required
            margin='normal'
            required
            fullWidth
            name='author'
            label='Author'
            type='text'
            id='Author'
            placeholder='Author'
            onChange={(e) => setAuthor(e.target.value)}
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

export default AddBookComp;
