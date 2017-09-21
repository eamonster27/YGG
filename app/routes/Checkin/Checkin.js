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

import styles from '../../styles/styles';

//This is where i list only the home location.
class Checkin extends Component{
  constructor(props){
    super(props);
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

        <View style={styles.body}>
          <TextInput
            style={{textAlign: 'center', fontSize: 18, width: '80%', borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({text})}
            placeholder={this.props.checkin.lat + ', ' + this.props.checkin.lng}
            underlineColorAndroid = 'transparent'
          />
          <TextInput
            style={{textAlign: 'center', fontSize: 18, marginTop: 20, width: '80%', borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({text})}
            placeholder={this.props.checkin.requestStatus}
            underlineColorAndroid = 'transparent'
          />
        </View>
      </View>
    );
  }
}

Checkin.propTypes = {
  provider: MapView.ProviderPropType,
};

export default Checkin;
