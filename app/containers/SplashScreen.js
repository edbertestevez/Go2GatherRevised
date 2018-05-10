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
import ResponsiveImage from 'react-native-responsive-image';
import {Spinner} from 'native-base';
import {GoogleSignin} from 'react-native-google-signin';

class SplashScreen extends Component {
	constructor(props) {
		super(props);

		console.disableYellowBox = true;
	}

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
						setTimeout(()=>{navigate("Main"),ToastAndroid.show("Welcome, "+user_name+"!",ToastAndroid.SHORT)}, 1500);
						console.log('not logged');
					}else{
						const resetNavigation = NavigationActions.reset({
	                      index: 0,
	                      actions: [
	                        NavigationActions.navigate({
	                          routeName: 'Login'
	                        })
	                      ]
	                    });
				      	setTimeout(()=>{that.props.navigation.dispatch(resetNavigation)}, 500);
					}
				})

				firebase.database().ref("/users/"+user.uid).on('child_changed', (snapshot) => {
					firebase.database().ref("/users/"+user.uid).once('value', (snapshot) => {
						action.updateAccount(snapshot.key,snapshot.val());
					})
				})
		    }else{
		      	console.log('not logged');
		      	//console.log("DISPATCHES", that.props);
		      	const resetNavigation = NavigationActions.reset({
	                index: 0,
	                actions: [
	                    NavigationActions.navigate({
	                     	routeName: 'Login'
	                    })
	                ]
	            });
				setTimeout(()=>{that.props.navigation.dispatch(resetNavigation)}, 2000);
		    }
		});
	}

	componentWillMount(){
		//get location
	    navigator.geolocation.getCurrentPosition(
	        (position) => {
	          //console.log("POSITION",position);
	          var initialPosition = {
	            latitude: position.coords.latitude,
	            longitude: position.coords.longitude
	          }
	          this.props.actions.updateLocation(initialPosition);
	        },
	        (error) => console.log(error.message ),
	        { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
	    );

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