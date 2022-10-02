import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from '../../contexts/auth/auth-context';
import { deleteBook } from '../../contexts/books/books-actions';
import { useBooksDispatchContext } from '../../contexts/books/books-context';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import { ListItem } from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const BookItemComp = ({ book }) => {
  const navigate = useNavigate();
  const dispatch = useBooksDispatchContext();
  const { token, userDetails } = useAuthState();
  const [error, setError] = useState('');
  const handleEdition = () => {
    navigate('/edit-book/' + book._id);
  };
  const handleDeletion = async () => {
    const deletionResponse = await deleteBook(
      dispatch,
      book._id,
      token,
      userDetails
    );

    if (deletionResponse?.acknowledged) {
      setError('');
      navigate(0);
    }
    if (deletionResponse?.error?.length > 0)
      setError(deletionResponse.error.name);
    else setError('!');
  };
  
  return (
    <ListItem key={book._id} sx={{display: 'flex'}}>
      <ListItemButton sx={{ flexBasis: '90%' }} onClick={handleEdition} disabled={userDetails?.role !== 'administrator'}>
        <ListItemIcon>
          <ImportContactsIcon />
        </ListItemIcon>
        <ListItemText sx={{ fontSize: '2rem' }} primary={book.title} />
        <ListItemIcon>
          <EditIcon />
        </ListItemIcon>
      </ListItemButton>
      <ListItemButton
        sx={{ flexBasis: '10%' }}
        onClick={handleDeletion}
        disabled={userDetails?.role !== 'administrator'}
      >
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
      </ListItemButton>
      {error.length > 0? <p style={{color: 'red'}}>{error}</p>: <></>}
      </ListItem>
  );
};

export default BookItemComp;
