import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import * as Communication from "./Communication";
import * as Storage from "./Storage";
import {styles} from "./MyStyleSheet";


export default class Secured extends Component {

    constructor(props) {
        super(props);
        const {navigate} = this.props.navigation;
        this.state =
            {
                userid: '',
                masterData: '',
                sessionKey: '',
                sharedSecret: 'nicht gesetzt',
                notification: {},
            }
        Storage.getUserID()
            .then((userid) =>
                this.setState({userid: userid})
            )
            .then(() =>
                Storage.getAppSessionKey()
            )
            .then((sessionKey) =>
                this.setState({sessionKey: sessionKey})
            )
            .then(() =>
                Communication.getUserMasterData(this.state.userid, this.state.sessionKey)
            )
            .then((masterData) =>
                this.setState({masterData: masterData})
            )
            .then(() =>
                Storage.getSharedSecret()
            )
            .then((sharedSecret) => {
                if (sharedSecret == "") //Testen, ob das Shared Secret bereits eingespeichert ist
                    this.setState({sharedSecret: sharedSecret}) // Wenn das Shared Secret existiert, einspeichern.
                //Wenn nicht, den String nicht verändern.
            })
        /*            .then(()=> {
                        registerForPushNotificationsAsync(this.state.username, this.state.sessionKey);
                        this._notificationSubscription = Notifications.addListener(this._handleNotification);
                    })
                    .then((jsontoken) =>
                        console.log(JSON.stringify(jsontoken)) //DEBUG
                    )*/;
    }

    // _handleNotification = (notification) =>
    // {
    //     this.setState({notification: notification});
    //     alert(notification.body);
    // }
    onLogoutClicked = () => {

        Communication.killSession(this.state.userid, this.state.sessionKey)
            .then((responsejson) => {
                console.log(JSON.stringify(responsejson));
                this.props.navigation.navigate('Home');
            });
    }

    scanQr = () => {
        this.props.navigation.navigate('Scanscreen');
    }

    render() {
        return (
            <ScrollView style={{padding: 20}}>
                <Text style={styles.myHeadline}>Guten Tag, {this.state.masterData}</Text>
                <View style={{margin: 20}}/>
                <Text> Ihre Kundennummer: {this.state.userid}</Text>
                <Text> Aktueller SessionKey: ... {this.state.sessionKey.substr(1020, 4)} </Text>
                <Text> Shared Secret: ... {this.state.sharedSecret} </Text>
                <View style={{margin: 5}}/>
                <Button style={styles.myOkButton}
                        onPress={this.scanQr}
                        title="Zertifikat beziehen"/>
                <View style={{margin: 5}}/>
                <Button style={styles.myCloseButton}
                        onPress={this.onLogoutClicked}
                        title="Logout"/>
            </ScrollView>
        );
    }


}
