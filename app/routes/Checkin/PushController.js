import React, { Component } from 'react';
import PushNotification from 'react-native-push-notification';
import localIP from '../localIP'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Picker,
  Alert,
  AsyncStorage,
  Platform } from 'react-native';
export default class PushController extends Component {
  constructor(props){
    super(props);
    this.state = {
      lat: '',
      lng: '',
      time: '',
      Checkin: null,
      home: false,
    }
  }

  componentWillMount() {
    PushNotification.configure({
      onRegister: function(token) {
        console.log( 'TOKEN:', token );
      },

      onNotification: function(notification) {
        console.log( 'NOTIFICATION:', notification );
        let now = new Date(Date.now());
        let currentYear = now.getFullYear();
        let currentMonth = now.getMonth();
        let currentDay = now.getDate();
        let currentHour = now.getHours();
        let currentMinute = now.getMinutes();
        let currentTime = (new Date(Date.UTC(currentYear, currentMonth, currentDay, currentHour, currentMinute, 0, 0))).getTime();

        navigator.geolocation.getCurrentPosition((position) => {
          this.setState({
            lat: position.coords.latitude.toString(),
            lng: position.coords.longitude.toString(),
            time: currentTime,
          })

          let url = localIP.url;
          let pingPath = `/create/ping`;
          AsyncStorage.getItem('access_token').then((token) => {
            fetch(`${url}${pingPath}`, {
              method: 'POST',
              headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                lat: this.state.lat,
                lng: this.state.lng,
                time: this.state.time,
                CheckinID: parseInt(notification.number)
              })
            })
            .then((response) => response.json())
            .then((responseData) => {
              this.setState({
                Checkin: responseData.checkin
              })
              if((Math.abs(parseFloat(position.coords.latitude) - parseFloat(responseData.checkin.lat)) < 0.0004) && (Math.abs(parseFloat(position.coords.longitude) - parseFloat(responseData.checkin.lng)) < 0.0004)){
                this.setState({
                  home: true,
                })
              }
              else {
                PushNotification.localNotificationSchedule({
                  message: "Checkin time!",
                  date: new Date(Date.now() + (5*60*1000)),
                  number: notification.number
                });
              }
            })

          })
        })
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
