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

import Form from 'react-native-form';
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
      me: {
        id: null,
        cell: null,
        email: null,
      },
      cell: null
    };
  }

  componentWillMount() {
    this.getUserInfo();
    this.getEmContact();
  }

  getUserInfo() {
    // let url = 'http://10.0.0.145:3000';
    let url = 'http://172.20.10.3:3000';
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
          me: {
            id: responseJson.id,
            cell: responseJson.cell,
            email: responseJson.email,
          }
        })
      })
      .done();
    })
  }

  getEmContact(cell) {
    // let url = 'http://10.0.0.145:3000';
    let url = 'http://172.20.10.3:3000';
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
      UserID: this.state.me.id
    })
  }

  renderRow(emContact) {
    if(emContact.cell === this.state.cell
      && emContact.id !== this.state.me.id
      && emContact.cell !== this.state.me.cell
      && emContact.email !== this.state.me.email) {
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
      <Form style={{width: '100%', height: '100%'}} ref="form">
        <View style={styles.selectEmContainer}>
          <TextInput
            style={{textAlign: 'left', paddingLeft: 10, width: '100%', height: 45, fontSize: 18, backgroundColor: 'white', color: 'black'}}
            onChangeText = {(cell) => {
              this.setState({cell: cell});
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
      </Form>
    )
  }
}

export default SelectEm;
