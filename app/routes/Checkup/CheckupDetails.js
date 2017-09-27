import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  ListView,
  Alert } from 'react-native';
import Geocoder from 'react-native-geocoding';
import styles from '../../styles/styles';

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
    console.log(checkup)
  }

  pressDecline(checkup){
    console.log(checkup)
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
