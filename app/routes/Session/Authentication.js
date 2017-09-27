import React, {Component} from 'react';
import {
  AsyncStorage,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  View } from 'react-native';
import { Actions } from 'react-native-router-flux';

import localIP from '../localIP'
import styles from '../../styles/styles';

class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: this.props.error || '',
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
    let url = localIP.url;
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
    .then((response) => {
        if(response.status === 401) {
          return (Actions.Authentication({
            error: response._bodyText
          }))
        }
        else {
          response.json()
          .then((responseData) => {
            this.saveItem('id_token', responseData.id_token),
            this.saveItem('access_token', responseData.access_token),
            Actions.Main();
          })
          .done();
        }
    })
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
          <Text style={styles.errorText}> {this.state.error} </Text>

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
