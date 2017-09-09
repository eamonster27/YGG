import React, {Component} from 'react';
import {AppRegistry, Text, View, Button, StyleSheet, Dimensions, TextInput} from 'react-native';
import MapView from 'react-native-maps';

//This is where i list only the home location.
export default class Checkup extends Component{
  constructor(props){
    super(props);
  }

  onPress(){
    this.props.navigator.push({
      id: 'checkups'
    });
  }

  render(){
    return(
      <View style={styles.container}>
        <MapView style={styles.map}
          provider={this.props.provider}
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
            description={"Description"}
            pinColor='#3498db'
          />
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
