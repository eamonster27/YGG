import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View, Text, ListView, TouchableHighlight} from 'react-native';

export default class CheckinsAPI extends Component {
  constructor(){
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      checkinDataSource: ds
    };
  }

  componentDidMount(){
    this.fetchCheckins();
  }

  fetchCheckins(){
    fetch('https://yougogirl.herokuapp.com/api/users/2/checkins')
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          checkinDataSource: this.state.checkinDataSource.cloneWithRows(response)
        });
      });
  }

  onPress(checkin){
    this.props.navigator.push({
      id: 'checkin',
      checkin: checkin
    });
  }

  renderRow(checkin, sectionId, rowId, highlightRow){
    return(
      <TouchableHighlight onPress={() => {this.onPress(checkin)}}>
        <View style={styles.row}>
          <Text style={styles.rowText}> {checkin.time} </Text>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <View>
        <ListView
          dataSource={this.state.checkinDataSource}
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
