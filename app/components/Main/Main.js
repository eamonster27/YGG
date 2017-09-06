import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet, Button} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';

import List from './Body/List/List';
import Checkin from './Body/Checkin/Checkin';


export default class Main extends Component{
  renderScene(route, navigator){

    switch(route.id){
      case 'list':
        return (<List navigator={navigator} title="list" />)
      case 'checkin':
        return (<Checkin checkin={route.checkin} navigator={navigator} title="checkin" />)
    }
  }

// onPress should direct to checkin creation.
  onPress(){

  }

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <Button
            onPress={this.onPress.bind(this)}
            title="Edit"
          />
          <Button
            onPress={this.onPress.bind(this)}
            title="+"
          />

        </View>

        <Navigator
          initialRoute={{id: 'list'}}
          renderScene={this.renderScene}
          configureScreen={(route, routeStack) => Navigator.SceneConfigs.FloatFromBottom}
        />

        <View style={styles.footer}>
          <Button
            onPress={this.onPress.bind(this)}
            title="Checkins"
          />
          <Button
            onPress={this.onPress.bind(this)}
            title="Checkups"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '5%',
    marginRight: '5%',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '2.5%',
  }
});


AppRegistry.registerComponent('Main', () => Main);
