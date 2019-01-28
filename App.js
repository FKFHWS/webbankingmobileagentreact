import * as React from 'react';
import {createAppContainer, createStackNavigator} from 'react-navigation';
// You can import from local files
// import AssetExample from './components/AssetExample';
import Login from './components/Login.js';
import Secured from './components/Secured.js';
import HomeScreen from './components/HomeScreen.js';
import Scanscreen from './components/Scanner.js';
import {checkSessionKey} from "./components/Communication";
// or any pure javascript modules available in npm


// class TestWindow extends React.Component
// {
//   render()
//   {return(
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>
//       Das ist das Testfenster
//       </Text>
//       </View>
//   )}
// }

const AppStack = createStackNavigator(
  {
    Login: Login,
    Secured: Secured,
    Home: HomeScreen,
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

function loginWithSessionKey(userid, sessionKey) { //Versucht den User mit der gespeicherten SessionKey am Server zu registrieren. Hierbei werden bei Erfolg direkt die gesamten Stammdaten übertragen, um dem User einen Welcome-Screen zu ermöglichen.
    if (checkSessionKey(userid, sessionKey))
        this.props.navigation.navigate('Secured');
}
export default class App extends React.Component
{
  render(){
    return<AppContainer />

  }
}
