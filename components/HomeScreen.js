import * as React from 'react';
import {Platform, Slider, StyleSheet, Text, View} from 'react-native';
import {Constants} from 'expo';
import {Button} from 'react-native-elements'


export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      slectedpage: '0',
        text: 'Randomtextxtxtxtxtxtxt',
      slidewert: 0,
    };
    const { navigate } = this.props.navigation;
  }


  tempViewer = () => {
    switch (this.state.slidewert) {
      case 0:
        this.setState({ text: 'Case 0' });
        this.props.navigation.navigate('Login');
        break;
      case 1:
        this.setState({ text: 'Case 1' });

        this.props.navigation.navigate('Secured');
        break;
        default:
        this.setState({ text: 'Case 2' });

            this.props.navigation.navigate('Scanscreen');
    }
  };

  refreshInput = function(x) {
    this.setState({ slidewert: x });
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>{this.state.text}</Text>
          <Button onPress={this.tempViewer} buttonStyle={styles.myOkButton} title="Drück mich"/>

          <Slider style={styles.mySlider} onSlidingComplete={value => this.refreshInput(value)}/>
        <Text>{this.state.slidewert}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,

    backgroundColor: '#ecf0f1',
    padding: 8,
  },
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
    mySlider: {
        marginTop: Platform.OS === 'android' ? '7%' : '0%',
    },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
