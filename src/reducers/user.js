// Esse reducer será responsável por tratar as informações da pessoa usuária
import { UPDATE_USER_EMAIL } from '../actions';

export const INITIAL_USER_STATE = {
  email: '',
};

export const user = (state = INITIAL_USER_STATE, action) => {
  switch (action.type) {
  case UPDATE_USER_EMAIL:
    return {
      ...state,
      email: action.state,
    };
  default:
    return state;
  }
};
