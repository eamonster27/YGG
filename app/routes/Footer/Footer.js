import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';

import styles from '../../styles/styles';

class Footer extends Component{

  render(){
    return(
      <View style={styles.mainFooter}>
        <TouchableOpacity style={styles.checkinsButtonWrapper} onPress={Actions.Checkins}>
          <Text style={styles.checkinsButtonText}> Checkins </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.checkupsButtonWrapper} onPress={Actions.Checkups}>
          <Text style={styles.checkupsButtonText}> Checkups </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Footer
