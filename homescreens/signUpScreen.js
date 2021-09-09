import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, ScrollView, KeyboardAvoidingView, StatusBar } from 'react-native';
import { Icon } from 'react-native-elements'
import { Header } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase';
import db from '../config';

export default class SignUpScreen extends React.Component {
    constructor() {
        super();

        this.state = {
            emailId: "",
            password: "",
            firstName: "",
            lastName: "",
            mobileNo: "",
            address: "",
            confirmPassword: "",
        }
    }

    //Registration Function
    userSignUp = (emailId, password, confirmPassword) => {
        if (password !== confirmPassword) {
            return Alert.alert("Passwords Do Not Match");
        } else {
            firebase
                .auth()
                .createUserWithEmailAndPassword(emailId, password)
                .then(() => {
                    db.collection('users').add({
                        first_name: this.state.firstName,
                        last_name: this.state.lastName,
                        contact: this.state.mobileNo,
                        address: this.state.address,
                        email_id: this.state.emailId
                    })
                    return Alert.alert("Your Account Has Been Created", "", [
                        {
                            text: "OK",

                        }
                    ]);
                })
                .catch((error) => {
                    var errorcode = error.code;
                    var errormessage = error.message;
                    return Alert.alert(errormessage);
                });
        }
    };



    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    animated={true}
                    backgroundColor="#175ddc"
                />
                <Header containerStyle={{
                    justifyContent: 'center',
                    backgroundColor: '#175ddc',
                    borderColor: '#09a6e3'

                }}

                    leftComponent={<Icon
                        name='arrowleft'
                        type='antdesign'
                        color='white'
                        justifyContent='center'
                        alignSelf='center'
                        alignItems='center'
                        onPress={() => this.props.navigation.navigate("LoginScreen")}
                    />}

                    centerComponent={{
                        text: "SignUp",
                        style: {
                            color: 'white',
                            fontSize: RFValue(20),
                            fontWeight: "bold",
                            justifyContent: 'center',
                            alignItems: 'center'
                        }
                    }}
                />
                <ScrollView style={{ width: "100%" }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', alignContent: 'center' }}>
                        <Text
                            style={{
                                justifyContent: "center",
                                alignSelf: "center",
                                fontSize: RFValue(25),
                                color: "#175ddc",
                                margin: RFValue(18),
                                fontWeight: 'bold'


                            }}
                        >Enter Your Credentials</Text>
                        <KeyboardAvoidingView style={styles.keyboardview}>
                            <TextInput
                                style={styles.textinput}
                                placeholder="First Name"
                                maxLength={10}
                                onChangeText={(text) => {
                                    this.setState({
                                        firstName: text,
                                    });
                                }}
                            />

                            <TextInput
                                style={styles.textinput}
                                placeholder="Last Name"
                                maxLength={10}
                                onChangeText={(text) => {
                                    this.setState({
                                        lastName: text,
                                    });
                                }}
                            />

                            <TextInput
                                style={styles.textinput}
                                placeholder="Contact No."
                                maxLength={10}
                                keyboardType="numeric"
                                onChangeText={(text) => {
                                    this.setState({
                                        mobileNo: text,
                                    });
                                }}
                            />

                            <TextInput
                                style={styles.textinput}
                                placeholder="Address"
                                multiline={true}
                                onChangeText={(text) => {
                                    this.setState({
                                        address: text,
                                    });
                                }}
                            />

                            <TextInput
                                style={styles.textinput}
                                placeholder="Email ID"
                                keyboardType="email-address"
                                onChangeText={(text) => {
                                    this.setState({
                                        emailId: text,
                                    });
                                }}
                            />

                            <TextInput
                                style={styles.textinput}
                                placeholder="Password"
                                secureTextEntry={true}
                                onChangeText={(text) => {
                                    this.setState({
                                        password: text,
                                    });
                                }}
                            />

                            <TextInput
                                style={styles.textinput}
                                placeholder="Confirm Password"
                                secureTextEntry={true}
                                onChangeText={(text) => {
                                    this.setState({
                                        confirmPassword: text,
                                    });
                                }}
                            />


                            <TouchableOpacity
                                style={{
                                    width: RFValue(200),
                                    height: RFValue(50),
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderWidth: RFValue(1),
                                    borderRadius: RFValue(12),
                                    marginTop: RFValue(30),
                                    backgroundColor: '#175ddc',
                                    borderColor: '#175ddc'
                                }}
                                onPress={() => {
                                    this.userSignUp(
                                        this.state.emailId,
                                        this.state.password,
                                        this.state.confirmPassword
                                    );
                                    this.props.navigation.navigate("LoginScreen")
                                }}>
                                <Text style={{ color: "white", fontWeight: 'bold', fontSize: RFValue(14) }}>Create My Account</Text>
                            </TouchableOpacity>

                        </KeyboardAvoidingView>

                    </View>
                </ScrollView>



            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },

    keyboardview: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        justifyContent: 'center'
    },

    textinput: {
        width: RFValue(250),
        height: RFValue(35),
        borderWidth: 1.5,
        borderColor: "#175ddc",
        fontSize: RFValue(17),
        margin: RFValue(11),
        paddingLeft: RFValue(9),
        marginBottom: RFValue(9),
        borderRadius: RFValue(7),
    },
});
