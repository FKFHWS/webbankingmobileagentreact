'use strict';
import React, {Component} from 'react';
import {Linking, StyleSheet, Text, View} from 'react-native';
import {BarCodeScanner, Permissions} from 'expo';


export default class Scanscreen extends Component {
    constructor(props)
    {
        super(props);
      this.state = 
      {
          scanstring: '',
          interruptscan: false,
          successinfo: '',
          hasCameraPermission: null,
      };
    }

    async componentDidMount() {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status === 'granted'});
    }
    onSuccess(e) {
    Linking
      .openURL(e.data)
      .catch(err => console.error('Das hat nicht funktioniert....', err));
    }


    render() {
        const {hasCameraPermission, interruptscan} = this.state;
        if (interruptscan) {//Liegt ein Interrupt aus einem vorherigen Scan an, so wird die Query unterbrochen. Ansonsten würde dauerhauft neu gescannt werden(IOS)
            return <Text>Scanvorang unterbrochen</Text>;
        }
        if (hasCameraPermission === null) { //Wartet noch auf Permissions, es wurde noch keine Zustimmung/Ablehnung gesetzt
            return <Text>Kameraberechtigung freigeben...</Text>;
        }
        if (hasCameraPermission === false) { //User hat Permissions nicht autorisiert, oder es kam ein Fehler auf.
            return <Text>Leider wird die Kamera nicht unterstützt.</Text>;
        }
        return (
            <View style={{flex: 1}}>
                <BarCodeScanner
                    onBarCodeScanned={this.processBarcode}
                    barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                    style={StyleSheet.absoluteFill}
                />
                {/*<TouchableOpacity>*/}
                {/*<Text>OK. Got it!</Text>*/}
                {/*</TouchableOpacity>*/}
            </View>
            )
    }

    processBarcode = ({data}) => {//Dies wird beim Scanergebnis ausgeführt. Interrupt-Flag wird gesetzt und der String übergeben.
        this.setState({scanstring: data, interruptscan: true,});
        alert(`Bar code with data ${data} has been scanned!`);//DEBUG

    }


    
}