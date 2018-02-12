import React, { Component } from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';
import {Text, Button, Container, Header, Content, Left, Right, Footer, Tabs, Icon} from 'native-base';


class Home extends Component {
  render() {
    return (
      <Container>
    	<Header>
    		
    	</Header>
    	<Content>
    		<Button iconLeft full danger onPress={()=>this.props.actions.func_googleSignout()}>
    			<Icon name="home"/>
    			<Text>Logout</Text>
    		</Button>
    	</Content>
    	<Footer>

    	</Footer>
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