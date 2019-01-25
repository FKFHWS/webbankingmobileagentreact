import React, {Component} from 'react';
import {Button, ScrollView, Text, View} from 'react-native';

export default class Secured extends Component {

  constructor(props) {
    super(props);
      const {navigate} = this.props.navigation;
  }

  render() {
    return (
      <ScrollView style={{ padding: 20 }}>
        <Text style={{ fontSize: 27 }}>Welcome</Text>
        <View style={{ margin: 20 }} />
          <Button onPress={this.props.navigation.navigate('HomeScreen')} title="Logout"/>
      </ScrollView>
    );
  }


}
