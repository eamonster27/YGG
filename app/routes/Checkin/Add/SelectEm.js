import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  AsyncStorage,
  ListView } from 'react-native';

import {Actions} from 'react-native-router-flux';

import styles from '../../../styles/styles';

// Perhaps this should be EDITCHECKIN. + or Existing checkin is selected.
// This should check to see if it was passed existing info and populate it in relevant fields.
// Otherwise, new checkin creation.
class SelectEm extends Component {
  constructor(props){
    super(props);
    const users_ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      UsersDataSource: users_ds,
      UserID: '',
      UserCell: '',
      UserEmail: '',
      emCell: ''
    };
  }

  componentWillMount() {
    this.getUserInfo();
    this.getEmContact();
  }

  getUserInfo() {
    let url = 'http://10.0.0.145:3000';
    // let url = 'http://172.20.10.3:3000';
    let path = '/user';

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
          UserID: responseJson.id,
          UserCell: responseJson.cell,
          UserEmail: responseJson.email,
        })
      })
      .done();
    })
  }

  getEmContact() {
    let url = 'http://10.0.0.145:3000';
    // let url = 'http://172.20.10.3:3000';
    let path = '/users';

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
          UsersDataSource: this.state.UsersDataSource.cloneWithRows(responseJson)
        })
      })
      .done();
    })
  }

  onPressEmContact(emContact){
    Actions.NewCheckin({
      emContactID: emContact.id,
      UserID: parseInt(this.state.UserID)
    })
  }

  renderRow(emContact) {
    if(emContact.cell === this.state.emCell
      && emContact.id !== this.state.UserID
      && emContact.cell !== this.state.UserCell
      && emContact.email !== this.state.UserEmail) {
      return(
        <TouchableHighlight onPress={() => {this.onPressEmContact(emContact)}}>
          <View style={styles.selectEmRowStyle}>
            <Text style={styles.selectEmListRowTextStyle}> {emContact.firstname} {emContact.lastname}</Text>
            <Image
              source={require('../../../images/yougogirl-logo.png')}
              style={{width: 25, height: 25, alignSelf: 'center'}}
            />
          </View>
        </TouchableHighlight>
      )
    }
    else {
      return(
        <View/>
      )
    }
  }

  render() {
    return (
      <View style={styles.selectEmContainer}>
        <TextInput
          style={{textAlign: 'left', paddingLeft: 10, width: '100%', height: 45, fontSize: 18, backgroundColor: 'white', color: 'black'}}
          onChangeText = {(cell) => {
            this.setState({emCell: cell});
          }}
          placeholder="Emergency Contact Cell"
          underlineColorAndroid = 'transparent'
        />

        <View style={styles.listWrapper}>
          <ListView
            style={styles.listView}
            enableEmptySections={true}
            dataSource={this.state.UsersDataSource}
            renderRow={this.renderRow.bind(this)}
          />
        </View>
      </View>
    )
  }
}

export default SelectEm;
