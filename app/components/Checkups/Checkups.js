import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View, Text, Image} from 'react-native';

export default class Checkups extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.welcome}>Checkup</Text>
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

AppRegistry.registerComponent('Checkups', () => Checkups);
