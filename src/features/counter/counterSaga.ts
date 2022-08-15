import { PayloadAction } from '@reduxjs/toolkit';
import { delay, put, takeEvery } from 'redux-saga/effects';
import { incrementSaga, incrementSagaSuccess } from './counterSlice';

export function* handleIncrementSaga(action: PayloadAction<number>) {
  console.log('wating 1s');
  
  yield delay(1000);
  console.log('waiting done');

  yield put(incrementSagaSuccess(action.payload));
}

export default function* counterSaga() {
  console.log('Counter Saga');

  yield takeEvery(incrementSaga.toString(), handleIncrementSaga);
}
