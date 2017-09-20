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

import CheckinsHeader from './Header/CheckinsHeader'
import Footer from './Footer/Footer'
import styles from './styles';

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
    let url = 'http://10.0.0.145:3000';
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
    console.log(checkin);
  }

  renderRow(checkin){
    return(
      <TouchableHighlight onPress={() => {this.onPressCheckin(checkin)}}>
        <View style={styles.row}>
          <Text style={styles.rowText}> {checkin.time} </Text>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <CheckinsHeader />

        <View style={styles.wrapper}>
          <ListView
            style={styles.listView}
            enableEmptySections={true}
            dataSource={this.state.CheckinsDataSource}
            renderRow={this.renderRow.bind(this)}
          />
        </ View>
        
        <Footer />
      </View>
    );
  }
}

export default Checkins;
