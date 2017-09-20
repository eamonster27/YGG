import React, {Component} from 'react';
import {
  View,
  Text,
  Image } from 'react-native';

import {Actions} from 'react-native-router-flux';

import styles from '../styles';

class Welcome extends Component {
  render() {
    return (
      <View style={styles.welcome}>
        <Image
          source={require('../../images/yougogirl-logo.png')}
          style={{width: 250, height: 200}}
        />
        <Text style={styles.splash}>You Go Girl</Text>
      </View>
    )
  }
}

export default Welcome
