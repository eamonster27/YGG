import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  TextInput,
  Picker,
  AppState,
  Platform } from 'react-native';
import Form from 'react-native-form';
import MapView from 'react-native-maps';
import PushNotification from 'react-native-push-notification';
import PushController from './PushController';
import PropTypes from 'prop-types';

// Perhaps this should be EDITCHECKIN. + or Existing checkin is selected.
// This should check to see if it was passed existing info and populate it in relevant fields.
// Otherwise, new checkin creation.
export default class NewCheckin extends Component {
  constructor(props){
    super(props);

    this.state = {
      lat: '29.742063',
      lng: '-95.386246',
      time: '',
      emContactID: null,
      UserID: 1, //UPDATE with user data stored in local storage
      hours: 0,
      minutes: 0,
      address: '',
    };
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
  }

  componentDidMount(){
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount(){
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange(appState) {
    if (appState === 'background') {
      let date = new Date(Date.now() + (this.state.hours * 1000));

      if (Platform.OS === 'ios') {
        date = date.toISOString();
      }

      PushNotification.localNotificationSchedule({
        message: "My Notification Message",
        date,
      });
    }
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
        lat: this.state.lat,
        lng: this.state.lng,
        time: this.state.time,
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
      <Form style={{width: '100%', height: '100%'}} ref="form">
        <View style={styles.container}>
          <Text
            style={{fontSize: 20, marginTop: 10, marginBottom: 10}}
          >
            Add Checkin
          </Text>

          <MapView style={styles.map}
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
            style={{textAlign: 'center', height: 30, width: '100%', borderColor: 'gray', borderWidth: 1}}
            onChangeText = {(address) => this.setState({address: address})}
            placeholder="Address: "
          />

          <View style={styles.time}>
            <Picker
              style={styles.picker}
              selectedValue={this.state.hours}
              onValueChange={(hours) => this.setState({hours: hours})}
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
              style={styles.picker}
              selectedValue={this.state.minutes}
              onValueChange={(minutes) => this.setState({minutes: minutes})}
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

          <TextInput
            style={{textAlign: 'center', marginBottom: 10, height: 30, width: '100%', borderColor: 'gray', borderWidth: 1}}
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

NewCheckin.propTypes = {
  provider: MapView.ProviderPropType,
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'column',
    alignItems: 'center',
  },
  picker: {
    width: 100,
  },
  time: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  map: {
    width: '100%',
    height: '40%',
    marginBottom: 0,
  },
});

AppRegistry.registerComponent('NewCheckin', () => NewCheckin);
