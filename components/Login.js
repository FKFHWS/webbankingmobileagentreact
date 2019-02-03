import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Button, FormInput, FormLabel} from 'react-native-elements';
//Imports aus anderen Skripten
import * as Communication from "./Communication";
import {registerForPushNotificationsAsync} from "./Communication";
import * as Storage from "./Storage";
import {styles} from "./MyStyleSheet";
//import {stringify} from "qs";
//import {SHA512} from "sha2";


export default class Login extends Component {

    constructor(props)
    {
        super(props);
        this.state =
            {
                username: '',
                password: '',
                successinfo: '',
            };


        //const { navigate } = this.props.navigation; //Navigation als const einbinden
        //Refs auf die beiden Input-Boxen erstellen
        this.usernameInputBox = React.createRef();
        this.passwordInputBox = React.createRef();

    }

    refreshUser = function (x) {
        //Setze den Text auf "", um zu verhindern, dass er zum Object gecastet wird und ein Fehler erzeugt wird.
        this.setState({username: (typeof (x) == "string") ? x : ""});

    };
    refreshPassword = function (x) {
        this.setState({password: (typeof (x) == "string") ? x : ""});
    };


    onLoginPress = () => {
        console.log(this.state.username);
        console.log(this.state.password);
        //if ( this.checkCredentials() )
        // {
        //   this.setState(
        //       {successinfo: 'Login erfolgreich'}//DEBUG
        //   );
        //   //this.props.navigation.navigate('Secured');
        // }
        // else
        // {
        //  this.setState(
        //     {successinfo: 'Falscher Username oder Passwort'}
        //  );
        // }
        //console.log("onloginpress aufgerufen"); //DEBUG
        if ((this.state.username !== '') && (this.state.password !== '')) {
            //var successinfo = ''; //Variable nicht unbedingt als String initialisieren.....
            var username = this.state.username;
            var password = this.state.password;
            console.log("Username ist: " + username);//DEBUG
            console.log("Passwort ist: " + password);//DEBUG

            var responseJson = Communication.checkCredentials(username, password)
                .then((responseJson) => {
                    console.log('Vom Server kam diese Nachricht zurück: ' + JSON.stringify(responseJson));//DEBUG


                    console.log("responseJson hat den Modus: ", responseJson.mode);
                    if (responseJson.mode == 2) { //Wenn der Mode in der Antwort den Wert 2 hat, also LoginToken, führe dies aus
                        console.log("Speichere " + username + "als Username ein. Als sessionKey speichere ein:" + responseJson.sessionKey);//DEBUG
                        Storage.storeUserAndKey(username, responseJson.sessionKey)
                            .then(this.props.navigation.navigate('Secured'));
                        registerForPushNotificationsAsync(username, responseJson.sessionKey)
                            .then((jsontoken) =>
                                console.log(JSON.stringify(jsontoken))
                            );
                    } else {
                        this.setState({successinfo: 'Login war nicht erfolgreich.'});
                        this.usernameInputBox.shake();
                        this.passwordInputBox.shake();
                    }
                });
        }
        console.log("onloginpress durchlaufen"); //DEBUG

    }

    render() {
        return (
            <ScrollView style={{padding: 20}}>
                <View style={{margin: 20}}/>
                <Text style={styles.myHeadline}>
                    Login
                </Text>
                <FormLabel>Benutzername</FormLabel>
                <FormInput
                    ref={usernameInputBox => this.usernameInputBox = usernameInputBox}
                    returnKeyType="next"
                    placeholder='Geben Sie hier Ihren Benutzernamen ein....'
                    onSubmitEditing={(event) => this.refreshUser(event.nativeEvent.text)}
                    onChangeText={(username) => this.setState({username})} value={this.state.username}/>
                <FormLabel>Passwort</FormLabel>
                <FormInput
                    ref={passwordInputBox => this.passwordInputBox = passwordInputBox}
                    returnKeyType="send"
                    secureTextEntry onSubmitEditing={(event) => this.refreshPassword(event.nativeEvent.text)}
                    placeholder='Geben Sie hier Ihr Passwort ein...'
                    onChangeText={(password) => this.setState({password})} value={this.state.password}/>
                <Button
                    buttonStyle={styles.myOkButton}
                    onPress={this.onLoginPress}
                    title="Anmelden"
                />
                {/*<Text>Debug Panel</Text>*/}
                <Text style={styles.errorText}>{this.state.successinfo}</Text>
                {/*<Text }>{this.state.username}</Text>*/}
                {/*<Text >{this.state.password}</Text>*/}

            </ScrollView>
        )
    }
}






