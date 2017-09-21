import React, {Component} from 'react';
import {
  AsyncStorage,
  Alert,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  View } from 'react-native';
import { Actions } from 'react-native-router-flux';

import styles from '../../styles/styles';

class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email,
      password: this.props.password,
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
    let url = 'http://10.0.0.145:3000';
    let path = '/register';

    fetch(`${url}${path}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email.toLowerCase(),
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
      this.saveItem('access_token', responseData.access_token),
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
      <View style={styles.regContainer}>
      <View style={styles.regWelcomeContainer}>
        <Image
          source={require('../../images/yougogirl-logo.png')}
          style={{width: 150, height: 100}}
        />
        <Text style={styles.regWelcomeText}>You Go Girl</Text>
      </View>

        <View style={styles.regForm}>
          <TextInput
            editable={true}
            onChangeText={(email) => this.setState({email})}
            placeholder='Email'
            ref='email'
            returnKeyType='next'
            style={styles.regInputText}
            value={this.state.email}
          />

          <TextInput
            editable={true}
            onChangeText={(password) => this.setState({password})}
            placeholder='Password'
            ref='password'
            returnKeyType='next'
            secureTextEntry={true}
            style={styles.regInputText}
            value={this.state.password}
          />

          <TextInput
            editable={true}
            onChangeText={(firstname) => this.setState({firstname})}
            placeholder='First Name'
            ref='firstname'
            returnKeyType='next'
            style={styles.regInputText}
            value={this.state.firstname}
          />

          <TextInput
            editable={true}
            onChangeText={(lastname) => this.setState({lastname})}
            placeholder='Last Name'
            ref='lastname'
            returnKeyType='next'
            style={styles.regInputText}
            value={this.state.lastname}
          />

          <TextInput
            editable={true}
            onChangeText={(cell) => this.setState({cell})}
            placeholder='Mobile'
            ref='cell'
            returnKeyType='next'
            style={styles.regInputText}
            value={this.state.cell}
          />

          <TextInput
            editable={true}
            onChangeText={(passcode) => this.setState({passcode})}
            placeholder='Passcode'
            ref='passcode'
            returnKeyType='next'
            style={styles.regInputText}
            value={this.state.passcode}
          />

          <TextInput
            editable={true}
            onChangeText={(paniccode) => this.setState({paniccode})}
            placeholder='Panic Code'
            ref='paniccode'
            returnKeyType='next'
            style={styles.regInputText}
            value={this.state.paniccode}
          />

          <View style={styles.regLoginRegister}>
            <TouchableOpacity style={styles.regButtonWrapper} onPress={this.userRegister.bind(this)}>
              <Text style={styles.regButtonText}> Register </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default Authentication;
