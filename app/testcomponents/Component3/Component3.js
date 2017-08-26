import React, {Component} from 'react';
import {AppRegistry, Text, View, TextInput, Switch} from 'react-native';

export default class Component3 extends Component{
  constructor(){
    super();
    this.state = {
      textValue:'Hello',
      switchValue: false
    }
  }

  onChangeText(value){
    this.setState({
      textValue: value
    });
  }

  onSubmit(){
    console.log('Input submitted');
  }

  onSwitchChange(value){
    this.setState({
      switchValue: value
    });
  }

  render(){
    return(
      <View>
        <Text>{this.state.textValue}</Text>
        <TextInput
          placeholder="Enter Text"
          value={this.state.textValue}
          onChangeText={(value) => this.onChangeText(value)}
          onSubmitEditing={this.onSubmit}
        />
        <Switch
          value={this.state.switchValue}
          onValueChange={(value) => this.onSwitchChange(value)}
        />

      </View>
    );
  }
}

AppRegistry.registerComponent('Component3', () => Component3);
