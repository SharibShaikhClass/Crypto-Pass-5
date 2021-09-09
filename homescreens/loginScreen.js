import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, StatusBar, Image, ScrollView, Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Header } from 'react-native-elements';
import firebase from 'firebase'
export default class LoginScreen extends React.Component {
    constructor() {
        super();

        //Creating Empty String For The EmailID and Password
        this.state = {
            emailId: "",
            password: "",
        }
    }
    handleEmail = text => {
        this.setState({ emailId: text });
    };
    handlePassword = text => {
        this.setState({ password: text });
    };


    //Login Function
    userLogin = (emailId, password) => {
        firebase
            .auth()
            .signInWithEmailAndPassword(emailId, password)
            .then(() => {
                this.props.navigation.navigate("Home");
                console.log("Logged In")
            })
            .catch((error) => {
                var errorcode = error.code;
                var errormessage = error.message;
                return Alert.alert(errormessage);
            });
    };
    render() {
        return (
            <View style={{ marginTop: RFValue(0) }}>
                { /*<SafeAreaView
      style ={{marginTop:Platform.OS==="android"?StatusBar.currentHeight:0}}
     />*/}
                <ScrollView>


                    <View style={styles.container}>
                        <StatusBar
                            animated={true}
                            backgroundColor="#175ddc"
                        />
                        <Header containerStyle={{
          backgroundColor: '#175ddc',
         marginTop:-40
        }}
                            centerComponent={{ text: 'Crypto Pass', style: { color: 'white', fontSize: 22, fontWeight: 'bold' } }}
                        />
                        <Image
                            source={require("../assets/logo.png")}
                            style={{ width: RFValue(240), height: RFValue(240), marginBottom: RFValue(20), marginTop: RFValue(45) }}
                        />


                        <View style={{ justifyContent: "center", alignItems: "center" }}>

                        </View>

                        {/*<ImageBackground
        source={require("../assets/Image.png")}
        style ={{flex:1,resizeMode:"cover"}}
        >*/}

                        {/* Title Image For The App */}


                        {/*Title For The App */}


                        {/*Creating The Text Input For Entering The "Email ID" for Login */}
                        <TextInput
                            style={styles.loginBox}
                            underlineColorAndroid="transparent"
                            placeholder="Email"
                            placeholderTextColor="black"
                            autoCapitalize="none"
                            onChangeText={this.handleEmail}
                            value={this.state.emailId}
                        />

                        {/*Creating The Text Input For Entering The "Password" for Login */}
                        <TextInput
                            style={styles.passwordBox}
                            underlineColorAndroid="transparent"
                            placeholder="Password"
                            placeholderTextColor="black"
                            autoCapitalize="none"
                            secureTextEntry={true}
                            onChangeText={this.handlePassword}
                            value={this.state.password}
                        />

                        {/*Creating The "Login" Button For Logging The User */}
                        <TouchableOpacity
                            style={styles.loginButton}
                            onPress={() => {
                                this.userLogin(this.state.emailId, this.state.password);
                            }}
                        >
                            <Text style={styles.submittext}>Login</Text>
                        </TouchableOpacity>

                        {/*Creating The "SignUp" Button For Logging The User 
        <Text style={{ marginTop: 20, color: "black", fontSize: 20 }}>Don't Have An Account</Text>*/}

                        <TouchableOpacity
                            style={styles.SignUpButton}
                            onPress={() => {
                                this.setState({ isModalVisible: true });
                            }}
                        >
                            <Text style={styles.submittext}>Create Account</Text>
                        </TouchableOpacity>

                        {/*</ImageBackground>*/}

                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        //flex:1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },

    //Styling For The Email And Password TextInput Box On The "Welcome Screen"

    loginBox: {
        width: 300,
        height: 35,
        borderWidth: 1.5,
        borderColor: "#175ddc",
        fontSize: 20,
        margin: 10,
        paddingLeft: 10,
        marginBottom: 20,
        borderRadius: 5,
        marginTop: 25
    },
    passwordBox: {
        width: 300,
        height: 35,
        borderWidth: 1.5,
        borderColor: "#175ddc",
        fontSize: 20,
        margin: 5,
        paddingLeft: 10,
        marginBottom: 20,
        borderRadius: 5,
        // marginTop:15
    },

    //Styling For The "Login Button" On The "Welcome Screen"

    loginButton: {
        width: RFValue(180),
        height: RFValue(50),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: RFValue(10),
        backgroundColor: "#175ddc",
        shadowColor: "#000",

        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10.32,
        elevation: 16,
        padding: RFValue(10),
        marginTop: RFValue(10)
    },

    //Styling For The "Sign Up" Button On The "Welcome Screen"

    SignUpButton: {
        width: RFValue(250),
        height: RFValue(50),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: RFValue(10),
        backgroundColor: "#175ddc",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10.32,
        elevation: 16,
        marginTop: RFValue(20),
    },

    //Styling For The "Login And SignUp Button" Text
    submittext: {
        fontSize: 22,
        color: "white",
        fontWeight: 'bold'
    },

    //Styling For The Title Of The App


    //Styling For The Keyboard Avoiding View


    //Styling For The "Register Button Text" In The Modal


    //Styling For The "Register And Cancel Button" In The Modal


});
