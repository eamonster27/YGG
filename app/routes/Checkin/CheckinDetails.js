import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Alert,
  AsyncStorage } from 'react-native';
import Geocoder from 'react-native-geocoding';
import {Actions} from 'react-native-router-flux';
import PushNotification from 'react-native-push-notification';
import styles from '../../styles/styles';
import localIP from '../localIP'

class inDetails extends Component {
  constructor(props){
    super(props);
    this.state = {
      checkin: this.props.checkin
    }
  }

  pressEdit(checkin){
    console.log(checkin)
    //Passcode interface then
    //Navigate to edit page before doing below
    console.log(checkin)
    let url = localIP.url;
    let checkinPath = `/update/checkin`;

    AsyncStorage.getItem('access_token').then((token) => {
      fetch(`${url}${checkinPath}`, {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: checkin.id,
          alerts: checkin.alerts++,
          status: checkin.status,
          address: checkin.address,
          lat: checkin.lat,
          lng: checkin.lng,
          time: checkin.time,
          requestStatus: checkin.requestStatus,
          emContactID: checkin.emContactID,
        })
      })
      .then((response) => { response.json() })
      .then((responseData) => {
        Actions.Main();
      })
      .done();
    })
  }

  pressCancel(checkin){
    console.log(checkin)
    //Navigate to passcode interace
    //Delete Checkup and Checkin
    let url = localIP.url;
    let checkupPath = `/delete/checkup`;

    AsyncStorage.getItem('access_token').then((token) => {
      fetch(`${url}${checkupPath}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify({
          CheckupID: checkin.CheckupID,
          CheckinID: checkin.id,

        })
      })
      .then((response) => { response.json() })
      .then((responseData) => {
        Actions.Main();
      })
      .done();
    })

  }

  pressSnooze(checkin){
    console.log(checkin)
    let url = localIP.url;
    let checkinPath = `/update/checkin`;

    AsyncStorage.getItem('access_token').then((token) => {
      fetch(`${url}${checkinPath}`, {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: checkin.id,
          alerts: checkin.alerts++,
          status: 'Snoozed',
          address: checkin.address,
          lat: checkin.lat,
          lng: checkin.lng,
          time: checkin.time,
          requestStatus: checkin.requestStatus,
          emContactID: checkin.emContactID,
        })
      })
      .then((response) => { response.json() })
      .then((responseData) => {
        PushNotification.localNotificationSchedule({
          message: "Checkin time!",
          date: new Date(Date.now() + (15*60*1000)),
          number: checkin.id.toString(),
        });
        Actions.Main();
      })
      .done();
    })

  }

  pressDisable(checkin){
    //Go to passcode interface before doing below.
    console.log(checkin)
    console.log(checkin)
    let url = localIP.url;
    let checkinPath = `/update/checkin`;

    AsyncStorage.getItem('access_token').then((token) => {
      fetch(`${url}${checkinPath}`, {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: checkin.id,
          alerts: checkin.alerts++,
          status: 'Disabled',
          address: checkin.address,
          lat: checkin.lat,
          lng: checkin.lng,
          time: checkin.time,
          requestStatus: checkin.requestStatus,
          emContactID: checkin.emContactID,
        })
      })
      .then((response) => { response.json() })
      .then((responseData) => {
        Actions.Main();
      })
      .done();
    })
  }

  pressRemove(checkin){
    console.log(checkin)

  }

//ifTime SnoozeDisable>Keypad ifPending CancelEdit
  render(){
    if(this.state.checkin.requestStatus === "Approved"){
      if(this.state.checkin.status === "Unresponsive"){
        return(
          <View style={styles.checkinBodyUnresponsive}>
            <TouchableOpacity style={styles.checkinButtonWrapperSnooze} onPress={() => {this.pressSnooze(this.state.checkin)}}>
              <Text style={styles.checkinButtonTextSnooze}> Snooze </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.checkinButtonWrapperDisable} onPress={() => {this.pressDisable(this.state.checkin)}}>
              <Text style={styles.checkinButtonTextDisable}> Disable </Text>
            </TouchableOpacity>
          </View>
        );
      }
      else if(this.state.checkin.status === "Snoozed") {
        return(
          <View style={styles.checkinBody}>
            <Text> Snoozed </Text>
          </View>
        );
      }
      else if(this.state.checkin.status === "Home") {
        return(
          <View style={styles.checkinBodyDeclined}>
            <View style={{width: '100%', height: '40%', flexDirection: 'column', justifyContent: 'center'}}>
              <Text style={{color: 'green', textAlign: 'center', fontSize: 25,}}>Your made it home!</Text>
            </View>
            <TouchableOpacity style={styles.checkinButtonWrapperRemove} onPress={() => {this.pressRemove(this.state.checkin)}}>
              <Text style={styles.checkinButtonTextRemove}> Remove </Text>
            </TouchableOpacity>
          </View>
        );
      }
      else if(this.state.checkin.status === "Scheduled") {
        return(
          <View style={styles.checkinBody}>
            <Text> Scheduled </Text>
          </View>
        );
      }
      else if(this.state.checkin.status === "Panic") {
        return(
          <View style={styles.checkinBody}>
            <Text> Panic </Text>
          </View>
        );
      }
      else if(this.state.checkin.status === "Disabled") {
        return(
          <View style={styles.checkinBody}>
            <Text> Disabled </Text>
          </View>
        );
      }
      else {
        return(
          <View style={styles.checkinBody}>
            <Text> What is happening? </Text>
          </View>
        );
      }
    }
    else if(this.state.checkin.requestStatus === "Pending"){
      return(
        <View style={styles.checkinBodyPending}>
          <TouchableOpacity style={styles.checkinButtonWrapperEdit} onPress={() => {this.pressEdit(this.state.checkin)}}>
            <Text style={styles.checkinButtonTextEdit}> Edit </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.checkinButtonWrapperCancel} onPress={() => {this.pressCancel(this.state.checkin)}}>
            <Text style={styles.checkinButtonTextCancel}> Cancel </Text>
          </TouchableOpacity>
        </View>
      );
    }
    else if(this.state.checkin.requestStatus === "Declined"){
      return(
        <View style={styles.checkinBodyDeclined}>
        <View style={{width: '100%', height: '40%', flexDirection: 'column', justifyContent: 'center'}}>
          <Text style={{color: 'red', textAlign: 'center', fontSize: 25,}}>Your Checkin request was declined</Text>
        </View>
          <TouchableOpacity style={styles.checkinButtonWrapperRemove} onPress={() => {this.pressRemove(this.state.checkin)}}>
            <Text style={styles.checkinButtonTextRemove}> Remove </Text>
          </TouchableOpacity>
        </View>
      );
    }
    else {
      return(
        <View style={styles.checkinBody}>
          <Text> No idea what is going on. </Text>
        </View>
      );
    }
  }
}

export default inDetails;
