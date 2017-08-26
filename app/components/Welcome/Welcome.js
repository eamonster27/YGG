import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View, Text, Image} from 'react-native';

export default class Welcome extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <Image
          source={require('../../images/yougogirl-logo.png')}
          style={{width: 115, height: 100}}
        />
        <Text style={styles.welcome}>You Go Girl</Text>
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

AppRegistry.registerComponent('Welcome', () => Welcome);
