import * as types from './types';
import firebaseApp from '../config/firebase';
import * as firebase from 'firebase';
import {ToastAndroid} from 'react-native';

export function updateMapStyle(data){
	return (dispatch) => {
		dispatch({
			type: types.UPDATE_MAPSTYLE,
		    data,
		});
	}
}
