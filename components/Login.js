import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {Button, FormInput, FormLabel} from 'react-native-elements';
//import {stringify} from "qs";
//import {SHA512} from "sha2";

export default class Login extends Component {

    constructor(props)
    {
      super(props);
      this.state = 
      {
          username: 'username',
          password: 'password',
          successinfo: ''
      };
        //Refs auf die beiden Input-Boxen erstellen
        this.usernameInputBox = React.createRef();
        this.passwordInputBox = React.createRef();

    }

    /*    _register = () => {
        const payload =
            {
                    user: this.user,
                    password: this.password,
            }
            console.log(payload);
        }*/

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
        let loginstring = this.checkCredentials;
        //console.log("onloginpress aufgerufen"); //DEBUG
        if ((this.state.username !== '') && (this.state.password !== '')) {
            //var successinfo = ''; //Variable nicht unbedingt als String initialisieren.....
            var username = this.state.username;
            var password = this.state.password;
            console.log(username);//DEBUG
            console.log(password);//DEBUG

            var successinfo = checkCredentials(username, password)
                .then((successinfo) => {
                    //console.log('setze jetzt den Status');//DEBUG
                    console.log('successinfo hat den Wert: ' + successinfo);
                    this.setState({successinfo: successinfo});
                });
        }
        console.log("onloginpress durchlaufen"); //DEBUG

    }

    render() {
        return (
            <ScrollView style={{padding: 20}}>
                <Text style={{fontSize: 27}}>
                    Login
                </Text>
                <FormLabel>Benutzername</FormLabel>
                <FormInput placeholder='Geben Sie hier Ihren Benutzernamen ein....'
                           onSubmitEditing={(event) => this.refreshUser(event.nativeEvent.text)}
                           onChangeText={(username) => this.setState({username})} value={this.state.username}/>
                <FormLabel>Passwort</FormLabel>
                <FormInput secureTextEntry onSubmitEditing={(event) => this.refreshPassword(event.nativeEvent.text)}
                           placeholder='Geben Sie hier Ihr Passwort ein...'
                           onChangeText={(password) => this.setState({password})} value={this.state.password}/>
                <Button
                    buttonStyle={styles.myOkButton}
                    onPress={this.onLoginPress}
                    title="Anmelden"
                      />

                <Text>{this.state.successinfo}</Text>
                <Text ref={usernameInputBox => this.usernameInputBox = usernameInputBox}>{this.state.username}</Text>
                <Text ref={passwordInputBox => this.passwordInputBox = passwordInputBox}>{this.state.password}</Text>

                  </ScrollView>
            )
    }
}

// async function checkCredentials(username, password)
// {q
//     /* Dies ist der Login über die API (...../api.php/records/....)
//     let loginjson = fetch('https://194.95.221.67/api.php/records/kunde', {
//         method: 'GET',
//         body: {
//             filter: 'ID,eq,' + this.state.username,
//             filter: 'PASSWORD,eq,' + this.state.password,
//         }
//     });
//     **********************************************************************/
//     try {
//         let bodystring = 'mode=1'  //Später mal aus dem Enum beziehen....
//             + '&id=' + username   //&id=username
//             + '&pw=' + password ;  //&pw=password
//         console.log('Der Bodystring hat den Wert: ' + bodystring);
//         let response = await fetch('https://fhwswebbankingapp.ddns.net/appdaemon.php', { //Serveradresse muss bei IOS Zertifikate beinhalten
//             method: 'POST',
//             body: bodystring,
//         });
//         //console.log("Fetch ausgeführt");//DEBUG
//         let loginstring = await response.text();
//         console.log("loginstring hat den wert: " + loginstring);
//         console.log('#########Die Header sind: ##########'+ await response.headers + '##########################');
//         return loginstring;
//     }
//     catch(error)
//     {
//         console.log(error);//DEBUG
//         return 'Fehler';
//     }
// }

function checkCredentials(username, password) {
    // Vorgang mit Fetch funktioniert nicht wirklich gut, aber es kann eine über then eine gewisse Synchronitöt gewährleistet werden.
    let outstr = fetch('https://fhwswebbankingapp.ddns.net/appdaemon.php', { //Serveradresse muss bei IOS Zertifikate beinhalten
        method: 'POST',
        headers: [
            ['Content-Type', 'text/x-www-form-urlencoded'],
            ['Access-Control-Allow-Origin', '*'],
        ],
        body: 'mode=1'  //Später mal aus dem Enum beziehen....
            + '&id=' + username   //&id=username
            + '&pw=' + password  //&pw=passwordbodystring,

    })
        .then((response) =>
            //response.formData() //Antwort als formData auslesen
            response.text()//Antwort als String auslesen
        )
        .then((responsebody) => {
            return responsebody;
            //responsebody.get("mode") // Einzelnen Schlüssel in der FormData auslesen
        })
        /**** Dies wird für formData benötigt, funktioniert jedoch nicht
         .then ((formEntry)                =>
         {
                console.log(formEntry);
                return formEntry; //Den entsprechenden String über .then() abrufen und als return ausgeben
                })
         ***********************************************************/
        .catch((error) => {

            alert(error);
            return 'FEHLER';
        });
    //console.log(outstr);
    return outstr;
    //let url = 'https://fhwswebbankingapp.ddns.net/appdaemon.php';
}


const styles = StyleSheet.create({
    myOkButton: {
        //border:  ,
        //flex: 1,
        //justifyContent: 'center',
        //position: 'relative',
        //top: '50%',
        //left: '50%',
        backgroundColor: "purple",
        //marginHorizontal: 'auto',
        //width: '40%',
        //maxWidth: '50%',
    },
});

