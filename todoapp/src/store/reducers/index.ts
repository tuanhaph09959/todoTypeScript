import {combineReducers} from 'redux';
import Todo from './TodoReducer';

const reducers = combineReducers({
  TODO: Todo,
});

export default (state: any, action: any) => reducers(state, action);
