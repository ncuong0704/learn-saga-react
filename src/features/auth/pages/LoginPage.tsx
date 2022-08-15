import { Box, Button, CircularProgress, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import * as React from 'react';
import { authActions } from '../authSlice';

const useStyles: any = makeStyles((theme: any) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f3f3f3',
  },
  box: {
    padding: '24px',
    backgroundColor: '#ffffff',
  },
}));

export default function LoginPage() {
  const classes = useStyles();

  const dispatch = useAppDispatch();
  const isLogging = useAppSelector((state) => state.auth.logging);

  const handleLoginClick = () => {
    // TODO: get username + pwd from login form
    dispatch(
      authActions.login({
        username: '',
        password: '',
      })
    );
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.box}>
        <Typography variant='h5'>Student Management</Typography>
        <Box mt={4}>
          <Button fullWidth variant='contained' color='primary' onClick={handleLoginClick}>
            {isLogging &&  <CircularProgress />}
            Fake Login
          </Button>
        </Box>
      </Paper>
    </div>
  );
}
