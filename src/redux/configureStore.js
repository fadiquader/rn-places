import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import {AsyncStorage} from "react-native";
//
import storesReducer from './reducers/stores';
import authReducer from './reducers/auth';
import NavigationService from '../navigator/NavigationService';

import { SET_USER, TRY_AUTH } from './actions/actionTypes';

const key = 'AIzaSyCKmOY7WhCgmp-SoxfeBXHSPvhXlqCHS5k';

const refreshTokenURL = `https://securetoken.googleapis.com/v1/token?key=${key}`;

const rootReducer = combineReducers({
  stores: storesReducer,
  auth: authReducer
});

let composeEnhancers = compose;

if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
const configureStore = () => {
    return createStore(rootReducer, compose(applyMiddleware(thunk,)));
};

export default configureStore;
