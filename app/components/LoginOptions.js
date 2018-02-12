import React, {Component} from 'react'
import { TouchableOpacity, View, Text, ToastAndroid } from 'react-native'
import PropTypes from 'prop-types';
import Icon from "react-native-vector-icons/Zocial";
import styles from '../styles/styles';
import {Button} from 'native-base';

class LoginOptions extends Component {
	render(){
		return(
			<View>
				{/*GOOGLE PLUS*/}
		        <Button iconLeft rounded style={[styles.optionButton,styles.bgRed]} onPress={this.props.googleSignin}>
		         	<Icon name="googleplus" style={styles.optionButtonIcon} size={30}/>
		            <Text style={styles.optionButtonText}>Sign in with Google+</Text>  
		        </Button>

		        {/*FACEBOOK*/}
		        <Button iconLeft rounded style={[styles.optionButton,styles.bgBlue]} onPress={this.props.googleSignin}>
		         	<Icon name="facebook" style={styles.optionButtonIcon} size={30}/>
		            <Text style={styles.optionButtonText}>Login with Facebook</Text>  
		        </Button>
	        </View>
		);
	}
	
}

LoginOptions.propTypes = {
  googleSignin: PropTypes.func,
  fbSignin: PropTypes.func
};


export default LoginOptions;