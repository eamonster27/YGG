import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet} from 'react-native';

import About from './app/components/About/About';
import Main from './app/components/Main/Main';

import Welcome from './app/components/Welcome/Welcome';
//On app start,
//check local storage for session and auto login, otherwise direct to login/signup.

import Login from './app/components/Session/Login';
import Register from './app/components/Session/Register';

import NewCheckin from './app/components/Main/Body/Checkin/NewCheckin';
//Instead of entire edit page, when edit is pressed, expand to make fields editable.

export default class YGG extends Component{
  render(){
    return(
      <View style={styles.container}>
        <Main />
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
