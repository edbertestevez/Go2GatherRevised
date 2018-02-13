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

class Home extends Component {
  
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="home" style={{fontSize: 26, color: tintColor}}/>
    ),
    drawerLockMode: 'locked-closed'
  }

  render() {
    return (
      <Container>
    	<Content>
    		<Button iconLeft full danger onPress={()=>this.props.actions.func_googleSignout()}>
    			<Icon name="home"/>
    			<Text>Logout</Text>
    		</Button>
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

export default connect(mapStateToProps,mapDispatchToProps)(Home);