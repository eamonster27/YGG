Project Backlog: https://trello.com/b/1rosETC9/you-go-girl

ABOUT: You Go Girl's purpose is to prevent and combat sexual assault. Though this app will be useful outside of this context, our primary objective is to be the most useful when a user is unable to interact with the app.

Start server:
node_modules/nodemon/bin/nodemon.js -- node_modules/babel-cli/bin/babel-node.js server.js

Run Postgres server

react-native run-ios
react-native run-android


PushNotification.configure({

  onRegister: function(token) {
    console.log( 'TOKEN:', token );
  },

  onNotification: function(notification) {

    console.log( 'NOTIFICATION:', notification );

    console.log(this.state)

    let now = new Date(Date.now());
    let currentYear = now.getFullYear();
    let currentMonth = now.getMonth();
    let currentDay = now.getDate();
    let currentHour = now.getHours();
    let currentMinute = now.getMinutes();
    let currentTime = (new Date(Date.UTC(currentYear, currentMonth, currentDay, currentHour, currentMinute, 0))).getTime();

    navigator.geolocation.getCurrentPosition((position) => {

      this.setState({
        lat: position.coords.latitude.toString(),
        lng: position.coords.longitude.toString(),
        time: currentTime,
      })

      let url = localIP.url;
      let pingPath = `/create/ping`;
      AsyncStorage.getItem('access_token').then((token) => {
        fetch(`${url}${pingPath}`, {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            lat: this.state.lat,
            lng: this.state.lng,
            time: this.state.time,
            CheckinID: this.state.Checkin.id,
          })
        })
        .then((response) => response.json())
        .then((responseData) => {
          console.log(responseData);
        })
        .done();
      })

      if((Math.abs(parseFloat(position.coords.latitude) - parseFloat(this.state.Checkin.lat)) < 0.0004) && (Math.abs(parseFloat(position.coords.longitude) - parseFloat(this.state.Checkin.lng)) < 0.0004)){
        this.setState({
          home: true,
        })
      }
      else {
        var netMinuteDifference = 5*60*1000;
        this.scheduleNotification(netMinuteDifference)
      }
    })
  }.bind(this),

  senderID: "889750153261",

  permissions: {
    alert: true,
    badge: true,
    sound: true
},
requestPermissions: true,
})
