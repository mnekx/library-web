import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthState } from '../../contexts/auth/auth-context';
import { editBook } from '../../contexts/books/books-actions';
import {
  useBooksDispatchContext,
  useBookStateContext,
} from '../../contexts/books/books-context';
import { useNavigate } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';

const EditBookComp = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState('');
  const params = useParams();
  const booksStateContext = useBookStateContext();
  const booksDispatchContext = useBooksDispatchContext();
  const { token, userDetails } = useAuthState();
  const navigate = useNavigate();
  const theme = createTheme();
  useEffect(() => {
    const book = booksStateContext.books.filter((book) => {
      return book._id === params['id'];
    })[0];
    setTitle(book.title);
    setAuthor(book.author);
  }, [booksStateContext.books, params]);
  const handleSave = async (e) => {
    e.preventDefault()
    const editedBook = await editBook(
      booksDispatchContext,
      {title, author},
      params['id'],
      token,
      userDetails
    );
    if (editedBook?.acknowledged) {
      setError('');
      navigate('/');
    }
    if (editedBook?.error) setError(editedBook?.error);
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
          Edit Book
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
            autoFocus
            placeholder='Title'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='author'
            label='Author'
            type='text'
            id='Author'
            placeholder='Author'
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Save
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
      {error.length > 0? <p style={{color: 'red'}}>{error}</p>: <></>}
    </Container>
  </ThemeProvider>)
};

export default EditBookComp;
