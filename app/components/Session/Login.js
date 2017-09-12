import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View, Text, Image, Button, TextInput} from 'react-native';
import Form from 'react-native-form';

export default class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  onPress(){
    // let url = 'https://yougogirl.herokuapp.com/';
    let url = 'http://localhost:3000/';
    let sessionPath = 'auth';

    fetch(`${url}${sessionPath}`, {
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
    // .then((response) => {
    //   response.json()
    // }).then((responseData) => {
    //    console.log(responseData);
    //    //redirect
    // })
  }

  render() {
    // if(this.state.submitted){
    //   return(
    //     <Redirect to="/"/>
    //   )
    // }
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

            <Button
              onPress={this.onPress.bind(this)}
              title="Log in"
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
    height: '30%',
    width: '50%',
    alignSelf: 'center',
  },
  allInput: {
    height: '35%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: '16%',
    width: '75%',
    textAlign: 'center',
    fontSize: 18,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: '5%',
  }
});

AppRegistry.registerComponent('Login', () => Login);
