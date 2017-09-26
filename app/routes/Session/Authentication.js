import React, {Component} from 'react';
import {
  AsyncStorage,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  View } from 'react-native';
import { Actions } from 'react-native-router-flux';

import styles from '../../styles/styles';

class Authentication extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  renderRegister() {
    Actions.Register({
      email: this.state.email.toLowerCase(),
      password: this.state.password
    });
  }

  userLogin() {
    if(!this.state.email || !this.state.password) return;

    // let url = 'https://yougogirl.herokuapp.com';
    // let url = 'http://localhost:3000';
    let url = 'http://10.0.0.145:3000';
    // let url = 'http://172.20.10.3:3000';
    let path = '/auth';

    fetch(`${url}${path}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email.toLowerCase(),
        password: this.state.password,
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      this.saveItem('id_token', responseData.id_token),
      this.saveItem('access_token', responseData.access_token),
      Actions.Main();
    })
    .done();
  }

  async saveItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message);
    }
  }

  render() {
    return (
      <View style={styles.authContainer}>
      <View style={styles.welcomeContainer}>
        <Image
          source={require('../../images/yougogirl-logo.png')}
          style={{width: 250, height: 200}}
        />
        <Text style={styles.welcomeText}>You Go Girl</Text>
      </View>

        <View style={styles.authForm}>
          <TextInput
            editable={true}
            onChangeText={(email) => this.setState({email})}
            placeholder='Email'
            ref='email'
            returnKeyType='next'
            style={styles.authInputText}
            value={this.state.email}
            underlineColorAndroid = 'transparent'
          />

          <TextInput
            editable={true}
            onChangeText={(password) => this.setState({password})}
            placeholder='Password'
            ref='password'
            returnKeyType='next'
            secureTextEntry={true}
            style={styles.authInputText}
            value={this.state.password}
            underlineColorAndroid = 'transparent'
          />

          <View style={styles.authLoginRegister}>
            <TouchableOpacity style={styles.authButtonWrapper} onPress={this.renderRegister.bind(this)}>
              <Text style={styles.authButtonText}> Register </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.authButtonWrapper} onPress={this.userLogin.bind(this)}>
              <Text style={styles.authButtonText}> Log In </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default Authentication;
