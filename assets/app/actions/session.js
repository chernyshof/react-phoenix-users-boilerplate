export const types = {
  LOGIN_REQUEST: 'SESSION/LOGIN_REQUEST',
  SIGNUP_REQUEST: 'SESSION/SIGNUP_REQUEST',
  LOGOUT: 'SESSION/LOGOUT',
  AUTHENTICATION_REQUEST: 'SESSION/AUTHENTICATION_REQUEST',
  AUTHENTICATION_SUCCESS: 'SESSION/AUTHENTICATION_SUCCESS',
  AUTHENTICATION_FAILURE: 'SESSION/AUTHENTICATION_FAILURE',
};

export const login = data => ({ type: types.LOGIN_REQUEST, data });
export const signup = data => ({ type: types.SIGNUP_REQUEST, data });
export const logout = () => ({ type: types.LOGOUT });
export const authenticate = () => ({ type: types.AUTHENTICATION_REQUEST });
export const unauthenticate = () => ({ type: types.AUTHENTICATION_FAILURE });
