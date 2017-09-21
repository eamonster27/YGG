import React, {Component} from 'react';
import {
  Alert,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  View,
  ListView } from 'react-native';

import Welcome from './Welcome/Welcome'
import LogoutHeader from './Header/LogoutHeader'
import Footer from './Footer/Footer'
import styles from '../styles/styles';

class Main extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <View style={styles.mainContainer}>
        <LogoutHeader />

        <Welcome />

        <Footer />
      </View>
    );
  }
}

export default Main;
