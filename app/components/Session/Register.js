import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  TextInput } from 'react-native';
import Form from 'react-native-form';

//Edit into three page transitions(include descriptions):
//1. First, Last, Mobile
//2. Email, Password, Confirm password
//3. Panic Code, Pass Code
export default class Register extends Component {
  constructor(props){
    super(props);

    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      cell: '',
      passcode: '',
      paniccode: ''
    };
  }

  onPress(){
    console.log(this.state);
    // let url = 'https://yougogirl.herokuapp.com';
    let url = 'http://localhost:3000';
    let sessionPath = '/register';

    fetch(`${url}${sessionPath}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email.toLowerCase(),
        password: this.state.password,
        cell: this.state.cell,
        passcode: this.state.passcode,
        paniccode: this.state.paniccode,
      })
    })
    // .then((response) => response.json())
    // .then((responseData) => {
    //   console.log("responseData");
    //   console.log(responseData);
    // }).done();
  }

  render() {
    return (
      <Form style={styles.form} ref="form">
        <View style={styles.wrapper}>
          <Image
            source={require('../../images/yougogirl-logo.png')}
            style={styles.image}
          />
          <View style={styles.allInput}>
            <TextInput
              style={styles.textInput}
              onChangeText = {(first) => this.setState({firstname: first})}
              placeholder = "First name"
            />
            <TextInput
              style={styles.textInput}
              onChangeText = {(last) => this.setState({lastname: last})}
              placeholder = "Last name"
            />
            <TextInput
              style={styles.textInput}
              onChangeText = {(email) => this.setState({email: email})}
              placeholder = "Email"
              underlineColorAndroid = 'transparent'
            />
            <TextInput
              style={styles.textInput}
              onChangeText = {(password) => this.setState({password: password})}
              placeholder = "Password"
              underlineColorAndroid = 'transparent'
            />
            <TextInput
              style={styles.textInput}
              onChangeText = {(cell) => this.setState({cell: cell})}
              placeholder = "Mobile"
            />
            <TextInput
              style={styles.textInput}
              onChangeText = {(passcode) => this.setState({passcode: passcode})}
              placeholder = "Passcode"
            />
            <TextInput
              style={styles.textInput}
              onChangeText = {(paniccode) => this.setState({paniccode: paniccode})}
              placeholder = "Panic code"
            />
            <Button
              onPress={this.onPress.bind(this)}
              title="Register"
            />
          </View>
        </View>
      </Form>
    )
  }
}

const styles = StyleSheet.create({
  form: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  wrapper: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  image: {
    height: '20%',
    width: '50%',
    marginTop: 20,
    alignSelf: 'center',
  },
  allInput: {
    height: '80%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '7%',
    marginTop: -20,
  },
  textInput: {
    height: '7%',
    width: '75%',
    textAlign: 'center',
    fontSize: 18,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: '5%',
  }
});

AppRegistry.registerComponent('Register', () => Register);
