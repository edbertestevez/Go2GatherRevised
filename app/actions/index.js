import * as auth from './auth';
import * as account from './account';
import * as location from './location';
import * as meetups from './meetups';
import * as friends from './friends';

export const ActionCreators = Object.assign({}, 
	auth,
	account,
	location,
	meetups,
	friends
);