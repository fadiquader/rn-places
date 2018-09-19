import {
  LOADING_AUTH,
  SET_USER
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  user: {
    email: '',
    idToken: '',
    localId: '',
    refreshToken: ''
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_AUTH:
      return {
        ...state,
        loading: action.payload
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      }
    default:
      return state;
  }
};

export default reducer;
