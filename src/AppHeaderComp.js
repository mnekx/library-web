import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { logout } from "./contexts/auth/auth-actions";
import { useAuthDispatch } from "./contexts/auth/auth-context";
import { useNavigate} from 'react-router-dom'

export default function AppHeaderComp() {
  const dispatch = useAuthDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    logout(dispatch)
    navigate('/login')
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Books Library
          </Typography>
          <Button color="inherit" onClick={() => navigate('/add-user')}>NEW USER</Button>
          <Button color="inherit" onClick={() => navigate('/add-book')}>NEW BOOK</Button>
          <Button color="inherit" onClick={() => navigate('/users')}>USERS</Button>
          <Button color="inherit" onClick={() => navigate('/books')}>BOOKS</Button>
          <Button color="inherit" onClick={handleLogout}>LOGOUT</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}