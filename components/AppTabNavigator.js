import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import AddPasswordsScreen from '../screens/addPasswordScreen'
import MyHeader from '../components/MyHeader';

import AppStackNavigator from './AppStackNavigator';

const Tab = createMaterialTopTabNavigator();

const AppTabNavigator = (props) => {
  return (
    <View style={{flex:1}}>
        <MyHeader
          title="Crypto"
          justifyContent="center"
          navigation={props.navigation}
        />
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Passwords" component={AppStackNavigator} />
          <Tab.Screen name="Add Password" component={AddPasswordsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default AppTabNavigator;
