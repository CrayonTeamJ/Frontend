import { combineReducers } from 'redux';
// 만들어낼 state의 action & reducer import
import users from './users';
import status from './status';
// import videos from './videos';

const rootReducer = combineReducers({
  // 추가하기
  users,
  status,
  // videos,
});

export default rootReducer;
