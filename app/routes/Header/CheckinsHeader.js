import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  TouchableOpacity } from 'react-native';
import {Actions} from 'react-native-router-flux';

import styles from '../styles';

class CheckinsHeader extends Component{

  render(){
    return(
      <View style={styles.newCheckinHeader}>
        <TouchableOpacity style={styles.newCheckinButtonWrapper} onPress={Actions.NewCheckin}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


export default CheckinsHeader;
