import React from "react";
import { Image } from "react-native-elements"
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { RFValue } from "react-native-responsive-fontsize";
import AddPasswordsScreen from '../screens/addPasswordScreen'
import { AppStackNavigator } from "./AppStackNavigator";

export const AppTabNavigator = createMaterialTopTabNavigator
    (
        {
            Passwords: {

                screen: AppStackNavigator,
                navigationOptions: {
                    tabBarLabel: "Passwords",
                    tabBarPosition:'bottom',

                    tabBarIcon: () => (
                        <Image
                            source={require("../assets/pass1.png")}
                            style={{
                                width: RFValue(25),
                                height: RFValue(25),
                                //margin:10,
                              
                            }}
                        />

                    ),

                },
            },

            Add: {
                screen: AddPasswordsScreen,
                navigationOptions: {
                    tabBarLabel: "Add Password",
                    tabBarPosition:'bottom',
                    tabBarIcon: () => (
                        <Image
                            source={require("../assets/pass2.png")}
                            style={{

                                width: 30,
                                height: 30,

                                justifyContent: 'center',


                            }}

                        />
                    ),
                },
            },


        },
   
      
        {
            tabBarOptions: {
                activeTintColor: '#175ddc',
                inactiveTintColor:'grey',
                showIcon: true,
                
              

                style: {
                    backgroundColor: "white",
                    
                    
                },
            },

            


        }
    );