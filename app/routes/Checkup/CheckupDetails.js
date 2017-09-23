import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity } from 'react-native';

import styles from '../../styles/styles';

class upDetails extends Component {
  render(){
    return(
      <View style={styles.checkupBody}>
        <TextInput
          style={{textAlign: 'center', marginTop: 20, height: 40, width: '80%', borderColor: 'gray', borderWidth: 1}}
          placeholder="ifApproved displayPings, ifPending displayDecline/Accept"
          editable={false}
        />
      </View>
    );
  }
}

export default upDetails;
