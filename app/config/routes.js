import React from 'react';
import PropTypes from 'prop-types';

import { addNavigationHelpers, StackNavigator, DrawerNavigator, TabNavigator } from 'react-navigation';

import SplashScreen from '../containers/SplashScreen';
import LoginScreen from '../containers/LoginScreen';
import Home from '../containers/Home/Home';
import Meetups from '../containers/Meetups/Meetups';
import Profile from '../containers/Profile/Profile';
import Search from '../containers/Search/SearchMain';
import NewMeetup from '../containers/NewMeetup/NewMeetup';
import ViewMeetup from '../containers/Meetups/ViewMeetup';
import MeetupMap from '../containers/Meetups/MeetupMap';
import MeetupAddFriend from '../containers/NewMeetup/MeetupAddFriend';
import SendMeetupInvite from '../containers/Meetups/SendMeetupInvite';
import EditMeetup from '../containers/Meetups/EditMeetup';
//REQUESTS
import MeetupRequests from '../containers/Requests/MeetupRequests';
import FriendRequests from '../containers/Requests/FriendRequests';

import {Image} from 'react-native';
import {Icon, Text} from 'native-base';
import styles from '../styles/styles';

//EDIT HERE 
//Navigation ka pages
// drawer stack
const MainTabs = TabNavigator({
  Home: {screen: Home},
  Search: {screen: Search},
  New: {screen: NewMeetup},
  Meetups: {screen: Meetups},
  Profile: {screen: Profile},
}, {
  initialRouteName: 'Home',
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  animationEnabled: false,
  tabBarOptions: {
    activeTintColor: '#0aa6aa',  // Color of tab when pressed
    pressColor: '#f4f4f4',  // Color of tab when pressed
    activeBackgroundColor: '#f9f9f9',  // Color of tab when pressed
    inactiveTintColor: '#6d6d6d', // Color of tab when not pressed
    showIcon: 'true', // Shows an icon for both iOS and Android
    pressOpacity: 0.5,
    style: {
      backgroundColor: '#f9f9f9',
      width: '100%',
      height: 55,
    },
    labelStyle:{
      fontSize: 10,
      marginTop: 0
    },
    iconStyle: {
      width: '100%',
    },
    indicatorStyle: {
      height: '100%',
      backgroundColor: '#f9f9f9'
    }
  }
});

const Stacks = StackNavigator({
  Splash: { 
    screen: SplashScreen,
    navigationOptions:{
      header: null
    }
  },
  Login: { 
    screen: LoginScreen, 
    headerMode: 'screen',
    navigationOptions:{
      header: null
    }
  },
  Main: { 
    screen: MainTabs, 
    headerMode: 'screen',
  },
  ViewMeetup: {
    screen: ViewMeetup,
    navigationOptions:{
      header: null
    }
  },
   MeetupMap: {
    screen: MeetupMap,
    navigationOptions:{
      header: null
    }
  },
  MeetupAddFriend: {
    screen: MeetupAddFriend,
    navigationOptions:{
      header: null
    }
  },
  SendMeetupInvite: {
    screen: SendMeetupInvite,
    navigationOptions:{
      header: null
    }
  },
  EditMeetup: {
    screen: EditMeetup,
    navigationOptions:{
      header: null
    }
  },
  MeetupRequests: {
    screen: MeetupRequests,
    navigationOptions:{
      header: null
    }
  },
  FriendRequests: {
    screen: FriendRequests,
    navigationOptions:{
      header: null
    }
  },
},{
  initialRouteName: 'Splash',

}); 

export const Routes = DrawerNavigator({
  MainRoute: { 
    screen: Stacks,
    
  }
},{
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
  //contentComponent: props => <DrawerContainer {...props} />
});
