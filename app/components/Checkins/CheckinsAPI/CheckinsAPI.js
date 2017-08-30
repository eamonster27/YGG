import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View, Text, ListView, TouchableHighlight} from 'react-native';

export default class CheckinsAPI extends Component {
  constructor(){
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      userDataSource: ds
    };
  }

  componentDidMount(){
    this.fetchUsers();
  }

  fetchUsers(){
    fetch('https://yougogirl.herokuapp.com/api/1')
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

  renderRow(user, sectionId, rowId, highlightRow){
    return(
      <TouchableHighlight onPress={() => {this.onPress(user)}}>
        <View style={styles.row}>
          <Text style={styles.rowText}> {user.cell} </Text>
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
