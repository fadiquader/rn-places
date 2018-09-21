import { AsyncStorage } from 'react-native';
import axios from 'axios';
//
import { TRY_AUTH, LOADING_AUTH, SET_USER } from '../actions/actionTypes';
import NavigationService from '../../navigator/NavigationService';

const key = 'AIzaSyCKmOY7WhCgmp-SoxfeBXHSPvhXlqCHS5k';
// const signinURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=AIzaSyCKmOY7WhCgmp-SoxfeBXHSPvhXlqCHS5k'
const signinURL = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${key}`;
// https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=[API_KEY]
const signupURL = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${key}`;

const refreshTokenURL = `https://securetoken.googleapis.com/v1/token?key=${key}`;

const expiryDate = () => {
  const now = new Date();
  return  now.getTime() + 2 * 1000;
};
export function tryAuth(isLanunch=false, Navigation) {
  return async dispatch => {
    return new Promise(async (resolve, reject) => {
      const navigation =  NavigationService.navigation ? NavigationService : Navigation;
      try {
        const [
          idToken,
          refreshToken,
          expDate
        ] = await Promise.all([
          AsyncStorage.getItem('@auth:token'),
          AsyncStorage.getItem('@auth:refreshToken'),
          AsyncStorage.getItem('@auth:expiryDate')
        ]);
        const parsedDate = new Date(parseInt(expDate));
        const now = new Date();
        if(!idToken) {
          throw new Error('Token is not provided')
        }
        if(parsedDate < now)  {
          const res = await axios.post(refreshTokenURL,
            `grant_type=refresh_token&refresh_token=${refreshToken}`, {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
            });
          const now = new Date();
          const expDate = now.getTime() + 2 * 1000;
          const data = {
            idToken: res.data.id_token,
            refreshToken: res.data.refresh_token,
            expiryDate: expDate

          };
          await Promise.all([
            AsyncStorage.setItem('@auth:token', data.idToken),
            AsyncStorage.setItem('@auth:refreshToken', data.refreshToken),
            AsyncStorage.setItem('@auth:expiryDate', data.expiryDate.toString()),
          ]);
          dispatch({
            type: SET_USER,
            payload: data
          });
          if(isLanunch) {
            navigation.navigate('App')
          }
        }
        else {
          if(isLanunch) {
            navigation.navigate('App')
          }
        }
        resolve();
      } catch (err) {
        console.log('Caught an exception!', err.response);
        await AsyncStorage.clear();
        navigation.navigate('Auth');
        reject();
      }
    })
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
      await AsyncStorage.setItem('@auth:refreshToken', res.data.refreshToken);
      await AsyncStorage.setItem('@auth:expiryDate', expDate.toString());
      res.data.expiryDate = expDate;
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
      await AsyncStorage.setItem('@auth:refreshToken', res.data.refreshToken);
      await AsyncStorage.setItem('@auth:expiryDate', expDate.toString());
      res.data.expiryDate = expDate;
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
