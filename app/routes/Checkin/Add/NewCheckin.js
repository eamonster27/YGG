import React, {Component} from 'react';
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

import MapView from 'react-native-maps';
import PushNotification from 'react-native-push-notification';
import {Actions} from 'react-native-router-flux';
import PropTypes from 'prop-types';
import Geocoder from 'react-native-geocoding';

Geocoder.setApiKey('AIzaSyC6vpeu7WmBMNIb1aLb9pOuPdh7m3vz1w8');

import localIP from '../../localIP'
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
      emContactID: this.props.emContactID,
      UserName: this.props.UserName,
      UserID: this.props.UserID,
      address: '3403 Audubon Pl',
      lat: '29.7604',
      lng: '-95.3698',
      time: '',
      year: now.getFullYear(),
      month: now.getMonth(),
      day: now.getDate(),
      hour: now.getHours(),
      minute: (now.getMinutes() - (now.getMinutes() % 5)),
      daysInMonth: [],
    };

    this.scheduleNotification = this.scheduleNotification.bind(this);
    this.getLatLng = this.getLatLng.bind(this);
    this.getAddress = this.getAddress.bind(this);
    this.renderDaysInMonth = this.renderDaysInMonth.bind(this);

  }

  componentWillMount(){
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        lat: position.coords.latitude.toString(),
        lng: position.coords.longitude.toString(),
      })
    },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    let now = new Date(Date.now());
    this.renderDaysInMonth(now.getMonth(), now.getFullYear())
  }

  scheduleNotification(netMinuteDifference, checkin) {
    PushNotification.localNotificationSchedule({
      message: "Checkin time!",
      date: new Date(Date.now() + (netMinuteDifference)),
      number: checkin.id.toString(),
    });
  }

  getLatLng(address){
    Geocoder.getFromLocation(address).then(
      json => {
        var location = json.results[0].geometry.location;
        this.getAddress(location.lat.toString(), location.lng.toString())
      },
      error => {
        console.log(error)
      }
    );
  }

  getAddress(lat, lng) {
    Geocoder.getFromLatLng(lat, lng).then((json) => {
        this.setState({
          lat: lat,
          lng: lng,
          address: json.results[0].address_components[0].long_name + " " +
          json.results[0].address_components[1].long_name,
        })
      },
      error => {
        console.log(error);
      }
    )
  }

  setTime(type, value){
    let now = new Date(Date.now());
    switch(type){
      case 'year':
        this.setState({
          time: new Date(Date.UTC(value, this.state.month, this.state.day, this.state.hour, this.state.minute, 0, 0)),
          year: value
        })
        break;
      case 'month':
        this.setState({
          time: new Date(Date.UTC(this.state.year, value, this.state.day, this.state.hour, this.state.minute, 0, 0)),
          month: value
        })
        break;
      case 'day':
        this.setState({
          time: new Date(Date.UTC(this.state.year, this.state.month, value, this.state.hour, this.state.minute, 0, 0)),
          day: value
        })
        break;
      case 'hour':
        this.setState({
          time: new Date(Date.UTC(this.state.year, this.state.month, this.state.day, value, this.state.minute, 0, 0)),
          hour: value
        })
        break;
      case 'minute':
        this.setState({
          time: new Date(Date.UTC(this.state.year, this.state.month, this.state.day, this.state.hour, value, 0, 0)),
          minute: value
        })
        break;
    }
  }

  onPress(){
    let now = new Date(Date.now());

    let currentYear = now.getFullYear();
    let currentMonth = now.getMonth();
    let currentDay = now.getDate();
    let currentHour = now.getHours();
    let currentMinute = now.getMinutes();

    let currentTime = (new Date(Date.UTC(currentYear, currentMonth, currentDay, currentHour, currentMinute, 0, 0))).getTime();
    let checkinTime = (new Date(Date.UTC(this.state.year, this.state.month, this.state.day, this.state.hour, this.state.minute, 0, 0))).getTime();
    let netMinuteDifference = checkinTime - currentTime;

    if(netMinuteDifference > 0) {
      let url = localIP.url;
      let checkinPath = `/create/checkin`;

      this.setState({
        time: new Date(Date.UTC(this.state.year, this.state.month, this.state.day, this.state.hour, this.state.minute, 0, 0))
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
            UserName: this.state.UserName,
            address: this.state.address,
            lat: this.state.lat,
            lng: this.state.lng,
            time: this.state.time,
            emContactID: this.state.emContactID,
          })
        })
        .then((response) => response.json())
        .then((responseData) => {
          console.log(responseData);
          console.log(responseData);
          console.log(responseData);
          this.scheduleNotification(netMinuteDifference, responseData)
          Actions.Main();
        })
        .done();
      })

    }
    else {
      Alert.alert('Checkin times be after the current time!');
    }
  }

  renderDaysInMonth(month, year){
    switch(month){
      case 0:
      case 2:
      case 4:
      case 6:
      case 7:
      case 9:
      case 11:
        return (
          <Picker
            style={styles.addCheckinPickerDay}
            selectedValue={this.state.day}
            onValueChange={(day) => this.setTime('day', day)}
          >
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
            <Picker.Item label="24" value={24}/>
            <Picker.Item label="25" value={25}/>
            <Picker.Item label="26" value={26}/>
            <Picker.Item label="27" value={27}/>
            <Picker.Item label="28" value={28}/>
            <Picker.Item label="29" value={29}/>
            <Picker.Item label="30" value={30}/>
            <Picker.Item label="31" value={31}/>
          </Picker>
        )
        break;
      case 3:
      case 5:
      case 8:
      case 10:
        return (
          <Picker
            style={styles.addCheckinPickerDay}
            selectedValue={this.state.day}
            onValueChange={(day) => this.setTime('day', day)}
          >
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
            <Picker.Item label="24" value={24}/>
            <Picker.Item label="25" value={25}/>
            <Picker.Item label="26" value={26}/>
            <Picker.Item label="27" value={27}/>
            <Picker.Item label="28" value={28}/>
            <Picker.Item label="29" value={29}/>
            <Picker.Item label="30" value={30}/>
          </Picker>
        )
        break;
      case 1:
        if(year % 4 === 0) { return (
          <Picker
            style={styles.addCheckinPickerDay}
            selectedValue={this.state.day}
            onValueChange={(day) => this.setTime('day', day)}
          >
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
            <Picker.Item label="24" value={24}/>
            <Picker.Item label="25" value={25}/>
            <Picker.Item label="26" value={26}/>
            <Picker.Item label="27" value={27}/>
            <Picker.Item label="28" value={28}/>
            <Picker.Item label="29" value={29}/>
          </Picker>
        ) }
        else{ return (
          <Picker
            style={styles.addCheckinPickerDay}
            selectedValue={this.state.day}
            onValueChange={(day) => this.setTime('day', day)}
          >
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
            <Picker.Item label="24" value={24}/>
            <Picker.Item label="25" value={25}/>
            <Picker.Item label="26" value={26}/>
            <Picker.Item label="27" value={27}/>
            <Picker.Item label="28" value={28}/>
          </Picker>
        ) };
        break;
    }
  }

  //Change button to a better functioning button.
  render() {
    return (
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
          placeholder="Where you're staying"
          underlineColorAndroid = 'transparent'
        />

        <View style={{width: '100%'}}>
          <Text style={{textAlign: 'left', marginLeft: 10, marginTop: 15, fontSize: 18,}}>When you should be there:</Text>
        </View>

        <View style={styles.addCheckinBody}>
          <View style={styles.addCheckinTime}>
            <Picker
              style={styles.addCheckinPickerMonth}
              selectedValue={this.state.month}
              onValueChange={(month) => this.setTime('month', month)}
            >
              <Picker.Item label="Jan" value={0}/>
              <Picker.Item label="Feb" value={1}/>
              <Picker.Item label="Mar" value={2}/>
              <Picker.Item label="Apr" value={3}/>
              <Picker.Item label="May" value={4}/>
              <Picker.Item label="Jun" value={5}/>
              <Picker.Item label="Jul" value={6}/>
              <Picker.Item label="Aug" value={7}/>
              <Picker.Item label="Sept" value={8}/>
              <Picker.Item label="Oct" value={9}/>
              <Picker.Item label="Nov" value={10}/>
              <Picker.Item label="Dec" value={11}/>
            </Picker>

            {this.renderDaysInMonth(this.state.month, this.state.year)}

            <Picker
              style={styles.addCheckinPickerYear}
              selectedValue={this.state.year}
              onValueChange={(year) => this.setTime('year', year)}
            >
              <Picker.Item label="2017" value={2017}/>
              <Picker.Item label="2018" value={2018}/>
              <Picker.Item label="2019" value={2019}/>
              <Picker.Item label="2020" value={2020}/>
              <Picker.Item label="2021" value={2021}/>
              <Picker.Item label="2022" value={2022}/>
              <Picker.Item label="2023" value={2023}/>
              <Picker.Item label="2024" value={2024}/>
              <Picker.Item label="2025" value={2025}/>
              <Picker.Item label="2026" value={2026}/>
              <Picker.Item label="2027" value={2027}/>
            </Picker>

            <Picker
              style={styles.addCheckinPicker}
              selectedValue={this.state.hour}
              onValueChange={(hour) => this.setTime('hour', hour)}
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
              onValueChange={(minute) => this.setTime('minute', minute)}
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
            <PushController Checkin={this.state.Checkin} />
          </View>

          <TouchableOpacity style={styles.submitNewCheckinButtonWrapper} onPress={this.onPress.bind(this)}>
            <Text style={styles.submitNewCheckinButtonText}> Submit </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

NewCheckin.propTypes = {
  provider: MapView.ProviderPropType,
};

export default NewCheckin;
