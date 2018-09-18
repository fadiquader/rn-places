import {
  ADD_STORE,
  DELETE_STORE,
  SET_STORES
} from '../actions/actionTypes';

const initialState = {
  stores: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_STORE:
      return {
        ...state,
        stores: state.stores.concat({
          key: Math.random(),
          name: action.storeName,
          image: action.image,
          location: action.location,
        })
      };
    case DELETE_STORE:
      return {
        ...state,
        stores: state.stores.filter(store => {
          return store.key !== action.storeKey;
        })
      };
    case SET_STORES:
      return {
        ...state,
        stores: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
