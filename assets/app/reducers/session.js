import { types as sessionTypes } from 'actions/session';

const initialState = {
  isAuthenticated: false,
  willAuthenticate: true,
  currentUser: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case sessionTypes.LOGIN_REQUEST:
      return {
        ...state,
        willAuthenticate: true,
      };
    case sessionTypes.SIGNUP_REQUEST:
      return {
        ...state,
        willAuthenticate: true,
      };
    case sessionTypes.AUTHENTICATION_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        willAuthenticate: false,
        currentUser: action.response.data,
      };
    case sessionTypes.AUTHENTICATION_FAILURE:
      return {
        ...state,
        willAuthenticate: false,
      };
    case sessionTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        willAuthenticate: false,
        currentUser: {},
      };
    default:
      return state;
  }
}
