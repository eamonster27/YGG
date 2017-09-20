import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  form: {
    width: 300,
  },
  authButtonWrapper: {
    backgroundColor:'#D3D3D3',
    marginBottom: 10,
    width: 300
  },
  //Main.js & Checkins.js & Checkups.js
  buttonText: {
    fontSize: 20,
    padding: 10,
    textAlign: 'center'
  },
  buttonWrapper: {
		backgroundColor:'#D3D3D3',
    width: '50%'
  },
  loginButtonWrapper: {
		backgroundColor:'#D3D3D3',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },
  wrapper: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  image: {
    margin: 10
  },
  inputText: {
    marginBottom: 10,
    padding: 10
  },
  title: {
    fontSize: 40,
    margin: 10,
    textAlign: 'center'
  },
  //Checkins.js & Checkups.js
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#3498db', //Approved
    // backgroundColor: '#f1c40f', //Pending
    // backgroundColor: '#2ecc71', //Home Safe Checkups only
    // backgroundColor: '#e74c3c', //Declined
    opacity: 0.85,
    marginBottom: 3,
    width: '100%',
  },
  rowText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    color: 'white'
  },
  //Checkin.js & Checkup.js
  map_container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  body: {
    height: '30%',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '50%',
  },
  specialMarker: {
    zIndex: 1,
  },
  //Footer
  footer: {
    width: '100%',
    flexDirection: 'row',
  },
  //Header
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    backgroundColor:'#D3D3D3',
    height: 45
  },
  newCheckinHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    backgroundColor:'#D3D3D3',
    height: 45
  },
  //Welcome.js
  splash: {
    color: '#8880ff',
    fontSize: 30
  },
  welcome: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 50
  },
  newCheckinButtonWrapper: {
    width: '12%',
  },
  listView: {
    width: '100%'
  }
});
