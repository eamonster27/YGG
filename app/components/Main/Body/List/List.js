import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View, Text, ListView, TouchableHighlight} from 'react-native';

//Convert all checkin/checkin stuff into main. The pages will look exactly the same, just with different data.
export default class List extends Component {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      checkinDataSource: ds
    };
  }

  componentDidMount(){
    this.fetchCheckins();
  }

  //local storage
  //pass argument to fetchCheckins with either checkins or checkins based on what link user presses
  //Perhaps you should fetch the user page and save checkin and checkin data locally for quicker page loads.
  fetchCheckins(){
    // fetch('https://yougogirl.herokuapp.com/users/1/checkins')
    fetch('http://localhost:3000/users/1/checkins')
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

AppRegistry.registerComponent('List', () => List);
