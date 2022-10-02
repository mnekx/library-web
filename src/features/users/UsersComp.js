import { useEffect } from 'react';
import {
  useUsersDispatchContext,
  useUsersStateContext,
} from '../../contexts/users/users-context';
import UserItemComp from './UserItemComp';
import { getUsers } from '../../contexts/users/users-actions';
import { useAuthState } from '../../contexts/auth/auth-context';

import List from '@mui/material/List';
import Fab from '@mui/material/Fab';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
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

const UsersComp = () => {
  const dispatch = useUsersDispatchContext();
  const { token } = useAuthState();
  const context = useUsersStateContext();
  useEffect(() => {
    getUsers(dispatch, token);
  }, [dispatch, token]);
  return (
    <><List
      subheader={
        <ListSubheader component='div' id='nested-list-subheader'>
          <Typography
            sx={{ fontSize: '1.5rem', marginTop: '1rem', textAlign: 'start' }}
            variant='h3'
            component='h3'
          >
            Users
          </Typography>
          ;
        </ListSubheader>
      }
      sx={{ width: '100%', bgcolor: 'background.paper', height: '90vh' }}
      component='nav'
      aria-labelledby='nested-list-subheader'
    >
      {context?.users.map((user) => {
        return <UserItemComp user={user} key={user._id}/>;
      })}
      
    </List><StyledFab color='secondary' aria-label='add'>
        {/* <AddIcon/> */}
        <Link href='add-user' sx={{ color: 'whitesmoke' }}>
          <PersonAddAltIcon />{' '}
        </Link>
      </StyledFab></>
  );
};

export default UsersComp;
