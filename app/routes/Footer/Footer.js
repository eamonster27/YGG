import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';

import styles from '../styles';

class Footer extends Component{

  render(){
    return(
      <View style={styles.footer}>
        <TouchableOpacity style={styles.buttonWrapper} onPress={Actions.Checkins}>
          <Text style={styles.buttonText}> Checkins </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonWrapper} onPress={Actions.Checkups}>
          <Text style={styles.buttonText}> Checkups </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Footer
