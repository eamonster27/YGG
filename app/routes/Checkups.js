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

import CheckupsHeader from './Header/CheckupsHeader'
import Footer from './Footer/Footer'
import styles from './styles';

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
    return(
      <TouchableHighlight onPress={() => {this.onPressCheckup(checkup)}}>
        <View style={styles.row}>
          <Text style={styles.rowText}> {checkup.Checkin.time} </Text>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <CheckupsHeader />

        <View style={styles.wrapper}>
          <ListView
            style={styles.listView}
            enableEmptySections={true}
            dataSource={this.state.CheckupsDataSource}
            renderRow={this.renderRow.bind(this)}
          />
        </View>

        <Footer />
      </View>
    );
  }
}

export default Checkups;
