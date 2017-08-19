import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as form } from 'redux-form';

import session from 'reducers/session';
import errors from 'reducers/errors';
import { types as sessionTypes } from 'actions/session';

const appReducer = combineReducers({
  form,
  session,
  errors,
  routing: routerReducer,
});

export default function (state, action) {
  if (action.type === sessionTypes.LOGOUT) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
}

