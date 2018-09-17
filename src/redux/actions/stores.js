import axios from 'axios';
import {ADD_STORE, DELETE_STORE} from './actionTypes';
import { DB_URL } from '../../utils/contants';

export const addStore = (storeName, location, image) => {
  return async dispatch => {
    try {
      const res = await axios.post(`${DB_URL}/places.json`, {
        storeName,
        location,
        // image
      });
    } catch (e) {
      alert(`Error: ${e.message}`)
    }

  };
  //
  // return {
  //   type: ADD_STORE,
  //   storeName,
  //   location,
  //   image
  // };
};

export const deleteStore = (key) => {
  return {
    type: DELETE_STORE,
    storeKey: key
  };
};
