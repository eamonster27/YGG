import React, {Component} from 'react';
import {AppRegistry, Switch, StyleSheet, View, Text, ListView, TouchableHighlight} from 'react-native';

export default class CheckinsAPI extends Component {
  constructor(){
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      userDataSource: ds,
      switchValue: false
    };
  }

  // switchValue should receive its value from database

  componentDidMount(){
    this.fetchUsers();
  }

  fetchUsers(){
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          userDataSource: this.state.userDataSource.cloneWithRows(response)
        });
      });
  }

  onPress(user){
    this.props.navigator.push({
      id: 'checkin',
      user: user
    });
  }

  onSwitchChange(value){
    this.setState({
      switchValue: value
    });
  }

  renderRow(user, sectionId, rowId, highlightRow){
    return(
      <TouchableHighlight onPress={() => {this.onPress(user)}}>
        <View style={styles.row}>
          <Text style={styles.rowText}> 03:00:00 </Text>
          <Switch
            value={this.state.switchValue}
            onValueChange={(value) => this.onSwitchChange(value)}
          />
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <View>
        <ListView
          dataSource={this.state.userDataSource}
          renderRow={this.renderRow.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'grey',
    marginBottom: 3,
    width: '100%'
  },
  rowText: {
    flex: 1,
    textAlign: 'center'
  }
});

AppRegistry.registerComponent('CheckinsAPI', () => CheckinsAPI);
