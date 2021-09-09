import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { AppTabNavigator } from './components/AppTabNavigator';
import { AppDrawerNavigator } from './components/AppDrawerNavigator';
import LoginScreen from './homescreens/loginScreen';
import SignUpScreen from './homescreens/signUpScreen';
export default function App(){
    return (
      //Displaying The AppContaniner
      <AppContainer />
    );

}
//Creating The SwitchNavigator for Swapping Between Screens
const switchNavigator = createSwitchNavigator({
  LoginScreen:LoginScreen,
  SignUpScreen:SignUpScreen,
  AppDrawerNavigator:AppDrawerNavigator,
  AppTabNavigator:AppTabNavigator
})

//Creating AppContainer For Displaying The SwitchNavigator
const AppContainer = createAppContainer(switchNavigator)
