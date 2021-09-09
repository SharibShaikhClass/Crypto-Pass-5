import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, ScrollView, TextInput, TouchableOpacity, Modal, StatusBar, Image } from 'react-native';
import { ListItem, Header, Icon } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';
import { KeyboardAvoidingView } from 'react-native';

export default class PasswordScreen extends Component {
  constructor() {
    super()
    this.state = {
      userId: firebase.auth().currentUser.email,
      requestedPasswordList: [],
      isModalVisible: false,
      requestId: "",
      passwordname: "",
      passwordemail: "",
      password: "",
      decryptedpassword: "",
      docId: ''
    }
    this.requestRef = null
  }

  getPasswordDetails = () => {

    db.collection('savedpasswords')
      .where("user_id", '==', this.state.userId)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          var data = doc.data()
          this.setState({
            passwordemail: data.email_database,
            passwordname: data.name,
            password: data.encrypted_password,
            docId: doc.id

          })
        });
      })
  }

  componentDidMount() {
    this.getPasswordDetails()
  }

  updatePasswordDetails = () => {
    db.collection('savedpasswords').doc(this.state.docId)
      .update({
        "name": this.state.passwordname,
        "email_database": this.state.passwordemail,
        "encrypted_password": this.state.password,
      })

    Alert.alert("Your Password Has Been Saved")

  }


  getrequestedPasswordList = () => {
    this.requestRef = db.collection("savedpasswords")
      .where("user_id", '==', this.state.userId)
      .onSnapshot((snapshot) => {
        var requestedPasswordList = []
        snapshot.docs.map((doc) => {
          var password = doc.data()
          password["doc_id"] = doc.id
          requestedPasswordList.push(password)
        });
        this.setState({
          requestedPasswordList: requestedPasswordList
        });

      })
  }



  componentDidMount() {
    this.getrequestedPasswordList()
  }


  componentWillUnmount() {
    this.requestRef();
  }



  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item, i }) => {
    return (
      <ListItem
        key={i}
        title={item.name}
        titleStyle={{ color: "black", fontWeight: "bold" }}
        rightElement={
          <TouchableOpacity style={styles.button}
            onPress={() => {
              this.props.navigation.navigate("PasswordsDetails", { "details": item })
            }}
          >
            <Text style={{ color: 'white', fontSize: 15 }}>View</Text>
          </TouchableOpacity>
        }
        bottomDivider
      />
    )

  }



  render() {
    return (

      <View style={{ flex: 1 }}>
       {/* <View style={{ justifyContent: "center", alignItems: "center" }}>
          {this.showmodal()}
        </View>*/}
        <StatusBar
        animated={true}
        backgroundColor="#175ddc"
        />
        <MyHeader
          title="Your Passwords"
          navigation={this.props.navigation}
        />
      
        <View style={styles.subContainer}>

          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.requestedPasswordList}
            renderItem={this.renderItem}
          />

        </View>
        </View>
      

    )
  }
}

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    fontSize: 20,
    //justifyContent: 'center',
    //alignItems: 'center',
  },
  button: {
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#175ddc",
    shadowColor: "#000",
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 8
    }
  },
  modalContainer: {
    flex: 1,
    width: 430,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },

  //Styling For The Keyboard Avoiding View
  keyboardview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  modalbutton: {
    width: "65%",
    height: 50,
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
    marginTop: 30,
    alignSelf: 'center'
  },
  modalbuttonText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff"
  }
})