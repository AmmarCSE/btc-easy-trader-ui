import { combineReducers } from 'redux';
import {positionsReducer} from './positions/reducers';

export default function createReducer(asyncReducers) {
  return combineReducers({
    positions: positionsReducer,
    ...asyncReducers
  });
}
