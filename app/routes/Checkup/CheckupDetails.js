import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  ListView,
  Alert,
  AsyncStorage } from 'react-native';
import Geocoder from 'react-native-geocoding';
import {Actions} from 'react-native-router-flux';
import styles from '../../styles/styles';
import localIP from '../localIP'

class upDetails extends Component {
  constructor(props){
    super(props);
    const pings_ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      checkup: this.props.checkup,
      PingsDataSource: pings_ds
    }
  }

  componentWillMount(){
    this.getPings();
  }

  getAddress(lat, lng) {
    Geocoder.getFromLatLng(lat, lng).then(
      json => {
        Alert.alert(json.results[0].address_components[0].long_name + " " + json.results[0].address_components[1].long_name)
      },
      error => {
        console.log(error);
      }
    )
  }

  getPings(){
    this.setState({
      PingsDataSource: this.state.PingsDataSource.cloneWithRows(this.props.checkup.Checkin.Pings)
    })
  }

  pressApprove(checkup){
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
          id: checkup.Checkin.id,
          alerts: checkup.Checkin.alerts++,
          status: checkup.Checkin.status,
          address: checkup.Checkin.address,
          lat: checkup.Checkin.lat,
          lng: checkup.Checkin.lng,
          time: checkup.Checkin.time,
          requestStatus: 'Approved',
          emContactID: checkup.Checkin.emContactID,
        })
      })
      .then((response) => { response.json() })
      .then((responseData) => {
        Actions.Main();
      })
      .done();
    })
    //Maybe schedule notification for other user here?
  }

  pressDecline(checkup){
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
          id: checkup.Checkin.id,
          alerts: checkup.Checkin.alerts++,
          status: checkup.Checkin.status,
          address: checkup.Checkin.address,
          lat: checkup.Checkin.lat,
          lng: checkup.Checkin.lng,
          time: checkup.Checkin.time,
          requestStatus: 'Declined',
          emContactID: checkup.Checkin.emContactID,
        })
      })
      .then((response) => { response.json() })
      .then((responseData) => {
        Actions.Main();
      })
      .done();
    })
    //Cancel notification here.
  }

  renderRow(ping){
    return(
      <TouchableHighlight onPress={() => {this.getAddress(ping.lat, ping.lng)}}>
        <View style={styles.pingRow}>
          <Text style={styles.pingText}>Here [{ping.lat}, {ping.lng}] at {ping.time.slice(11, 16)}</Text>
        </View>
      </TouchableHighlight>
    )

  }

  //ifApproved displayPings, ifPending displayDecline/Accept
  render(){
    if(this.state.checkup.Checkin.requestStatus === "Approved"){
      return(
        <View style={styles.checkupBodyApproved}>
        <Text>Click below for address estimate</Text>
          <ListView
            style={styles.listView}
            enableEmptySections={true}
            dataSource={this.state.PingsDataSource}
            renderRow={this.renderRow.bind(this)}
          />
        </View>
      );
    }
    else if(this.state.checkup.Checkin.requestStatus === "Pending"){
      return(
        <View style={styles.checkupBodyPending}>
          <TouchableOpacity style={styles.checkupButtonWrapperApprove} onPress={() => {this.pressApprove(this.state.checkup)}}>
            <Text style={styles.checkupButtonTextApprove}> Approve </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.checkupButtonWrapperDecline} onPress={() => {this.pressDecline(this.state.checkup)}}>
            <Text style={styles.checkupButtonTextDecline}> Decline </Text>
          </TouchableOpacity>
        </View>
      );
    }
    else {
      return(
        <View style={styles.checkupBody}>
          <Text> Other </Text>
        </View>
      );
    }
  }
}

export default upDetails;
