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
      <Form style={styles.container} ref="form">
        <View style={styles.container}>
          <TextInput
            style={{textAlign: 'center', marginTop: 20, height: 20, width: '80%', borderColor: 'gray', borderWidth: 1}}
            onChangeText = {(email) => this.setState({email: email})}
            placeholder = "Email:"
          />
          <TextInput
            style={{textAlign: 'center', marginTop: 20, height: 20, width: '80%', borderColor: 'gray', borderWidth: 1}}
            onChangeText = {(password) => this.setState({password: password})}
            placeholder = "Password:"
          />
          <Button
            onPress={this.onPress.bind(this)}
            title="Submit"
          />
        </View>
      </Form>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    height: '80%'
  }
});

AppRegistry.registerComponent('Login', () => Login);
