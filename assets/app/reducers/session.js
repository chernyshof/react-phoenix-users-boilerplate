import { types as sessionTypes } from 'actions/session';

const initialState = {
  isAuthenticated: false,
  willAuthenticate: true,
  submittingForm: false,
  currentUser: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case sessionTypes.LOGIN_REQUEST:
      return {
        ...state,
        submittingForm: true,
      };
    case sessionTypes.SIGNUP_REQUEST:
      return {
        ...state,
        submittingForm: true,
      };
    case sessionTypes.AUTHENTICATION_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        willAuthenticate: false,
        submittingForm: false,
        currentUser: action.response.data,
      };
    case sessionTypes.AUTHENTICATION_FAILURE:
      return {
        ...state,
        willAuthenticate: false,
        submittingForm: false,
      };
    case sessionTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        willAuthenticate: false,
        submittingForm: false,
        currentUser: {},
      };
    default:
      return state;
  }
}
