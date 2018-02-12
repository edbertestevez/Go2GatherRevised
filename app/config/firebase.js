//FIREBASE
import * as firebase from 'firebase';

const firebaseConfig = {
	apiKey: "AIzaSyAkIk_OaketRhFpKZmMSyvI9uTwVE6ZTfo",
    authDomain: "go2gather-7836c.firebaseapp.com",
    databaseURL: "https://go2gather-7836c.firebaseio.com",
    projectId: "go2gather-7836c",
    storageBucket: "go2gather-7836c.appspot.com",
    messagingSenderId: "206519716919"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp;