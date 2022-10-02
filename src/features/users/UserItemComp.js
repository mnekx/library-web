import { useState } from "react";
import { useNavigate} from 'react-router-dom'
import { useAuthState } from "../../contexts/auth/auth-context";
import { deleteUser } from "../../contexts/users/users-actions";
import { useUsersDispatchContext } from "../../contexts/users/users-context";

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import { ListItem } from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const UserItemComp = ({ user }) => {
  const navigate = useNavigate()
  const dispatch = useUsersDispatchContext()
  const {token, userDetails} = useAuthState()
  const [error, setError] = useState('')
  const handleEdition = () => {
    navigate('/edit-user/'+user._id)
  }
  const handleDeletion =async () => {
    const deletionResponse = await deleteUser(dispatch, user._id, token, userDetails)
    
    if (deletionResponse?.acknowledged) {
      setError('')
      navigate(0)
    }
    if(deletionResponse?.error?.length > 0) setError(deletionResponse.error.name)
    else setError('!')
  }
  return (
    <ListItem key={user._id} sx={{display: 'flex'}}>
      <ListItemButton sx={{ flexBasis: '90%' }} onClick={handleEdition} disabled={userDetails?.role !== 'administrator'}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText sx={{ fontSize: '2rem' }} primary={user.email} />
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

export default UserItemComp;
