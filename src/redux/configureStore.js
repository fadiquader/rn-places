import { createStore, combineReducers, compose } from 'redux';
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
    return createStore(rootReducer, composeEnhancers());
};

export default configureStore;
