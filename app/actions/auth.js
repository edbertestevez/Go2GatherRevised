import * as types from './types';

export function func_googleSignin(){
  return (dispatch) => {
    GoogleSignin.signIn()
          .then((user) => {
            dispatch(loginChecking(true));
            console.log(user);
            const credential = firebase.auth.GoogleAuthProvider.credential(user.idToken, user.accessToken);
            console.log(credential)
            return firebase.auth().signInWithCredential(credential);
            //Loading progress
          })
          .then((currentUser)=>{
            //INSERT RECORD SA FIREBASE
            console.log("CURRENT_USER",currentUser)
            let phone;
            if(currentUser.phoneNumber==null){
              phone="Not Available";
            }else{
              phone = currentUser.phoneNumber;
            }
            firebase.database().ref("/users").once('value', function(snapshot){
              //if(!snapshot.hasChild(currentUser.uid)){
                firebase.database().ref("/users/"+currentUser.uid).set({
                  name: currentUser.displayName,
                  email: currentUser.email,
                  photo: currentUser.photoURL,
                  phone: phone,
                  location:{
                    longitude:0,
                    latitude:0,
                  }
                })
              //}
              
            });
            console.log(currentUser);
            dispatch(loginChecking(false));
          })
          //.then(dispatch(loginUser()))
          .catch((err) => {
            dispatch(loginChecking(false));
            console.log('WRONG SIGNIN', err);
          })
          .done();
    }

}

function loginChecking(condition){
  return{
    type: types.CHECK_LOGIN,
    condition
  }
}