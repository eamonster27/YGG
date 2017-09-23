import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Picker,
  AsyncStorage,
  Platform } from 'react-native';

import Form from 'react-native-form';
import MapView from 'react-native-maps';
import PushNotification from 'react-native-push-notification';
import {Actions} from 'react-native-router-flux';
import PropTypes from 'prop-types';
import Geocoder from 'react-native-geocoding';

Geocoder.setApiKey('AIzaSyD7A419LWMHGOXzXWr1GrSWEL-bLE70lP4');

import styles from '../../../styles/styles';
import PushController from '../PushController';

// Perhaps this should be EDITCHECKIN. + or Existing checkin is selected.
// This should check to see if it was passed existing info and populate it in relevant fields.
// Otherwise, new checkin creation.
class NewCheckin extends Component {
  constructor(props){
    super(props);
    let now = new Date(Date.now());
    this.state = {
      lat: '29.7604',
      lng: '-95.3698',
      time: null,
      hour: now.getHours(),
      minute: (now.getMinutes() - (now.getMinutes() % 5) + 5),
      address: '',
    };
    this.scheduleNotification = this.scheduleNotification.bind(this);
  }

  scheduleNotification() {
    let now = new Date(Date.now());
    let currentHour = now.getHours();
    let currentMinute = now.getMinutes();

    let netMinuteDifference = ((this.state.hour * 60) + this.state.minute) - ((currentHour * 60) + currentMinute);
    PushNotification.localNotificationSchedule({
      message: "Checkin time!",
      date: new Date(Date.now() + (netMinuteDifference) * 60 * 1000 ),
    });
  }

  getLatLng(address){
    Geocoder.getFromLocation(address).then(
      json => {
        var location = json.results[0].geometry.location;
        this.setState({
          lat: location.lat.toString(),
          lng: location.lng.toString()
        })
      },
      error => {
        console.log(error)
      }
    );
  }

  setHour(hour){
    let now = new Date(Date.now());
    this.setState({
      time: new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), hour, this.state.minute, 0)),
      hour: hour
    })
  }

  setMinute(minute){
    let now = new Date(Date.now());
    this.setState({
      time: new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), this.state.hour, minute, 0)),
      minute: minute
    })
  }

  onPress(){
    // let url = 'http://10.0.0.145:3000'; //Update to heroku
    let url = 'http://172.20.10.3:3000';
    let checkinPath = `/create/checkin`;

    let now = new Date(Date.now());

    this.setState({
      time: new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), this.state.hour, this.state.minute, 0))
    })

    AsyncStorage.getItem('access_token').then((token) => {
      fetch(`${url}${checkinPath}`, {
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
          emContactID: this.props.emContactID,
          UserID: this.props.UserID,
        })
      }).done(this.scheduleNotification()) //ERROR MESSAGES!//ERROR MESSAGES!

      // .then((response) => response.json())
      // .then((responseData) => {
      //   console.log("responseData");
      //   console.log(responseData);
      // }).done();
    })
    .then(Actions.Main)
  }

  // Address instead. Then convert address into latlng.
  // Time should look similar to apple alarm clock page. Scroll select times.
  //Enter emergency contact phone number. Should find user with that number. When selected, passes emContactID.
  //Change button to a better functioning button.
  render() {
    return (
      <Form style={{width: '100%', height: '100%'}} ref="form">
        <View style={styles.addCheckinContainer}>
          <MapView style={styles.addCheckinMap}
            provider={this.props.provider}
            region={{
              latitude: parseFloat(this.state.lat),
              longitude: parseFloat(this.state.lng),
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0420,
            }}
          >
            <MapView.Marker
              coordinate={{
                latitude: parseFloat(this.state.lat),
                longitude: parseFloat(this.state.lng),
              }}
              title={"Home"}
              description={"Description"}
              pinColor='#3498db'
            />
          </MapView>

          <TextInput
            style={{textAlign: 'left', paddingLeft: 10, width: '100%', height: 45, fontSize: 18, backgroundColor: 'white', color: 'black'}}
            onChangeText = {(address) => this.getLatLng(address)}
            placeholder="Address "
            underlineColorAndroid = 'transparent'
          />
          <View style={styles.addCheckinBody}>
            <View style={styles.addCheckinTime}>
              <Picker
                style={styles.addCheckinPicker}
                selectedValue={this.state.hour}
                onValueChange={(hour) => this.setHour(hour)}
              >
                <Picker.Item label="00" value={0}/>
                <Picker.Item label="01" value={1}/>
                <Picker.Item label="02" value={2}/>
                <Picker.Item label="03" value={3}/>
                <Picker.Item label="04" value={4}/>
                <Picker.Item label="05" value={5}/>
                <Picker.Item label="06" value={6}/>
                <Picker.Item label="07" value={7}/>
                <Picker.Item label="08" value={8}/>
                <Picker.Item label="09" value={9}/>
                <Picker.Item label="10" value={10}/>
                <Picker.Item label="11" value={11}/>
                <Picker.Item label="12" value={12}/>
                <Picker.Item label="13" value={13}/>
                <Picker.Item label="14" value={14}/>
                <Picker.Item label="15" value={15}/>
                <Picker.Item label="16" value={16}/>
                <Picker.Item label="17" value={17}/>
                <Picker.Item label="18" value={18}/>
                <Picker.Item label="19" value={19}/>
                <Picker.Item label="20" value={20}/>
                <Picker.Item label="21" value={21}/>
                <Picker.Item label="22" value={22}/>
                <Picker.Item label="23" value={23}/>
              </Picker>

              <Picker
                style={styles.addCheckinPicker}
                selectedValue={this.state.minute}
                onValueChange={(minute) => this.setMinute(minute)}
              >
                <Picker.Item label="00" value={0}/>
                <Picker.Item label="05" value={5}/>
                <Picker.Item label="10" value={10}/>
                <Picker.Item label="15" value={15}/>
                <Picker.Item label="20" value={20}/>
                <Picker.Item label="25" value={25}/>
                <Picker.Item label="30" value={30}/>
                <Picker.Item label="35" value={35}/>
                <Picker.Item label="40" value={40}/>
                <Picker.Item label="45" value={45}/>
                <Picker.Item label="50" value={50}/>
                <Picker.Item label="55" value={55}/>
              </Picker>
              <PushController />

            </View>

            <TouchableOpacity style={styles.submitNewCheckinButtonWrapper} onPress={this.onPress.bind(this)}>
              <Text style={styles.submitNewCheckinButtonText}> Submit </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Form>
    )
  }
}

NewCheckin.propTypes = {
  provider: MapView.ProviderPropType,
};

export default NewCheckin;
