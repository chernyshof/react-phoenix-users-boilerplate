import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as form } from 'redux-form';

import session from 'reducers/session';
import { types as sessionTypes } from 'actions/session';

const appReducer = combineReducers({
  form,
  session,
  routing: routerReducer,
});

export default function (state, action) {
  if (action.type === sessionTypes.LOGOUT) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
}

