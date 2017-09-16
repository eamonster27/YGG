import React, {Component} from 'react';
import {
  AsyncStorage,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from './styles';

class Authentication extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      cell: '',
      passcode: '',
      paniccode: ''
    };
  }

  userRegister() {
    if(!this.state.email || !this.state.password) return;

    // let url = 'https://yougogirl.herokuapp.com';
    // let url = 'http://localhost:3000';
    let url = 'http://192.168.1.20:3000';
    let path = '/register';

    fetch(`${url}${path}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        cell: this.state.cell,
        passcode: this.state.passcode,
        paniccode: this.state.paniccode,
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      this.saveItem('id_token', responseData.id_token),
      Alert.alert('Success!'),
      Actions.Main();
    })
    .done();
  }

  userLogin() {
    if(!this.state.email || !this.state.password) return;

    // let url = 'https://yougogirl.herokuapp.com';
    // let url = 'http://localhost:3000';
    let url = 'http://192.168.1.20:3000';
    let path = '/auth';

    fetch(`${url}${path}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      this.saveItem('id_token', responseData.id_token),
      Alert.alert('Success!'),
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
      <View style={styles.container}>
        <Text style={styles.title}> You Go Girl </Text>

        <View style={styles.form}>
          <TextInput
            editable={true}
            onChangeText={(email) => this.setState({email})}
            placeholder='Email'
            ref='email'
            returnKeyType='next'
            style={styles.inputText}
            value={this.state.email}
          />

          <TextInput
            editable={true}
            onChangeText={(password) => this.setState({password})}
            placeholder='Password'
            ref='password'
            returnKeyType='next'
            secureTextEntry={true}
            style={styles.inputText}
            value={this.state.password}
          />

          <TouchableOpacity style={styles.buttonWrapper} onPress={this.userLogin.bind(this)}>
            <Text style={styles.buttonText}> Log In </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonWrapper} onPress={this.userRegister.bind(this)}>
            <Text style={styles.buttonText}> Register </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Authentication;
