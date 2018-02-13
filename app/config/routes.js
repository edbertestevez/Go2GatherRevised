import React from 'react';
import PropTypes from 'prop-types';

import { addNavigationHelpers, StackNavigator, DrawerNavigator, TabNavigator } from 'react-navigation';

import SplashScreen from '../containers/SplashScreen';
import LoginScreen from '../containers/LoginScreen';
import Home from '../containers/Home/Home';
import Meetups from '../containers/Meetups/Meetups';
import Profile from '../containers/Profile/Profile';

import {Icon} from 'native-base';

//EDIT HERE 
//Navigation ka pages
// drawer stack
const MainTabs = TabNavigator({
  Home: {screen: Home},
  Meetups: {screen: Meetups},
  Profile: {screen: Profile}
}, {
  initialRouteName: 'Home',
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  animationEnabled: false,
  tabBarOptions: {
    showLabel: true,
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
      marginTop: 2
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
    // navigationOptions:{
    //   header: null
    // }
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
