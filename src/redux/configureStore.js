import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
//
import storesReducer from './reducers/stores';
import authReducer from './reducers/auth';
import {AsyncStorage} from "react-native";

const rootReducer = combineReducers({
  stores: storesReducer,
  auth: authReducer
});

let composeEnhancers = compose;

if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const authMiddleWare =  store => next => async action => {
  try {
    const idToken = await AsyncStorage.getItem('@auth:token');
    const expDate = await AsyncStorage.setItem('@auth:expiryDate');
    const parsedDate = new Date(parseInt(expDate));
    const now = new Date();
    if(expDate > now) {

    } else {

    }
  } catch (e) {

  }
}

const configureStore = () => {
    return createStore(rootReducer, compose(applyMiddleware(thunk)));
};

export default configureStore;
