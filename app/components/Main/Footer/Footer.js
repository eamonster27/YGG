import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet, Button} from 'react-native';

export default class Footer extends Component{
  onPress(list){
    this.props.navigator.push({
      id: 'list',
      list: list
    });
  }

  render(){
    return(
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
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '2.5%',
    width: '90%',
  }
});


AppRegistry.registerComponent('Footer', () => Footer);
