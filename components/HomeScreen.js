import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  AppRegistry,
  Button,
  Slider,
  TouchableOpacity,
} from 'react-native';
import { Constants } from 'expo';
import { createStackNavigator } from 'react-navigation';



export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      slectedpage: '0',
      text: 'Randomtextxtxtxtxtt',
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

        this.props.navigation.navigate('Scanner');
    }
  };

  refreshInput = function(x) {
    this.setState({ slidewert: x });
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>{this.state.text}</Text>
        <Button onPress={this.tempViewer} title="Drück mich" />
        <Slider onSlidingComplete={value => this.refreshInput(value)} />
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
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
