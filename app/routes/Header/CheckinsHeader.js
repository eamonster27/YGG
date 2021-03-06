import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  TouchableOpacity } from 'react-native';
import {Actions} from 'react-native-router-flux';

import styles from '../../styles/styles';

class CheckinsHeader extends Component{

  render(){
    return(
      <View style={styles.checkinsHeader}>
        <TouchableOpacity style={styles.addCheckinButtonWrapper} onPress={Actions.SelectEm}>
          <Text style={styles.addCheckinButtonText}>Schedule a Checkin</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


export default CheckinsHeader;
