'use strict';
import React, { Component  } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
    StyleSheet,
    AppRegistry,
    TouchableOpacity,
    Linking,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';


export default class Scanscreen extends Component {

    constructor(props)
    {
      super(props);
      this.state = 
      {
        password: '',
        successinfo: ''
      };
    }    
    onSuccess(e) {
    Linking
      .openURL(e.data)
      .catch(err => console.error('Das hat nicht funktioniert....', err));
    }


    render() {
        return (
        <QRCodeScanner
          onRead={this.onSuccess.bind(this)}
          topContent={
            <Text>
              Go to <Text>wikipedia.org/wiki/QR_code</Text> on your computer and scan the QR code.
            </Text>
          }
          bottomContent={
            <TouchableOpacity>
              <Text>OK. Got it!</Text>
            </TouchableOpacity>
          }
        />
            )
    }



    
}