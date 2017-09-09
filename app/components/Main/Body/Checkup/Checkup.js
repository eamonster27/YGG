import React, {Component} from 'react';
import {AppRegistry, Text, View, Button, StyleSheet, Dimensions, TextInput} from 'react-native';
import MapView from 'react-native-maps';

//This is where i list all the pings and the home location.
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const MARKERS_LATITUDE_DELTA = 0.3;
const MARKERS_LONGITUDE_DELTA = MARKERS_LATITUDE_DELTA * ASPECT_RATIO;
const MAP_LATITUDE_DELTA = 0.3;
const MAP_LONGITUDE_DELTA = MAP_LATITUDE_DELTA * ASPECT_RATIO;
const NUM_MARKERS = 2;
const PERCENT_SPECIAL_MARKERS = 0.1;

export default class Checkup extends Component{
  constructor(props){
    super(props);

    const markerInfo = [];
    for (let i = 1; i < NUM_MARKERS; i++) {
      markerInfo.push({
        latitude: this.props.checkup.lat * 1.0,
        longitude: this.props.checkup.lng * 1.0,
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
      id: 'list'
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
            latitude: this.props.checkup.lat * 1.0,
            longitude: this.props.checkup.lng * 1.0,
            latitudeDelta: MAP_LATITUDE_DELTA,
            longitudeDelta: MAP_LONGITUDE_DELTA,
          }}
        >
          {markers}
        </MapView>

        <View style={styles.body}>
          <TextInput
            style={{textAlign: 'center', height: 20, width: '80%', borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({text})}
            placeholder={this.props.checkup.lat + ', ' + this.props.checkup.lng}
          />
          <TextInput
            style={{textAlign: 'center', marginTop: 20, height: 20, width: '80%', borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({text})}
            placeholder={this.props.checkup.requestStatus}
          />
        </View>

        <Button
          onPress={this.onPress.bind(this)}
          title="Delete"
        />

        <Button
          onPress={this.onPress.bind(this)}
          title="Go Back"
        />
      </View>
    );
  }
}

Checkup.propTypes = {
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

AppRegistry.registerComponent('Checkup', () => Checkup);
