import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View, Text, Image} from 'react-native';

export default class Login extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.welcome}>Login</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  welcome: {
    color: '#8880ff',
    fontSize: 24
  }
});

AppRegistry.registerComponent('Login', () => Login);
