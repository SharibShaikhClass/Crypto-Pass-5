import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar,Alert } from 'react-native';
import { Card, Header, Icon } from 'react-native-elements'
import firebase from 'firebase';
import { Base64 } from 'js-base64';
import db from '../config.js';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAvoidingView } from 'react-native';

export default class PasswordDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: firebase.auth().currentUser.email,
      requestId: this.props.navigation.getParam('details')["request_id"],
      passwordname: this.props.navigation.getParam('details')["name"],
      passwordemail: this.props.navigation.getParam('details')["email_database"],
      password: this.props.navigation.getParam('details')["encrypted_password"],
      docId: this.props.navigation.getParam('details')["doc.id"],
      decryptedpassword: "",
      passwordHolder1: '',
      passwordHolder2: ''
    }
  }

  /*getPasswordsDetails() {
    db.collection('users').where('email_id', '==', this.state.recieverId).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.setState({
            passwordname: doc.data().name,
            passwordemail: doc.data().email_database,
            password: doc.data().encrypted_password,
            docId: doc.id
          })
        })
      });

  };*/

  decryptPassword = () => {
    var decode = Base64.decode(this.state.password);
    this.setState({
      decryptedpassword: decode

    });
  }

  componentDidMount() {
    this.decryptPassword()
  }


  updatePasswordDetails = () => {
    var encode = Base64.encode(this.state.passwordHolder1);
    this.setState({ password: encode });
    db.collection('savedpasswords').where("request_id" , '==',this.state.requestId)
    .get()
    .then(snapshot =>{
      snapshot.forEach(doc=>{
        doc.update({
          "encrypted_password": this.state.password
        })
      })
    })





    Alert.alert("Your Password Has Been Saved")

  }

  componentWillUnmount() {
    this.decryptPassword()
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor="#175ddc"
        />
        <Header containerStyle={{
          backgroundColor: '#175ddc',
          marginTop: -40
        }}
          leftComponent={<Icon name='arrow-left' type='feather' color='white' onPress={() => this.props.navigation.goBack()} />}
          centerComponent={{ text: "Details", style: { color: 'white', fontSize: 20, fontWeight: "bold", } }}


        />
        <View style={styles.modalContainer}>


          <ScrollView style={{ width: "100%" }}>
            <View style={{
              justifyContent: "center",
              alignItems: 'center'
            }}>

              <Text
              selectable={true}
              style={{ marginTop: 20, fontSize: 17, fontWeight: 'bold',  }}> App/Website : {this.state.passwordname}</Text>

              <Text
              selectable={true}
              style={{ marginTop: 20, fontSize: 17, fontWeight: 'bold' }}> Email ID : {this.state.passwordemail}</Text>

              <Text 
              selectable={true}
              style={{ marginTop: 20, fontSize: 17, fontWeight: 'bold' }}> Password : {this.state.decryptedpassword}</Text>


            </View>

            <KeyboardAvoidingView style={styles.keyboardview}>
              <TextInput
                placeholder="New Password "
                onChangeText={data => this.setState({ passwordHolder1: data })}
                style={styles.modaltextinput}
                underlineColorAndroid='transparent'
              />

              <TextInput
                placeholder="Retype New Password "
                onChangeText={data => this.setState({ passwordHolder2: data })}
                style={styles.modaltextinput}
                underlineColorAndroid='transparent'
              />

            </KeyboardAvoidingView>
            <TouchableOpacity style={styles.updatebutton}
              onPress={() => {
                this.updatePasswordDetails()
              }}>
              <Text style={styles.buttonText}>Update Password</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  modaltextinput: {
    width: "75%",
    height: 35,
    alignSelf: "center",
    borderColor: "#175ddc",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
  keyboardview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
  updatebutton: {
    alignSelf: 'center',
    width: 250,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: "#175ddc",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: 30
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff"
  }
});
