import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  Dimensions,
  TextInput,
  TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import PropTypes from 'prop-types';
import Geocoder from 'react-native-geocoding';

import CheckupDetails from './CheckupDetails';
import styles from '../../styles/styles';

//This is where i list only the home location.
class Checkup extends Component {
  constructor(props){
    super(props);

    this.state = {
      address: ''
    }
  }

  componentWillMount(){
    this.getAddress(this.props.checkup.Checkin.lat, this.props.checkup.Checkin.lng)
  }

  getAddress(lat, lng) {
    Geocoder.getFromLatLng(lat, lng).then(
      json => {
        console.log(json)
        this.setState({
          address: json.results[0].address_components[0].long_name + " " +
          json.results[0].address_components[1].long_name,
        })
      },
      error => {
        console.log(error);
      }
    )
  }

  render(){
    const pings = this.props.checkup.Checkin.Pings.map((ping) =>
      <MapView.Marker
        coordinate={{
          latitude: parseFloat(ping.lat),
          longitude: parseFloat(ping.lng),
        }}
        key={ping.id}
        title={ping.time}
        pinColor='#e74c3c'
      />
    );

    return(
      <View style={styles.checkupContainer}>
        <MapView style={styles.map}
          provider={this.props.provider}
          ref={ref => { this.map = ref; }}
          region={{
            latitude: parseFloat(this.props.checkup.Checkin.lat),
            longitude: parseFloat(this.props.checkup.Checkin.lng),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0420,
          }}
        >
          <MapView.Marker
            coordinate={{
              latitude: parseFloat(this.props.checkup.Checkin.lat),
              longitude: parseFloat(this.props.checkup.Checkin.lng),
            }}
            title={"Home"}
            pinColor='#3498db'
          />
          {pings}
        </MapView>

        <TextInput
          style={{textAlign: 'left', paddingLeft: 10, width: '100%', height: 45, fontSize: 18, backgroundColor: 'white', color: 'black'}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.address}
          editable={false}
        />
        <CheckupDetails checkup={this.props.checkup}/>

      </View>
    );
  }
}

Checkup.propTypes = {
  provider: MapView.ProviderPropType,
};

export default Checkup;
