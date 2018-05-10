import {UPDATE_POSITION, SET_CURRENT_PLACE, SET_PLACE_FROM, SET_PLACE_TO} from '../actions/types'

//initial values
const initialState = {
	user_location:{
		longitude: 0,
		latitude: 0,
		latitudeDelta: 0.000008,
		longitudeDelta: 0.000008
	},
	search_location_from:{
		longitude: 0,
		latitude: 0,
		name: '',
	},
	search_location_to:{
		longitude: 0,
		latitude: 0,
		name: '',
	},
	mapType:'standard',
}

export default function authReducer(state = initialState, action){
	switch(action.type){
		case UPDATE_POSITION:{
			return{
				...state,
				user_location: {
					longitude: action.position.longitude,
					latitude: action.position.latitude,
					latitudeDelta: 0.000008,
					longitudeDelta: 0.000008
				}
			}
		}break;

		case SET_PLACE_FROM:{
			return{
				...state,
				search_location_from: {
					longitude: action.place.longitude,
					latitude: action.place.latitude,
					name: action.place.name
				}
			}
		}break;

		case SET_PLACE_TO:{
			return{
				...state,
				search_location_to: {
					longitude: action.place.longitude,
					latitude: action.place.latitude,
					name: action.place.name
				}
			}
		}break;

		default: return state
	}
}	