import {CHECK_LOGIN} from '../actions/types'

//initial values
const initialState = {
	isCheckingAccount: false,
}

export default function authReducer(state = initialState, action){
	switch(action.type){
		case CHECK_LOGIN:{
			return{
				...state,
				isCheckingAccount: action.condition
			}
		}break;

		default: return state
	}
}	