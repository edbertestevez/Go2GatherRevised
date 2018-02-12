import React, { Component } from 'react';
import {Text, TextInput, Image, View, StyleSheet, TouchableOpacity, AsyncStorage, BackHandler} from 'react-native';
//import Icon from "react-native-vector-icons/Zocial";
import ResponsiveImage from 'react-native-responsive-image';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
//NAVIGATION
import { StackNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation'
//STYLE
import styles from '../styles/styles';
//COMPONENTS
import LoginOptions from '../components/LoginOptions';
//REDUX
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../actions'
import * as firebase from 'firebase';
import {Spinner, Icon} from 'native-base';

class LoginScreen extends Component {

componentWillMount(){
    GoogleSignin.configure({
        //iosClientId: "<FROM DEVELOPER CONSOLE>", // only for iOS
        webClientId: "206519716919-v93fl7b6pupffparflkjqpl7f77hpr4h.apps.googleusercontent.com",
      })
  }
  

render(){
  
  var loader = <View>
    <Spinner color='#00aaaa' style={{marginTop:-24}}/>
      <Text style={{color: 'white', fontSize:12, marginTop:-15}}>Logging in account . . </Text>
    </View>
  

  return(
		<View style={styles.mainContainer}>
	    	
        <ResponsiveImage source={require('../img/logo.png')} initWidth="380" initHeight="380"/>
 		  	<Text style={styles.logoname}>Go2Gather</Text>
 		  	 
        <LoginOptions
        	googleSignin = {()=>this.props.actions.func_googleSignin()}
        	fbSignin = {()=>this.props.navigation.navigate('Sample')}
        />

        {this.props.state.auth.isCheckingAccount ? loader : null}

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}> &#9400; All Rights Reserved</Text>
          <Text style={styles.footerText}> DecypherApps</Text>
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

export default connect(mapStateToProps,mapDispatchToProps)(LoginScreen);