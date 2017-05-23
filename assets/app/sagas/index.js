import { fork } from 'redux-saga/effects';
import Session from 'sagas/session';

const sagas = [
  ...Session,
];

export default function* root() {
  yield sagas.map(saga => fork(saga));
}
