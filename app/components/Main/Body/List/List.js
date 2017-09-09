import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View, Text, ListView, TouchableHighlight} from 'react-native';

//Convert all checkup/checkup stuff into main. The pages will look exactly the same, just with different data.
export default class List extends Component {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      checkupDataSource: ds
    };
  }

  componentDidMount(){
    this.fetchCheckins();
  }

  //local storage
  //pass argument to fetchCheckins with either checkups or checkups based on what link user presses
  //Perhaps you should fetch the user page and save checkup and checkup data locally for quicker page loads.
  fetchCheckins(){
    // fetch('https://yougogirl.herokuapp.com/users/1/checkups')
    fetch('http://localhost:3000/users/4/checkups')
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          checkupDataSource: this.state.checkupDataSource.cloneWithRows(response)
        });
      });
  }

  onPress(checkup){
    this.props.navigator.push({
      id: 'checkup',
      checkup: checkup
    });
  }

  renderRow(checkup, sectionId, rowId, highlightRow){
    return(
      <TouchableHighlight onPress={() => {this.onPress(checkup)}}>
        <View style={styles.row}>
          <Text style={styles.rowText}> {checkup.Checkin.time} </Text>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <View>
        <ListView
          dataSource={this.state.checkupDataSource}
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
