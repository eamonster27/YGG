import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View, Text, Image, TouchableOpacity, Button} from 'react-native';

export default class Main extends Component {

  onPressCheckins(){
    this.props.navigator.push({
      id: 'checkins'
    });
  }

  onPressCheckups(){
    this.props.navigator.push({
      id: 'checkups'
    });
  }


  render() {
    return (
      <View>
        <View style={styles.container}>

          <TouchableOpacity
            onPress={this.onPressCheckins}
            style={styles.v2}
          >
            <Button
              onPress={this.onPressCheckins.bind(this)}
              title="Check-in"
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.onPressCheckups}
            style={styles.v2}
          >
            <Button
              onPress={this.onPressCheckups.bind(this)}
              title="Check-up"
            />
          </TouchableOpacity>

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  }
});

AppRegistry.registerComponent('Main', () => Main);
