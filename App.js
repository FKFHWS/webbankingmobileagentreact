import React, {Component} from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
// You can import from local files
// import AssetExample from './components/AssetExample';
import Login from './components/Login.js';
import Secured from './components/Secured.js';
import HomeScreen from './components/HomeScreen.js';
import Scanscreen from './components/Scanner.js';
import * as Communication from "./components/Communication";
import * as Storage from "./components/Storage";
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

const AppStack = createSwitchNavigator(
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
    if (Communication.checkSessionKey(userid, sessionKey))
        this.props.navigation.navigate('Secured');
}

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                userid: '',
                sessionKey: '',
            }
        Storage.getUserID().then((userid) => {
            this.setState({userid: userid})
        })
            .then(() => {
                Storage.getAppSessionKey().then((sessionKey) => {
                    this.setState({sessionKey: sessionKey})
                })
            })
            .then(() => {
                if (this.state.userid != "" && this.state.sessionKey != "") {
                    console.log("Login mit gespeicherter User-ID: " + this.state.userid + " und gespeichertem Session Key: " + this.state.sessionKey)
                    loginWithSessionKey(this.state.userid, this.state.sessionKey); //TODO: Hier muss später einmal get Masterdata hin... oder auch nicht
                }
            });
    }


    render() {
        return <AppContainer/>

    }
}
