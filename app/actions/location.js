import * as types from './types';
import firebaseApp from '../config/firebase';
import * as firebase from 'firebase';
import {ToastAndroid} from 'react-native';
import RNGooglePlaces from 'react-native-google-places';

export function updateLocation(position){
	return (dispatch) => {
		dispatch({
			type: types.UPDATE_POSITION,
		    position
		});
	}
}

export function searchPlaceFrom(initialPosition){
	return (dispatch) => {
		RNGooglePlaces.openAutocompleteModal({
	      // country: "PH",
	      latitude: initialPosition.latitude,
	      longitude: initialPosition.longitude,
	      radius: 50
	    })
	      .then((place) => {
	      	console.log(place)
	        dispatch({
	        	type:types.SET_PLACE_FROM,
	        	place
	        });
	      console.log(place);
	      })
	      .catch(error => {
	        alert("Direction not available");
	        console.log(error.message);
	      })
	}
}

export function searchPlaceTo(initialPosition){
	return (dispatch) => {
		RNGooglePlaces.openAutocompleteModal({
	      // country: "PH",
	      latitude: initialPosition.latitude,
	      longitude: initialPosition.longitude,
	      radius: 50
	    })
	      .then((place) => {
	      	console.log(place)
	        dispatch({
	        	type:types.SET_PLACE_TO,
	        	place
	        });
	      console.log(place);
	      })
	      .catch(error => {
	        alert("Direction not available");
	        console.log(error.message);
	      })
	}
}
