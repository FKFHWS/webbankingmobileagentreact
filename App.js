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
import Scanscreen from './components/Scanner.js';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';


class TestWindow extends React.Component
{
  render()
  {return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>
      Das ist das Testfenster
      </Text>
      </View>
  )}
}

const AppStack = createStackNavigator(
  {
    Login: Login,
    Secured: Secured,
    Home: HomeScreen,
    Test: TestWindow,
    Scanscreen: Scanscreen
  },
  {
  initialRouteName: "Home"
  },
/*  {
    defaultNavigationOptions: {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#0a0',
      },
    },
    navigationOptions: {
      tabBarLabel: 'Home!',
    },
  }*/
);
const AppContainer =  createAppContainer(AppStack);

export default class App extends React.Component
{
  render(){
    return<AppContainer />

  }
}
