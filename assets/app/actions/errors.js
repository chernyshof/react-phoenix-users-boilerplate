export const types = {
  NEW_ERROR: 'ERRORS/NEW_ERROR',
};

export const newError = message => ({ type: types.NEW_ERROR, message });
