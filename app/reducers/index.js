import {Routes} from '../config/routes';
import { combineReducers } from 'redux';

//reducers
import auth from './auth';
import location from './location';
import meetups from './meetups';
import friends from './friends';
import settings from './settings';

const AppNavigator = Routes;

const navReducer = (state, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  return nextState || state;
};


const rootReducer = combineReducers({
	nav: navReducer,
	auth,
	location,
	meetups,
	friends,
	settings
})

export default rootReducer;