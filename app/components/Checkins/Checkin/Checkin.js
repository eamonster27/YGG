import React, {Component} from 'react';
import {AppRegistry, Text, View, Button, StyleSheet, Dimensions} from 'react-native';
import MapView from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.733858;
const LONGITUDE = -122.446549;
const MARKERS_LATITUDE_DELTA = 0.3;
const MARKERS_LONGITUDE_DELTA = MARKERS_LATITUDE_DELTA * ASPECT_RATIO;
const MAP_LATITUDE_DELTA = 0.3;
const MAP_LONGITUDE_DELTA = MAP_LATITUDE_DELTA * ASPECT_RATIO;
const NUM_MARKERS = 2;
const PERCENT_SPECIAL_MARKERS = 0.1;

export default class Checkin extends Component{
  constructor(props){
    super(props);

    const markerInfo = [];
    for (let i = 1; i < NUM_MARKERS; i++) {
      markerInfo.push({
        latitude: this.props.checkin.lat * 1.0,
        longitude: this.props.checkin.lng * 1.0,
        isSpecial: Math.random() < PERCENT_SPECIAL_MARKERS,
        id: i,
      });
    }

    this.state = {
      markerInfo,
    };
  }

  onPress(){
    this.props.navigator.push({
      id: 'checkinsapi'
    });
  }

  render(){
    const markers = this.state.markerInfo.map((markerInfo) =>
      <MapView.Marker
        coordinate={markerInfo}
        key={markerInfo.id}
        pinColor={markerInfo.isSpecial ? '#c5a620' : null}
        style={markerInfo.isSpecial ? styles.specialMarker : null}
      />
    );

    return(
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          ref={ref => { this.map = ref; }}
          style={styles.map}
          initialRegion={{
            latitude: this.props.checkin.lat * 1.0,
            longitude: this.props.checkin.lng * 1.0,
            latitudeDelta: MAP_LATITUDE_DELTA,
            longitudeDelta: MAP_LONGITUDE_DELTA,
          }}
        >
          {markers}
        </MapView>

        <Text> Address </Text>
        <Text> Emergency Contact </Text>

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
  map: {
    width: '100%',
    height: '50%',
  },
  specialMarker: {
    zIndex: 1,
  },
});

AppRegistry.registerComponent('Checkin', () => Checkin);
