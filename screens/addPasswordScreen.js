import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, TouchableOpacity, Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase';
import { Base64 } from 'js-base64';
import db from '../config';
import MyHeader from '../components/MyHeader';

export default class AddPasswordsScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            userId: firebase.auth().currentUser.email,
            Name: "",
            EmailId: "",
            passwordHolder: "",
            showData: ""
        }
    }

    createUniqueId() {
        return Math.random().toString(36).substring(7);
    }


    addPassword = async (Name, EmailId, showData) => {
        var encoded = Base64.encode(this.state.passwordHolder);
        this.setState({ showData: encoded });
        var userId = this.state.userId
        var randomRequestId = this.createUniqueId()

        db.collection('savedpasswords').add({
            "user_id": userId,
            "name": Name,
            "email_database": EmailId,
            "encrypted_password": encoded,
            "request_id": randomRequestId,
            "date": firebase.firestore.FieldValue.serverTimestamp(),
        })

        this.setState({
            Name: '',
            EmailId: '',
            showData: '',
        })

        return Alert.alert("Password Saved")

    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
        animated={true}
        backgroundColor="#175ddc"
        //barStyle={statusBarStyle}
        //showHideTransition={statusBarTransition}
        //hidden={hidden} 
        />
                <MyHeader
                    title="Add A Password"
                    navigation={this.props.navigation}
                />
                <View
                    style={styles.container}>
                    <TextInput
                        style={styles.formTextInput}
                        placeholder={"Name Of Application Or Website"}
                        onChangeText={(text) => {
                            this.setState({
                                Name: text
                            })
                        }}

                    />
                    <TextInput
                        style={styles.formTextInput}
                        placeholder={"Email ID Or Username"}
                        onChangeText={(text) => {
                            this.setState({
                                EmailId: text
                            })
                        }}

                    />
                    <TextInput
                        placeholder="Enter Password Here"
                        onChangeText={data => this.setState({ passwordHolder: data })}
                        style={styles.formTextInput}
                        underlineColorAndroid='transparent'
                    />


                    <TouchableOpacity style={styles.button}
                        onPress={() => {
                            this.addPassword(this.state.Name, this.state.EmailId, this.state.showData)
                        }} >
                        <Text style={{ fontSize: RFValue(15), color: 'white' }}>Save Password</Text>
                    </TouchableOpacity>



                    <Text style={{ fontSize: RFValue(20), textAlign: 'center', marginTop: 10 }}>
                        {this.state.showData}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        // justifyContent: 'center',
    },

    formTextInput: {
        width: "75%",
        height: RFValue(35),
        alignSelf: 'center',
        borderColor: '#175ddc',
        borderRadius: RFValue(10),
        borderWidth: RFValue(1),
        marginTop: RFValue(20),
        padding: RFValue(10),
    },
    button: {
        width: RFValue(150),
        height: RFValue(40),
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
        marginTop: 20
    },
});

