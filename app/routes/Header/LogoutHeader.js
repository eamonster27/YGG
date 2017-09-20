import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  Alert,
  AsyncStorage,
  TouchableOpacity } from 'react-native';
import {Actions} from 'react-native-router-flux';

import styles from '../styles';

class LogoutHeader extends Component{

  async userLogout() {
    try {
      await AsyncStorage.removeItem('id_token');
      await AsyncStorage.removeItem('access_token');
      Alert.alert('Logged out!');
      Actions.Authentication();
    } catch(error) {
      onsole.log('AsyncStorage error: ' + error.message);
    }
  }

  render(){
    return(
      <View style={styles.header}>
        <TouchableOpacity style={styles.loginButtonWrapper} onPress={this.userLogout}>
          <Text style={styles.buttonText} > Log out </Text>
        </TouchableOpacity>
      </View>
    );
  }
}


export default LogoutHeader;
