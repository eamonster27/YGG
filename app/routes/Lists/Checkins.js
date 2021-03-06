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
import CheckinsHeader from '../Header/CheckinsHeader'
import localIP from '../localIP'
import styles from '../../styles/styles';

class Checkins extends Component {
  constructor(props) {
    super(props);
    const checkins_ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      CheckinsDataSource: checkins_ds
    };
  }

  componentWillMount(){
    this.getCheckins();
  }

  getCheckins() {
    let url = localIP.url;
    let path = '/checkins';

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
          CheckinsDataSource: this.state.CheckinsDataSource.cloneWithRows(responseJson)
        })
      })
      .done();
    })
  }

  onPressCheckin(checkin){
    Actions.Checkin({checkin: checkin});
  }

  renderRow(checkin){
    switch(checkin.requestStatus){
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

    switch(checkin.status){
      case 'Home':
        rowStyle = styles.listRowHomeSafe
        listRowTextStyle = styles.listRowTextHomeSafe
        break;
    }
    return(
      <TouchableHighlight onPress={() => {this.onPressCheckin(checkin)}}>
        <View style={rowStyle}>
          <Text style={listRowTextStyle}>{checkin.address} by {checkin.time.slice(11, 16)} - {checkin.time.slice(5, 7)}/{checkin.time.slice(8, 10)}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <View style={styles.listContainer}>
        <CheckinsHeader />

        <View style={styles.listWrapper}>
          <ListView
            style={styles.listView}
            enableEmptySections={true}
            dataSource={this.state.CheckinsDataSource}
            renderRow={this.renderRow.bind(this)}
          />
        </View>
      </View>
    );
  }
}

export default Checkins;
