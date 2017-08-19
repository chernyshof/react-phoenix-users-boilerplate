import { types as errorTypes } from 'actions/errors';

const initialState = {
  errors: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case errorTypes.NEW_ERROR:
      return {
        ...state,
        errors: [...state.errors, action.message],
      };
    default:
      return state;
  }
}
