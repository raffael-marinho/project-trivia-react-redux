import { combineReducers } from 'redux';
import userReducer from './userReducer';
import token from './tokenReducer';

const rootReducer = combineReducers({ userReducer, token });

export default rootReducer;
