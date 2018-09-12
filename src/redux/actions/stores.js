import {ADD_STORE, DELETE_STORE} from './actionTypes';

export const addStore = storeName => {
  return {
    type: ADD_STORE,
    storeName
  };
};

export const deleteStore = (key) => {
  return {
    type: DELETE_STORE,
    storeKey: key
  };
};
