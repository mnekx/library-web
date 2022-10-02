import { useEffect } from 'react';
import {
  useBooksDispatchContext,
  useBookStateContext,
} from '../../contexts/books/books-context';
import BookItemComp from './BookItemComp';
import { getBooks } from '../../contexts/books/books-actions';
import { useAuthState } from '../../contexts/auth/auth-context';

import List from '@mui/material/List';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import { ListSubheader } from '@mui/material';
import { Typography } from '@mui/material';
import { Link } from '@mui/material';

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  bottom: 50,
  right: 50,
});

const BooksComp = () => {
  const dispatch = useBooksDispatchContext();
  const { token } = useAuthState();
  const context = useBookStateContext();
  useEffect(() => {
    getBooks(dispatch, token);
  }, [dispatch, token]);
  return (
    <>
      <List
        subheader={
          <ListSubheader component='div' id='nested-list-subheader'>
            <Typography
              sx={{ fontSize: '1.5rem', marginTop: '1rem', textAlign: 'start' }}
              variant='h3'
              component='h3'
            >
              Books
            </Typography>
            ;
          </ListSubheader>
        }
        sx={{
          width: '100%',
          bgcolor: 'background.paper',
          height: '90vh',
          overflowY: 'auto',
        }}
        component='nav'
        aria-labelledby='nested-list-subheader'
      >
        {context?.books.map((book) => {
          return <BookItemComp book={book} key={book._id} />;
        })}
      </List>
      <StyledFab color='secondary' aria-label='add'>
        {/* <AddIcon/> */}
        <Link href='add-book' sx={{ color: 'whitesmoke' }}>
          <AddIcon />{' '}
        </Link>
      </StyledFab>
    </>
  );
};

export default BooksComp;
