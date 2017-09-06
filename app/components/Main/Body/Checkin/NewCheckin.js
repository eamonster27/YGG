import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View, Text, Image, Button, TextInput} from 'react-native';
import Form from 'react-native-form';

// Perhaps this should be EDITCHECKIN. + or Existing checkin is selected.
// This should check to see if it was passed existing info and populate it in relevant fields.
// Otherwise, new checkin creation.
export default class NewCheckin extends Component {
  constructor(props){
    super(props);

    this.state = {
      status: '',
      lat: '',
      lng: '',
      time: '',
      requestStatus: '',
      emContactID: null,
      UserID: 1, //UPDATE with user data stored in local storage
    };
  }

  onPress(){
    console.log(this.state);

    let url = 'http://localhost:3000/'; //Update to heroku
    let checkinPath = `user/${this.state.UserID}/new-checkin`; //May not need user url param when local storage is used.

    fetch(`${url}${checkinPath}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: "On Schedule",
        lat: this.state.lat,
        lng: this.state.lng,
        time: this.state.time,
        requestStatus: "Pending",
        emContactID: this.state.emContactID,
        UserID: this.state.UserID,
      })
    }) //ERROR MESSAGES!//ERROR MESSAGES!

    // .then((response) => response.json())
    // .then((responseData) => {
    //   console.log("responseData");
    //   console.log(responseData);
    // }).done();
  }

  // Address instead. Then convert address into latlng.
  // Time should look similar to apple alarm clock page. Scroll select times.
  //Enter emergency contact phone number. Should find user with that number. When selected, passes emContactID.
  //Change button to a better functioning button.
  render() {
    return (
      <Form style={styles.container} ref="form">
        <View style={styles.container}>
          <TextInput
            style={{textAlign: 'center', marginTop: 20, height: 20, width: '80%', borderColor: 'gray', borderWidth: 1}}
            onChangeText = {(lat) => this.setState({lat: lat})}
            placeholder="Latitude:"
          />
          <TextInput
            style={{textAlign: 'center', marginTop: 20, height: 20, width: '80%', borderColor: 'gray', borderWidth: 1}}
            onChangeText = {(lng) => this.setState({lng: lng})}
            placeholder = "Longitude:"
          />
          <TextInput
            style={{textAlign: 'center', marginTop: 20, height: 20, width: '80%', borderColor: 'gray', borderWidth: 1}}
            onChangeText = {(time) => this.setState({time: time})}
            placeholder = "Time:"
          />
          <TextInput
            style={{textAlign: 'center', marginTop: 20, height: 20, width: '80%', borderColor: 'gray', borderWidth: 1}}
            onChangeText = {(emContactID) => this.setState({emContactID: emContactID})}
            placeholder = "Emergency Contact ID:"
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

AppRegistry.registerComponent('NewCheckin', () => NewCheckin);
