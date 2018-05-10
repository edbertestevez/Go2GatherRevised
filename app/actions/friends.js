import * as types from './types';
import firebaseApp from '../config/firebase';
import * as firebase from 'firebase';
import {ToastAndroid} from 'react-native';

export function loadFriendsData(user_uid){
	const friendsLabel = [];
	return(dispatch) =>{
		firebase.database().ref("/users_friends/"+user_uid).on("child_added",(snapshot)=>{
			firebase.database().ref("/users/"+snapshot.key).on("value",(dataSnap)=>{
				friendsLabel.push({
					value: snapshot.key,
					label: dataSnap.child("name").val()
				});

				dispatch(updateFriendsLabel(friendsLabel))
			});
			
		});
		firebase.database().ref("/users_friends/"+user_uid).on("child_removed",(snapshot)=>{
			var indexRemove = friendsLabel.findIndex((value)=>value.value==snapshot.key);
			console.log("Index from list", indexRemove)
			
			if(indexRemove!=-1){
				//New List of STATE
				var newList = friendsLabel;
				newList.splice(indexRemove,1)
				dispatch(updateFriendsLabel(newList))
			}
		});
	}
}

//UPDATE THIS ONE
export function loadFriendRequests(user_uid){
	const friendRequestList = [];
	return(dispatch) =>{
		firebase.database().ref("/friend_requests/"+user_uid).on("child_added",(snapshot)=>{
			console.log("FRIEND REQUEST: "+snapshot.key)
			if(snapshot.val()==true){
				firebase.database().ref("/users/"+snapshot.key).once("value",(userSnap)=>{
					requestor_key = snapshot.key;
					requestor_email = userSnap.child("email").val();
					requestor_name = userSnap.child("name").val();
					requestor_photo = userSnap.child("photo").val();

					friendRequestList.push({
						requestor_key:requestor_key,
						requestor_email:requestor_email,
						requestor_name:requestor_name,
						requestor_photo:requestor_photo
					});

					dispatch(updateFriendRequestList(friendRequestList))
				});
			}
		});

		firebase.database().ref("/friend_requests/"+user_uid).on("child_removed",(snapshot)=>{
			var indexRemove = friendRequestList.findIndex((value)=>value.requestor_key==snapshot.key);
			console.log("Index from list", indexRemove)
			
			if(indexRemove!=-1){
				//New List of STATE
				var newReqList = friendRequestList;
				newReqList.splice(indexRemove,1)
				dispatch(updateFriendRequestList(newReqList))
			}
		});
	}
}


//dispatch functions
function updateFriendsLabel(array){
	console.log("FRIENDS: ", array);
	return{
		type: types.UPDATE_FRIENDS_LABEL,
		array
	}
}

function updateFriendRequestList(array){
	console.log(array);
	return {
		type: types.UPDATE_FRIEND_REQUEST,
		array
	}
}