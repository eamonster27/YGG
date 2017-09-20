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
import styles from './styles';

import List from './List';

class Main extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([])
    };
  }

  componentDidMount(){
    this.getCheckins();
    this.getCheckups();
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
          dataSource: this.state.dataSource.cloneWithRows(responseJson)
        })
      })
      .done();
    })
  }

  getCheckups() {
    let url = 'http://10.0.0.145:3000';
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
          dataSource: this.state.dataSource.cloneWithRows(responseJson)
        })
      })
      .done();
    })
  }

  async userLogout() {
    try {
      await AsyncStorage.removeItem('id_token');
      await AsyncStorage.removeItem('access_token');
      Alert.alert('Logged out!');
      Actions.Authentication();
    } catch(error) {
      onsole.log('AsyncStorage error: ' + error.message);
    }
  }

  renderRow(data){
    return(
      <TouchableHighlight>
        <View style={styles.row}>
          <Text style={styles.rowText}> {data.id} </Text>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
        />

        <TouchableOpacity style={styles.buttonWrapper} onPress={this.getCheckins}>
          <Text style={styles.buttonText}> Checkins </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonWrapper} onPress={this.getCheckups}>
          <Text style={styles.buttonText}> Checkups </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonWrapper} onPress={this.userLogout}>
          <Text style={styles.buttonText} > Log out </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Main;
