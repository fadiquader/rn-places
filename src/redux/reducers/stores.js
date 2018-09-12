import {
  ADD_STORE,
  DELETE_STORE
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
          image: {
            uri:
              "https://c1.staticflickr.com/5/4096/4744241983_34023bf303_b.jpg"
          }
        })
      };
    case DELETE_STORE:
      return {
        ...state,
        stores: state.stores.filter(store => {
          return store.key !== action.storeKey;
        })
      };
    default:
      return state;
  }
};

export default reducer;
