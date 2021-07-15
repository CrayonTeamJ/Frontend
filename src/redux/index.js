import { combineReducers } from 'redux';
// 만들어낼 state의 action & reducer import
import users from './users';

const rootReducer = combineReducers({
  // 추가하기
  users,
});

export default rootReducer;
