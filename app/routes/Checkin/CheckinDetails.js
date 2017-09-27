import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity } from 'react-native';

import styles from '../../styles/styles';

class inDetails extends Component {
  constructor(props){
    super(props);
    this.state = {
      checkin: this.props.checkin
    }
  }

  pressEdit(checkin){
    console.log(checkin)
  }

  pressCancel(checkin){
    console.log(checkin)
  }

  pressSnooze(checkin){
    console.log(checkin)
  }

  pressDisable(checkin){
    console.log(checkin)
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
