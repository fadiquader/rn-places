import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
//
import storesReducer from './reducers/stores';

const rootReducer = combineReducers({
  stores: storesReducer
});

let composeEnhancers = compose;

if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
    return createStore(rootReducer, compose(applyMiddleware(thunk)));
};

export default configureStore;
