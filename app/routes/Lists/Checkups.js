import React, {Component} from 'react';
import {
  Alert,
  AsyncStorage,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  View,
  ListView } from 'react-native';

import {Actions} from 'react-native-router-flux';
import CheckupsHeader from '../Header/CheckupsHeader';
import localIP from '../localIP'
import styles from '../../styles/styles';

class Checkups extends Component {
  constructor(props) {
    super(props);
    const checkups_ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      CheckupsDataSource: checkups_ds
    };
  }

  componentWillMount(){
    this.getCheckups();
  }

  getCheckups() {
    let url = localIP.url;
    let path = '/checkups';

    AsyncStorage.getItem('access_token').then((token) => {
      fetch(`${url}${path}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          CheckupsDataSource: this.state.CheckupsDataSource.cloneWithRows(responseJson)
        })
      })
      .done();
    })
  }

  onPressCheckup(checkup){
    Actions.Checkup({checkup: checkup});
    console.log(checkup);
  }

  renderRow(checkup){
    switch(checkup.Checkin.requestStatus){
      case 'Approved':
        rowStyle = styles.listRowApproved
        listRowTextStyle = styles.listRowTextApproved
        break;
      case 'Pending':
        rowStyle = styles.listRowPending
        listRowTextStyle = styles.listRowTextPending
        break;
      case 'Declined':
        rowStyle = styles.listRowDeclined
        listRowTextStyle = styles.listRowTextDeclined
        break;
    }

    switch(checkup.Checkin.status){
      case 'Home':
        rowStyle = styles.listRowHomeSafe
        listRowTextStyle = styles.listRowTextHomeSafe
        break;
    }

    return(
      <TouchableHighlight onPress={() => {this.onPressCheckup(checkup)}}>
        <View style={rowStyle}>
          <Text style={listRowTextStyle}>Check on {checkup.reqUserName} at{checkup.Checkin.time.slice(10, 16)} {checkup.Checkin.time.slice(5, 7)}/{checkup.Checkin.time.slice(8, 10)}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <View style={styles.listContainer}>
        <CheckupsHeader />

        <View style={styles.listWrapper}>
          <ListView
            style={styles.listView}
            enableEmptySections={true}
            dataSource={this.state.CheckupsDataSource}
            renderRow={this.renderRow.bind(this)}
          />
        </View>
      </View>
    );
  }
}

export default Checkups;
