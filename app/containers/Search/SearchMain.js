import React, { Component } from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';
import {Text, Button, Container, Header, Content, Left, Right, Footer, Tabs, Icon} from 'native-base';
//REDUX
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../../actions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class SearchMain extends Component {
  
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <FontAwesome name="search" style={{fontSize: 22, color: tintColor}}/>
    ),
    drawerLockMode: 'locked-closed'
  }

  render() {
    return (
      <Container>
    	<Content>
    		<Text>Search</Text>
    	</Content>
      </Container>
    );
  }
}


//PROPS
const mapStateToProps = state => ({
  state: state
});
 
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(SearchMain);