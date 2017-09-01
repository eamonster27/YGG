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
    fetch('https://yougogirl.herokuapp.com/api/users/1/checkins')
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
    backgroundColor: '#3498db', //Approved
    // backgroundColor: '#f1c40f', //Pending
    // backgroundColor: '#2ecc71', //Home Safe Checkups only
    // backgroundColor: '#e74c3c', //Declined
    opacity: 0.85,
    marginBottom: 3,
    width: '100%'
  },
  rowText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    color: 'white'
  }
});

AppRegistry.registerComponent('CheckinsAPI', () => CheckinsAPI);
