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
class Checkup extends Component {
  constructor(props){
    super(props);
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

        <View style={styles.body}>
          <TextInput
            style={{textAlign: 'center', height: 20, width: '80%', borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({text})}
            placeholder={this.props.checkup.Checkin.lat + ', ' + this.props.checkup.Checkin.lng}
          />
          <TextInput
            style={{textAlign: 'center', marginTop: 20, height: 20, width: '80%', borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({text})}
            placeholder={this.props.checkup.Checkin.requestStatus}
          />
        </View>
      </View>
    );
  }
}

Checkup.propTypes = {
  provider: MapView.ProviderPropType,
};

export default Checkup;
