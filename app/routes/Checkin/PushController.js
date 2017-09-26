import React, { Component } from 'react';
import PushNotification from 'react-native-push-notification';

export default class PushController extends Component {
  constructor(){
    super();
    this.state = {
      lat: '',
      lng: '',
      time: '',
      CheckinID: 1,
    }
  }

  componentDidMount() {
    PushNotification.configure({

      onRegister: function(token) {
        console.log( 'TOKEN:', token );
      },

      onNotification: function(notification) {
        console.log( 'NOTIFICATION:', notification );
        console.log(this.state)

      }.bind(this),

      senderID: "889750153261",

      permissions: {
        alert: true,
        badge: true,
        sound: true
    },

    requestPermissions: true,
      
    })
  }

  render() {
    return null;
  }
}
