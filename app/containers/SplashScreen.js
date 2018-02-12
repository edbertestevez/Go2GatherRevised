import React, { Component } from 'react';
import {View, Text, ToastAndroid} from "react-native";
import { NavigationActions } from 'react-navigation';
//REDUX
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../actions'
import { BackHandler } from "react-native";
//STYLE
import styles from '../styles/styles';
//FIREBASE
import firebaseApp from '../config/firebase';
import * as firebase from 'firebase';
import {GoogleSignin} from 'react-native-google-signin';
import ResponsiveImage from 'react-native-responsive-image';
import {Spinner} from 'native-base';

class SplashScreen extends Component {
	checkLogged(action){
		const that = this;
		const { navigate } = this.props.navigation;
		console.log("Checking if logged in . . .");
		let route;
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				firebase.database().ref("/users/"+user.uid).once('value', (snapshot) => {
					if(snapshot.exists()){
						var user_name = snapshot.child("name").val();
						action.updateAccount(snapshot.key,snapshot.val());
						console.log('user logged');
						// //DRAWER INSTEAD OF HOME KAY AMO MANA ANG IYA DEFAULT STACK SA DRAWER ANG HOME
						// route="HomeMain";
						// setTimeout(()=>{navigate(route),ToastAndroid.show("Welcome, "+user_name+"!",ToastAndroid.SHORT)}, 1500);
						console.log('not logged');
		      	route="Login";
		      	setTimeout(()=>navigate(route), 1000);
					}
				})

				firebase.database().ref("/users/"+user.uid).on('child_changed', (snapshot) => {
					firebase.database().ref("/users/"+user.uid).once('value', (snapshot) => {
						action.updateAccount(snapshot.key,snapshot.val());
					})
				})
					
				
		    }else{
		      	console.log('not logged');
		      	route="Login";
		      	setTimeout(()=>navigate(route), 1000);
		    }
		});
	}

	componentWillMount(){
		console.log("SPLASH NAVIGATION ROUTES", this.props.state.nav)
		setTimeout(()=>this.checkLogged(this.props.actions), 1000);
		
		GoogleSignin.configure({
	      //iosClientId: "<FROM DEVELOPER CONSOLE>", // only for iOS
	      webClientId: "206519716919-v93fl7b6pupffparflkjqpl7f77hpr4h.apps.googleusercontent.com",
	    })
	}
	

	render(){
		return(
			<View style={{flex:1, backgroundColor: '#033031', alignItems:'center'}}>
				<ResponsiveImage source={require('../img/logo.png')} style={{marginTop: 25}} initWidth="350" initHeight="350"/>
				<Text style={styles.logoname}>Go2Gather</Text>
				<Text style={styles.subTitle}>Meetups made easier</Text>
				<Spinner color='#00aaaa' />
				<Text style={{color: 'white', fontSize:12, marginTop:-15}}>Verifying Account</Text>

				<View style={styles.footerContainer}>
					<Text style={styles.footerText}>All Rights Reserved 2018</Text>
					<Text style={styles.footerName}>Decypher Apps</Text>
				</View>
			</View>
		)
	}
}

//PROPS
const mapStateToProps = state => ({
  state: state
});
 
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(SplashScreen);