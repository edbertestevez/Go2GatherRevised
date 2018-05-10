import React, { Component } from 'react';

import {StyleSheet, View, Image, TouchableOpacity, Modal} from 'react-native';
import {Text, Button, Container, Header, Content, Left, Right, Footer, Tabs, Icon, Item, Input} from 'native-base';
//REDUX
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../../actions';
import styles from '../../styles/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MeetupBadge from '../../components/MeetupBadge';
import FriendRequestBadge from '../../components/FriendRequestBadge';
import HomeMap from './HomeMap';

class Home extends Component {
  constructor(props) {
  
    super(props);
    console.disableYellowBox = true;
    this.state = {};
  }

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
        <MaterialIcons name="map" style={{fontSize: 26, color: tintColor}}/>
      ),
      headerTitle: <Text style={styles.headerTitle}>Go2Gather</Text>,
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

  componentWillMount(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        //console.log("POSITION",position);
        var initialPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
        this.props.actions.updateLocation(initialPosition);
        //this.props.actions.getCurrentPlace(initialPosition);
      },
       (error) => console.log(error.message ),
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
    );

    if(this.props.user_location.longitude!=0 && this.props.user_location.latitude!=0)
    this.watchId = navigator.geolocation.watchPosition(
        (position) => {
          var newPosition = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
          }
          if(newPosition.longitude!=0 && newPosition.longitude!=0){
            this.props.actions.updateLocation(newPosition);
          }
      },
        (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    );

  //Preloading of data
  this.props.actions.loadMeetupData(this.props.account.uid); //meetups
  this.props.actions.loadFriendsData(this.props.account.uid); //friends
  this.props.actions.loadFriendRequests(this.props.account.uid); //friends
  this.props.actions.loadMeetupRequestData(this.props.account.uid); //meetup requests

  }

  render() {
    return (
      <Container>
        <View style={styles.searchArea}>
          <TouchableOpacity style={[styles.p15, styles.lineBottom]} onPress={()=>this.props.actions.searchPlaceFrom(this.props.user_location)}>
            <Text>{this.props.all_location.search_location_from.name !='' ? this.props.all_location.search_location_from.name : 'Select start location'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.p15]} onPress={()=>this.props.actions.searchPlaceTo(this.props.user_location)}>
            <Text>{this.props.all_location.search_location_to.name !='' ? this.props.all_location.search_location_to.name : 'Select end location'}</Text>
          </TouchableOpacity>
        </View>
        <HomeMap/>
      </Container>
    );
  }
}


//PROPS
const mapStateToProps = state => ({
  user_location: state.location.user_location,
  all_location: state.location,
  account: state.auth,
  meetups: state.meetups,
});
 
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(Home);