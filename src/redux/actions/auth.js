import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { TRY_AUTH, LOADING_AUTH, SET_USER } from '../actions/actionTypes';

const key = 'AIzaSyCKmOY7WhCgmp-SoxfeBXHSPvhXlqCHS5k';
// const signinURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=AIzaSyCKmOY7WhCgmp-SoxfeBXHSPvhXlqCHS5k'
const signinURL = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${key}`;
// https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=[API_KEY]
const signupURL = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${key}`;

const EXPIES_IN = 24;

const expiryDate = (expIn) => {
  const now = new Date();
  const expDate = now.getTime() + EXPIES_IN * 1000;
  return expDate;
}
export function tryAuth(navigation) {
  return async dispatch => {
    try {
      const idToken = await AsyncStorage.getItem('@auth:token');
      if(idToken) {
        dispatch({
          type: SET_USER,
          payload: {
            idToken
          },
        })
        navigation.navigate('App')
      } else {
        navigation.navigate('Auth')
      }
    } catch (e) {
      navigation.navigate('Auth')
    }
  }
}

export function authSignIn({ email, password, navigation }) {
  return async dispatch => {
    try {
      dispatch({
        type: LOADING_AUTH,
        payload: true,
      });
      const res = await axios.post(signinURL, {
        email,
        password,
        returnSecureToken: true,
      }, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
        }
      });
      const expDate = expiryDate();
      await AsyncStorage.setItem('@auth:token', res.data.idToken);
      await AsyncStorage.setItem('@auth:expiryDate', expDate);
      dispatch({
        type: SET_USER,
        payload: res.data,
      })
      navigation.navigate('App')
    } catch (err) {
      alert(err.message)
    } finally {
      dispatch({
        type: LOADING_AUTH,
        payload: false,
      });
    }
  }
}

export const authSignup = ({ email, password }) => {
  return async dispatch => {
    try {
      dispatch({
        type: LOADING_AUTH,
        payload: true,
      });
      const res = await axios.post(signupURL, {
        email, password,
        returnSecureToken: true,
      }, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
        }
      });
      const expDate = expiryDate();
      await AsyncStorage.setItem('@auth:token', res.data.idToken);
      await AsyncStorage.setItem('@auth:expiryDate', expDate);
      dispatch({
        type: SET_USER,
        payload: res.data,
      })
    } catch (e) {
      alert(e.message)
    } finally {
      dispatch({
        type: LOADING_AUTH,
        payload: true,
      });
    }
  }
}
