import {UPDATE_MAPSTYLE} from '../actions/types';

//initial values
const initialState = {
	mapStyle: 'standard'
}

export default function accountReducer(state = initialState, action){
	switch(action.type){
		case UPDATE_MAPSTYLE:{
			return{
				...state,
				mapStyle: action.data
			}
		}break;

		default: return state
	}
}	