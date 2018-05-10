import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text
} from 'react-native';
//custom styles
import styles from '../styles/styles';
// import { Badge } from 'native-base';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

class MeetupBadge extends Component {

	constructor(props) {
	  super(props);
	
	  this.state = {};
	 
	}

  	render() {
	    return (
		   	<View style={this.props.requests.length > 0 ? [styles.bgRed, styles.notifCount] : null}>
				<Text style={[styles.c_white, styles.font10]}>{this.props.requests.length > 0 ? this.props.requests.length : null}</Text>
			</View> 
	    );
  }
}


//PROPS
const mapStateToProps = state => ({
  requests: state.friends.friendRequests
});
 
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(MeetupBadge);