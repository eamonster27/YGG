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

import CheckinDetails from './CheckinDetails';
import styles from '../../styles/styles';

//This is where i list only the home location.
class Checkin extends Component{
  constructor(props){
    super(props);

    this.state = {
      address: ''
    }
  }

  componentWillMount(){
    this.getAddress(this.props.checkin.lat, this.props.checkin.lng)
  }

  getAddress(lat, lng) {
    Geocoder.getFromLatLng(lat, lng).then((json) => {
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
    return(
      <View style={styles.checkinContainer}>
        <MapView style={styles.map}
          provider={this.props.provider}
          region={{
            latitude: parseFloat(this.props.checkin.lat),
            longitude: parseFloat(this.props.checkin.lng),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0420,
          }}
        >
          <MapView.Marker
            coordinate={{
              latitude: parseFloat(this.props.checkin.lat),
              longitude: parseFloat(this.props.checkin.lng),
            }}
            title={"Home"}
            description={"Description"}
            pinColor='#3498db'
          />
        </MapView>
        <TextInput
          style={{textAlign: 'left', paddingLeft: 10, fontSize: 18, width: '100%',  height: 45, fontSize: 18, backgroundColor: 'white', color: 'black'}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.address}
          underlineColorAndroid = 'transparent'
          editable={false}
        />

        <CheckinDetails checkin={this.props.checkin}/>


      </View>
    );
  }
}

Checkin.propTypes = {
  provider: MapView.ProviderPropType,
};

export default Checkin;
