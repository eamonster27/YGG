import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity } from 'react-native';

import styles from '../../styles/styles';

class inDetails extends Component {
  render(){
    return(
      <View style={styles.checkinBody}>
        <TextInput
          style={{textAlign: 'center', marginTop: 20, height: 40, width: '80%', borderColor: 'gray', borderWidth: 1}}
          placeholder="ifTime SnoozeDisable>Keypad ifPending CancelEdit"
          editable={false}
        />
      </View>
    );
  }
}

export default inDetails;
