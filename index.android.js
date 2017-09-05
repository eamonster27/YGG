import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet} from 'react-native';

import About from './app/components/About/About';
import Checkins from './app/components/Checkins/Checkins';
import Checkups from './app/components/Checkups/Checkups';
import Main from './app/components/Main/Main';
import Welcome from './app/components/Welcome/Welcome';
import Login from './app/components/Session/Login';
import Register from './app/components/Session/Register';

export default class YGG extends Component{
  render(){
    return(
      <View style={styles.container}>
        <Register />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    backgroundColor: '#ecf0f1',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

AppRegistry.registerComponent('YGG', () => YGG);
