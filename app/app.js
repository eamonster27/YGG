import React, {Component} from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import {Router, Scene} from 'react-native-router-flux';

import Authentication from './routes/Session/Authentication';
import Main from './routes/Main';
import Register from './routes/Session/Register';
import Checkins from './routes/Lists/Checkins';
import Checkups from './routes/Lists/Checkups';
import Checkin from './routes/Checkin/Checkin';
import Checkup from './routes/Checkup/Checkup';
import NewCheckin from './routes/Checkin/Add/NewCheckin';
import SelectEm from './routes/Checkin/Add/SelectEm';

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
              title='Login'
            />
            <Scene
              component={Main}
              hideNavBar={true}
              initial={this.state.hasToken}
              key='Main'
              title='Home'
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
            <Scene
              component={SelectEm}
              hideNavBar={false}
              key='SelectEm'
              title='Emergency Contact'
            />
            <Scene
              component={Register}
              hideNavBar={false}
              key='Register'
              title='Register'
            />
          </Scene>
        </Router>
      )
    }
  }
}

export default App;
