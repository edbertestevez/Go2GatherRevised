import React from 'react';
import PropTypes from 'prop-types';

import { addNavigationHelpers, StackNavigator, DrawerNavigator } from 'react-navigation';

import SplashScreen from '../containers/SplashScreen';
import LoginScreen from '../containers/LoginScreen';

import {Icon} from 'native-base';

//EDIT HERE 
//Navigation ka pages
// drawer stack


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
},{
  initialRouteName: 'Login',
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
