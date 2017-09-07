import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet, Button} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';

import List from './Body/List/List';
import Checkin from './Body/Checkin/Checkin';
import NewCheckin from './Body/Checkin/NewCheckin';
import Header from './Header/Header';
import Footer from './Footer/Footer';

export default class Main extends Component{
  renderScene(route, navigator){
    switch(route.id){
      case 'checkins':
        return (<List list={route.list} navigator={navigator} title="checkins" />)
      case 'checkups':
        return (<List list={route.list} navigator={navigator} title="checkups" />)
      case 'checkin':
        return (<Checkin checkin={route.checkin} navigator={navigator} title="checkin" />)
      case 'checkup':
        return (<Checkup checkup={route.checkup} navigator={navigator} title="checkup" />)
      case 'newcheckin':
        return (<NewCheckin newcheckin={route.newcheckin} navigator={navigator} title="newcheckin" />)
    }
  }

// onPress should direct to checkin creation.
  onPress(){

  }

  render(){
    return(
      <View style={styles.container}>
        <Header />

        <Navigator
          initialRoute={{id: 'checkins'}}
          renderScene={this.renderScene}
          configureScreen={(route, routeStack) => Navigator.SceneConfigs.FloatFromBottom}
        />

        <Footer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%'
  }
});


AppRegistry.registerComponent('Main', () => Main);
