Project Backlog: https://trello.com/b/1rosETC9/you-go-girl

ABOUT: You Go Girl's purpose is to prevent and combat sexual assault. Though this app will be useful outside of this context, our primary objective is to be the most useful when a user is unable to interact with the app.

Start server:
node_modules/nodemon/bin/nodemon.js -- node_modules/babel-cli/bin/babel-node.js server.js

Run Postgres server

react-native run-ios
react-native run-android


PushNotification.configure({

  onNotification: function(notification) {
    console.log( 'NOTIFICATION:', notification );

    let now = new Date(Date.now());
    let currentYear = now.getFullYear();
    let currentMonth = now.getMonth();
    let currentDay = now.getDate();
    let currentHour = now.getHours();
    let currentMinute = now.getMinutes();
    let currentTime = (new Date(Date.UTC(currentYear, currentMonth, currentDay, currentHour, currentMinute, 0))).getTime();

    this.setState({
      time: currentTime
    })

    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        console.log("GEOLOCATION");
        console.log("GEOLOCATION");
        console.log(initialPosition, position);
        console.log("GEOLOCATION");
        console.log("GEOLOCATION");

        this.setState({
          lat: position.coords.latitude.toString(),
          lng: position.coords.longitude.toString(),
        })

      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );

    let url = 'http://10.0.0.145:3000';
    // let url = 'http://172.20.10.3:3000';
    let pingPath = `/create/ping`;

    fetch(`${url}${pingPath}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        lat: this.state.lat,
        lng: this.state.lng,
        time: this.state.time,
        CheckinID: this.state.CheckinID,
      })
    }).done();
  }.bind(this),
})
