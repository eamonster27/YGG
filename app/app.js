import React, {Component} from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import {Router, Scene} from 'react-native-router-flux';

import Authentication from './routes/Authentication';
import Main from './routes/Main';
import Checkins from './routes/Checkins';
import Checkups from './routes/Checkups';
import Checkin from './routes/Checkin';
import Checkup from './routes/Checkup';
import NewCheckin from './routes/NewCheckin';

class App extends Component {
  constructor() {
    super();
    this.state = {
      hasToken: false,
      isLoaded: false
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('id_token').then((token) => {
      if (token !== null){
        this.setState({
          hasToken: true,
          isLoaded: true
        });
      } else {
        this.setState({
          hasToken: false,
          isLoaded: true
        });
      }
    });
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <ActivityIndicator />
      )
    } else {
      return (
        <Router>
          <Scene key='root'>
            <Scene
              component={Authentication}
              hideNavBar={true}
              initial={!this.state.hasToken}
              key='Authentication'
              title='Authentication'
            />
            <Scene
              component={Main}
              hideNavBar={true}
              initial={this.state.hasToken}
              key='Main'
              title='Main'
            />
            <Scene
              component={Checkins}
              hideNavBar={false}
              key='Checkins'
              title='Checkins'
            />
            <Scene
              component={Checkups}
              hideNavBar={false}
              key='Checkups'
              title='Checkups'
            />
            <Scene
              component={Checkin}
              hideNavBar={false}
              key='Checkin'
              title='Checkin'
            />
            <Scene
              component={Checkup}
              hideNavBar={false}
              key='Checkup'
              title='Checkup'
            />
            <Scene
              component={NewCheckin}
              hideNavBar={false}
              key='NewCheckin'
              title='Add Checkin'
            />
          </Scene>
        </Router>

      )
    }
  }
}

export default App;
