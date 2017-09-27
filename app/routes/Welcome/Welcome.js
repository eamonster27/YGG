import React, {Component} from 'react';
import {
  View,
  Text,
  AsyncStorage,
  Image } from 'react-native';

import {Actions} from 'react-native-router-flux';

import localIP from '../localIP'
import styles from '../../styles/styles';

class Welcome extends Component {
  constructor() {
    super();

    this.state = {
      firstname: 'Girl'
    };
  }

  componentWillMount(){
    this.getFirstname();
  }

  getFirstname() {
    let url = localIP.url;
    let path = '/user';

    AsyncStorage.getItem('access_token').then((token) => {
      fetch(`${url}${path}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          firstname: responseJson.firstname
        })
      })
      .done();
    })
  }

  render() {
    return (
      <View style={styles.welcomeContainer}>
        <Image
          source={require('../../images/yougogirl-logo.png')}
          style={{width: 250, height: 200}}
        />
        <Text style={styles.welcomeText}>You Go {this.state.firstname}</Text>
      </View>
    )
  }
}

export default Welcome
