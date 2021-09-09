import React, { Component } from "react";
import customSideBarMenu from './CustomSideBarMenu'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { AppTabNavigator } from './AppTabNavigator'
import SettingScreen from "../SideBarScreens/SettingScreen";
import { Icon } from 'react-native-elements';

export const AppDrawerNavigator = createDrawerNavigator(
    {
      Home: {
        screen: AppTabNavigator,
        navigationOptions: {
          drawerIcon: <Icon name="home" type="fontawesome5" />,
          drawerLabel: 'Home',
        },
      },
      Setting: {
        screen: SettingScreen,
        navigationOptions: {
          drawerIcon: <Icon name="settings" type="fontawesome5" />,
          drawerLabel: 'Settings',
        },
      },
    },
    {
      contentComponent: customSideBarMenu,
    },
    {
      initialRouteName: 'Home',
    }
  );
  