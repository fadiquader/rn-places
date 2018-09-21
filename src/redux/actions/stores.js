import axios from 'axios';
import {ADD_STORE, DELETE_STORE, SET_STORES} from './actionTypes';
import { DB_URL } from '../../utils/contants';
import { tryAuth } from "./auth";

export const addStore = (storeName, location, image) => {
  return async (dispatch, getState) => {
    await dispatch(tryAuth());
    const idToken = getState().auth.user.idToken;
    try {
      const imgRes = await axios.post('https://us-central1-unwomen-6da62.cloudfunctions.net/storeImage', {
        image: image.base64
      }, {
        headers: {
          'Authorization': `Bearer ${idToken}`
        }
      });
      const res = await axios.post(`${DB_URL}/places.json?auth=${idToken}`, {
        storeName,
        location,
        image: imgRes.data.imageURL
      });
      dispatch({
        type: ADD_STORE,
        storeName,
        location,
        image: imgRes.data.imageURL
      })
      // console.log('res ', res)
    } catch (e) {
      // alert(`Error: ${e.message}`)
    }

  };
  //
};

export const deleteStore = (key) => {
  return {
    type: DELETE_STORE,
    storeKey: key
  };
};


export const getStores = () => {
  return async (dispatch, getState) => {
    const idToken = getState().auth.user.idToken;
    try {
      const res = await axios.get(`${DB_URL}/places.json?auth=${idToken}`);
      const data = res.data && Object.keys(res.data).map(key => res.data[key]);
      dispatch({
        type: SET_STORES,
        payload: data || [],
      })
    } catch (e) {
      // alert(e.message)
    }
  }
}
