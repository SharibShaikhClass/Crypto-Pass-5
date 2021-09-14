import React, { Component } from 'react';
import { Header, Icon } from 'react-native-elements';

export default class MyHeader extends Component {
  render() {
    return (
      <Header
        containerStyle={{
          backgroundColor: '#175ddc',
         marginTop:-40
        }}
        leftComponent={{
          
          text: this.props.title,
          style: {
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
            width: 200,
            //justifyContent: 'center',
            //alignItems: 'center'
          },
        }}
    rightComponent={
          <Icon
            name="bars"
            type="font-awesome"
            color="white"
            size={22}
            onPress={() => this.props.navigation.toggleDrawer()}
          />
        
        }
      />
    );
  }
}
