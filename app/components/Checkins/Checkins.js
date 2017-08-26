import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet, Button} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';

import CheckinsAPI from './CheckinsAPI/CheckinsAPI';
import Checkin from './Checkin/Checkin';


export default class Checkins extends Component{
  renderScene(route, navigator){

    switch(route.id){
      case 'checkinsapi':
        return (<CheckinsAPI navigator={navigator} title="checkinsapi" />)
      case 'checkin':
        return (<Checkin user={route.user} navigator={navigator} title="checkin" />)
    }
  }
// onPress should direct to checkin creation.
  onPress(){
    
  }

  render(){
    return(
      <View style={styles.container}>
        <Button
          onPress={this.onPress.bind(this)}
          title="+"
        />
        <Navigator
          initialRoute={{id: 'checkinsapi'}}
          renderScene={this.renderScene}
          configureScreen={(route, routeStack) => Navigator.SceneConfigs.FloatFromBottom}
        />
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


AppRegistry.registerComponent('Checkins', () => Checkins);
