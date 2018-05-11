import * as auth from './auth';
import * as account from './account';
import * as location from './location';
import * as meetups from './meetups';
import * as friends from './friends';
import * as settings from './settings';

export const ActionCreators = Object.assign({}, 
	auth,
	account,
	location,
	meetups,
	friends,
	settings
);