import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import * as Communication from "./Communication";
import * as Storage from "./Storage";
import {styles} from "./MyStyleSheet"

export default class Secured extends Component {

  constructor(props) {
    super(props);
    const {navigate} = this.props.navigation;
      this.state =
          {
              userid: '',
              sessionKey: '',
          }
      Storage.getUserID().then((userid) => {
          this.setState({userid: userid})
      });
      Storage.getAppSessionKey().then((sessionKey) => {
          this.setState({sessionKey: sessionKey})
      });

  }

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
      <ScrollView style={{ padding: 20 }}>
        <Text style={{ fontSize: 27 }}>Welcome</Text>
        <View style={{ margin: 20 }} />
          <Button style={styles.myOkButton}
                  onPress={this.scanQr}
                  title="Token beziehen"/>
          <Button style={styles.myCloseButton}
                  onPress={this.onLogoutClicked}
                  title="Logout"/>
      </ScrollView>
    );
  }


}
