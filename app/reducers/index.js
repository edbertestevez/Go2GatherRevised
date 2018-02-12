import {Routes} from '../config/routes';
import { combineReducers } from 'redux';

//reducers
import auth from './auth';

const AppNavigator = Routes;

const navReducer = (state, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  return nextState || state;
};


const rootReducer = combineReducers({
	nav: navReducer,
	auth
})

export default rootReducer;