import * as types from './types';
import {GoogleSignin} from 'react-native-google-signin';
import firebaseApp from '../config/firebase';
import * as firebase from 'firebase';
import {ToastAndroid} from 'react-native';

export function updateAccount(key, data){
	console.log("Retrieving account info. . ");
	return (dispatch) => {
		dispatch({
			type: types.UPDATE_ACCOUNT,
		    data,
		    key
		});
	}
}
