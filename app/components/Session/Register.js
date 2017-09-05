import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View, Text, Image, Button, TextInput} from 'react-native';
import Form from 'react-native-form';

export default class Register extends Component {
  constructor(props){
    super(props);

    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      cell: "",
      passcode: "",
      paniccode: ""
    };
  }

  onPress(){
    console.log(this.state);
    let url = "http://localhost:3000";
    let userPath = "create/user";

    fetch(`${url}/${userPath}`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
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
    // if(this.state.submitted){
    //   return(
    //     <Redirect to="/"/>
    //   )
    // }
    return (
      <Form style={styles.container} ref="form">
        <View style={styles.container}>
          <TextInput
            type="TextInput"
            style={{textAlign: 'center', marginTop: 20, height: 20, width: '80%', borderColor: 'gray', borderWidth: 1}}
            onChangeText = {(first) => this.setState({firstname: first})}
            placeholder="First:"
          />
          <TextInput
            type="TextInput"
            style={{textAlign: 'center', marginTop: 20, height: 20, width: '80%', borderColor: 'gray', borderWidth: 1}}
            onChangeText = {(last) => this.setState({lastname: last})}
            placeholder = "Last:"
          />
          <TextInput
            type="TextInput"
            style={{textAlign: 'center', marginTop: 20, height: 20, width: '80%', borderColor: 'gray', borderWidth: 1}}
            onChangeText = {(email) => this.setState({email: email})}
            placeholder = "Email:"
          />
          <TextInput
            type="TextInput"
            style={{textAlign: 'center', marginTop: 20, height: 20, width: '80%', borderColor: 'gray', borderWidth: 1}}
            onChangeText = {(password) => this.setState({password: password})}
            placeholder = "Password:"
          />
          <TextInput
            type="TextInput"
            style={{textAlign: 'center', marginTop: 20, height: 20, width: '80%', borderColor: 'gray', borderWidth: 1}}
            onChangeText = {(cell) => this.setState({cell: cell})}
            placeholder = "Mobile:"
          />
          <TextInput
            type="TextInput"
            style={{textAlign: 'center', marginTop: 20, height: 20, width: '80%', borderColor: 'gray', borderWidth: 1}}
            onChangeText = {(passcode) => this.setState({passcode: passcode})}
            placeholder = "Passcode:"
          />
          <TextInput
            type="TextInput"
            style={{textAlign: 'center', marginTop: 20, height: 20, width: '80%', borderColor: 'gray', borderWidth: 1}}
            onChangeText = {(paniccode) => this.setState({paniccode: paniccode})}
            placeholder = "Paniccode:"
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

AppRegistry.registerComponent('Register', () => Register);
