import {UPDATE_FRIENDS_LABEL, UPDATE_FRIEND_REQUEST} from '../actions/types';

//initial values
const initialState = {
	friendsLabel:[],
	friendRequests:[],
}

export default function accountReducer(state = initialState, action){
	switch(action.type){
		case UPDATE_FRIENDS_LABEL:{
			return{
				...state,
				friendsLabel: action.array
			}
		}break;

		case UPDATE_FRIEND_REQUEST:{
			return{
				...state,
				friendRequests: action.array
			}
		}break;

		default: return state
	}
}	