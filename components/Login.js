import React, {Component} from 'react';
import {Button, ScrollView, Text, TextInput,} from 'react-native';
import {SHA512} from "sha2";

export default class Login extends Component {

    constructor(props)
    {
      super(props);
      this.state = 
      {
          username: '',
          password: '',
          successinfo: ''
      };
    }    
    
    checkCredentials ()
    {
        let loginjson = fetch('https://194.95.221.67/api.php/records/kunde', {
            method: 'GET',
            body: {
                filter: 'ID,eq,' + this.state.username,
                filter: 'PASSWORD,eq,' + SHA512(this.state.password),
            }
        });


        return loginjson == "asdf";//Testweise.......
    }
    onLoginPress = () => {
        if ( this.checkCredentials() )
        {
          this.setState(
              {successinfo: 'Login erfolgreich'}//DEBUG
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
                <TextInput placeholder='Username' onEndEditing={value => this.setState({username: value})}/>
                <TextInput secureTextEntry placeholder='Password'
                           onEndEditing={value => this.setState({password: value})}/>
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