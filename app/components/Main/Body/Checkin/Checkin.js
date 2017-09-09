import React, {Component} from 'react';
import {AppRegistry, Text, View, Button, StyleSheet, Dimensions, TextInput} from 'react-native';
import MapView from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

//This is where i list only the home location.
export default class Checkin extends Component{
  constructor(props){
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    };
  }

  onPress(){
    this.props.navigator.push({
      id: 'checkins'
    });
  }

  render(){
    return(
      <View style={styles.container}>
        <MapView style={styles.map}
          provider={this.props.provider}
          initialRegion={this.state.region}
        >
          <MapView.Marker
            coordinate={{
              latitude: LATITUDE,
              longitude: LONGITUDE,
            }}
            title={"Home"}
            description={"Description"}
            pinColor='#3498db'
          />
        </MapView>

        <Button
          onPress={this.onPress.bind(this)}
          title="Go Back"
        />
      </View>
    );
  }
}

Checkin.propTypes = {
  provider: MapView.ProviderPropType,
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  body: {
    height: '30%',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '50%',
  },
  specialMarker: {
    zIndex: 1,
  },
});

AppRegistry.registerComponent('Checkin', () => Checkin);
