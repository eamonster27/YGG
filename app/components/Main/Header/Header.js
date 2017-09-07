import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet, Button} from 'react-native';

export default class Header extends Component{
  constructor(props){
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  onPress(id){
    this.props.navigator.push({
      id: id
    });
  }

  render(){
    return(
      <View style={styles.header}>
        <Button
          onPress={() => {this.onPress('checkins')}}
          title="Back"
        />

        <Button
          onPress={() => {this.onPress('newcheckin')}}
          title="+"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '5%',
    marginRight: '5%',
    width: '90%'
  }
});


AppRegistry.registerComponent('Header', () => Header);
