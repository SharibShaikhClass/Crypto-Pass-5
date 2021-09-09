import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import PasswordScreen from '../screens/passwordScreen';
import PasswordDetails from '../screens/passwordDetailsScreen.js';

export const AppStackNavigator = createStackNavigator({
  Password: {
    screen:PasswordScreen,
    navigationOptions: {
      headerShown: false
    }
  },
 PasswordsDetails: {
    screen: PasswordDetails,
    navigationOptions: {
      headerShown: false
    }
  }
},
  {
    initialRouteName: 'Password'
  }
);
