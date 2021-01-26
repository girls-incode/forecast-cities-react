import { combineReducers } from 'redux';
import appReducer from './appReducer';
import apiReducer from './apiReducer';
import homeReducer from './homeReducer';

const rootReducer = combineReducers({
    appReducer,
    apiReducer,
    homeReducer
});

export default rootReducer;