import React, { Component } from 'react';

import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {Text, Button, Container, Header, Content, Left, Right, Footer, Tabs, Icon} from 'native-base';
//REDUX
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../../actions';
import styles from '../../styles/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MeetupBadge from '../../components/MeetupBadge';
import FriendRequestBadge from '../../components/FriendRequestBadge';
class Profile extends Component {
  
  static navigationOptions = ({navigation}) => {
    const { state, setParams, navigate } = navigation;
    return{
      headerLeft: <Image source={require('../../img/logo.png')} style={styles.headerLogo}/>,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#1b5454'
      },
      tabBarOptions: {
        showLabel: true
      },
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="md-person" style={{fontSize: 26, color: tintColor}}/>
      ),
      headerTitle: <Text style={styles.headerTitle}>Profile</Text>,
      headerRight: 
      <View style={[styles.horizontalView, styles.alignCenter, {marginRight:5}]}>
        <TouchableOpacity style={styles.headerRightLogo} onPress={()=>navigate("MeetupRequests")}>
          <MaterialCommunityIcons name="map-marker-plus" color="white" size={27}/>
          <MeetupBadge/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.headerRightLogo}  onPress={()=>navigate("FriendRequests")}>
          <MaterialIcons name="person-add" color="white" size={28}/>
          <FriendRequestBadge/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.headerRightLogo}>
          <Ionicons name="md-settings" color="white" size={27}
          onPress={()=>alert("Settings")}/>
        </TouchableOpacity>
       
      </View>,
      drawerLockMode: 'locked-closed'
    }
  }

  render() {
    return (
      <Container>
    	<Content>
    		<Text>Profile</Text>
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

export default connect(mapStateToProps,mapDispatchToProps)(Profile);