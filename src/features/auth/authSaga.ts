import { PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { call, delay, fork, put, take } from 'redux-saga/effects';
import { authActions, LoginPayload } from './authSlice';

function* handleLogin(payload: LoginPayload) {
  try {
    yield delay(1000);
    console.log('login')
    localStorage.setItem('access_token', 'fake_token');
    yield put(
      authActions.loginSuccess({
        id: 1,
        name: 'Easy Frontend',
      })
    );
  } catch (error) {
    yield put(authActions.loginFailed("error"));
  }

  //   redirect to admin page
  yield put(push("/admin/dashboard"))
}

function* handleLogout() {
  yield delay(500);
  console.log('handle logout');
  localStorage.removeItem('access_token');

  //   redirect to login page
  yield put(push("/login"))
}

function* watchLoginFlow() {
  while (true) {
    console.log('watch login flow');
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));
    // login
    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
      yield fork(handleLogin, action.payload);
    }

    // logout
    yield take(authActions.logout.type);
    yield call(handleLogout);
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}
