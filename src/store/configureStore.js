import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createReducer from '../rootReducer';

export function configureStore(initialState) {
  const store = createStore(
    createReducer(),
    initialState,
    applyMiddleware(thunkMiddleware)
  )

  store.asyncReducers = {};

  return store
}

export function injectAsyncReducer(store, name, asyncReducer) {
  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
}
