import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useAppDispatch } from 'app/hooks';
import { authActions } from 'features/auth/authSlice';

export function Header() {
  const dispatch = useAppDispatch();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Student Management
          </Typography>
          <Button color='inherit' onClick={() => dispatch(authActions.logout())}>
            Log out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
