import React, { Component  } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
    StyleSheet,
} from 'react-native';

export default class Login extends Component {

    constructor(props)
    {
      super(props);
      this.state = 
      {
        password: '',
        successinfo: ''
      };
    }    
    
    checkCredentials ()
    {
      return Math.random() >= 0.5;//Testweise.......
    }
    onLoginPress = () => {
        if ( this.checkCredentials() )
        {
          this.setState(
            {successinfo: 'Login erfolgreich'}
          );
          //this.props.navigation.navigate('Secured');
        }
        else
        {
         this.setState(
            {successinfo: 'Falscher Username oder Passwort'}
         );
        }
    }

    render() {
        return (
            <ScrollView style={{padding: 20}}>
                <Text style={{fontSize: 27}}>
                    Login
                </Text>
                <TextInput placeholder='Username' />
                <TextInput secureTextEntry= 'true' placeholder='Password' />
                <Button 
                          onPress={this.onLoginPress}
                          title="Submit"
                      />
                <Text>
                {this.state.successinfo}
                </Text>
                  </ScrollView>
            )
    }



    
}

      
// class PasswordInput extends TextInput 
// {

// }

// const styles = StyleSheet.create({
//   passwordinput:
//   {
//     -Webkit-text-security: 'disc',
//     text-security: 'disc',
//   },
// })