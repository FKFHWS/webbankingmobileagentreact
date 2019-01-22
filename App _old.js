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
import { createStackNavigator, createAppContainer } from 'react-navigation';

// You can import from local files
// import AssetExample from './components/AssetExample';
import Login from './components/Login.js';
import Secured from './components/Secured.js';
import HomeScreen from './components/HomeScreen.js';
import Navigator from './Navigator.js';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

//export default createStackNavigator(Navigator);
export default class App extends React.Component
{
  constructor(props)
  {
    super(props)
  }
  render(){
    return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    )
  }

}
