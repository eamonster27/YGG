import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  // Main.js
  // Main.js
  mainContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },

  // Welcome.js
  // Welcome.js
  welcomeContainer: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 50
  },
  welcomeText: {
    color: '#8880ff',
    fontSize: 30
  },

  // Authorization.js
  // Authorization.js
  authContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  authForm: {
    width: 300,
  },
  authInputText: {
    marginBottom: 10,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    fontSize: 16
  },
  authLoginRegister: {
    flexDirection: 'row',
  },
  authButtonWrapper: {
    marginBottom: 10,
    width: '50%'
  },
  authButtonText: {
    color: '#3498db',
    fontSize: 20,
    padding: 10,
    textAlign: 'center'
  },

  // Register.js
  // Register.js
  regContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  regForm: {
    width: 300,
  },
  regInputText: {
    marginBottom: 10,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    fontSize: 16
  },
  regLoginRegister: {
    flexDirection: 'row',
  },
  regButtonWrapper: {
    marginBottom: 10,
    width: '100%'
  },
  regButtonText: {
    color: '#3498db',
    fontSize: 20,
    padding: 10,
    textAlign: 'center'
  },
  regWelcomeContainer: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 10
  },
  regWelcomeText: {
    color: '#8880ff',
    fontSize: 20
  },

  // Checkins.js & Checkups.js
  // Checkins.js & Checkups.js
  listContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },
  listWrapper: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  listView: {
    width: '100%'
  },
  listRowApproved: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 7,
    backgroundColor: '#87CEEB', //Approved
    opacity: 1.0,
    marginTop: 3,
    width: '100%',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#8A2BE2'
  },
  listRowPending: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 7,
    backgroundColor: '#87CEEB', //Pending
    opacity: 1.0,
    marginTop: 3,
    width: '100%',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#FFFF00'
  },
  listRowHomeSafe: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 7,
    backgroundColor: '#32CD32', //Home Status: Checkups only
    opacity: 0.85,
    marginTop: 3,
    width: '100%',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#8A2BE2'
  },
  listRowDeclined: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 7,
    backgroundColor: '#DC143C', //Declined
    opacity: 0.7,
    marginTop: 3,
    width: '100%',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#8A2BE2'
  },
  listRowTextApproved: {
    flex: 1,
    textAlign: 'center',
    fontSize: 24,
    color: '#FFFF00'
  },
  listRowTextPending: {
    flex: 1,
    textAlign: 'center',
    fontSize: 24,
    color: '#FFFF00'
  },
  listRowTextHomeSafe: {
    flex: 1,
    textAlign: 'center',
    fontSize: 24,
    color: '#8A2BE2'
  },
  listRowTextDeclined: {
    flex: 1,
    textAlign: 'center',
    fontSize: 24,
    color: '#1a1aff'
  },

  // LogoutHeader.js
  // LogoutHeader.js
  logoutHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    height: 45,
  },
  logoutButtonWrapper: {

  },
  logoutButtonText: {
    color: '#3498db',
    fontSize: 20,
    padding: 10,
    textAlign: 'center'
  },

  // CheckinsHeader.js
  // CheckinsHeader.js
  checkinsHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  addCheckinButtonWrapper: {
    width: '100%',
    backgroundColor: '#8880ff'
  },
  addCheckinButtonText: {
    fontSize: 20,
    padding: 7,
    textAlign: 'center',
    color: 'white'
  },

  // Footer.js
  // Footer.js
  mainFooter: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  checkinsButtonWrapper: {
    width: '40%'
  },
  checkinsButtonText: {
    color: '#3498db',
    fontSize: 20,
    padding: 10,
    textAlign: 'center'
  },
  checkupsButtonWrapper: {
    width: '40%'
  },
  checkupsButtonText: {
    color: '#3498db',
    fontSize: 20,
    padding: 10,
    textAlign: 'center'
  },

  // Checkup.js
  // Checkup.js
  checkupContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '97.5%',
  },
  map: {
    width: '100%',
    height: '55%',
  },
  checkupBody: {
    height: '45%',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkupBodyPending: {
    height: '40%',
    width: '98%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  checkupBodyApproved: {
    height: '45%',
    width: '98%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkupButtonWrapperApprove: {
    width: '100%',
    height: '49%',
    backgroundColor: '#87CEEB',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 10,
  },
  checkupButtonTextApprove: {
    color: 'white',
    fontSize: 23,
    padding: 10,
    textAlign: 'center'
  },
  checkupButtonWrapperDecline: {
    width: '100%',
    height: '49%',
    backgroundColor: '#DC143C',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 10,
    opacity: 0.75,
  },
  checkupButtonTextDecline: {
    color: 'white',
    fontSize: 23,
    padding: 10,
    textAlign: 'center'
  },
  pingRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#DC143C', //Declined
    opacity: 0.7,
    marginTop: 3,
    width: '100%',
    borderRadius: 10,
    borderWidth: 2,
  },
  pingText: {
    color: 'white',
    fontSize: 20
  },

  // NewCheckin.js
  // NewCheckin.js
  addCheckinContainer: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'column',
    alignItems: 'center',
  },
  addCheckinPicker: {
    width: 59,
  },
  addCheckinPickerYear: {
    width: 77,
    marginRight: 10
  },
  addCheckinPickerMonth: {
    width: 73,
  },
  addCheckinPickerDay: {
    width: 59,
  },
  addCheckinBody: {
    height: '45%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addCheckinTime: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  addCheckinMap: {
    width: '100%',
    height: '40%',
    marginBottom: 0,
  },
  submitNewCheckinButtonWrapper: {
    width: '40%'
  },
  submitNewCheckinButtonText: {
    color: '#3498db',
    fontSize: 20,
    padding: 10,
    textAlign: 'center'
  },

  // Checkin.js
  // Checkin.js
  checkinContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '97.5%',
  },
  checkinBody: {
    height: '45%',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkinBodyPending: {
    height: '40%',
    width: '98%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  checkinBodyDeclined: {
    height: '39%',
    width: '98%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkinBodyUnresponsive: {
    height: '40%',
    width: '98%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  checkinButtonWrapperEdit: {
    width: '100%',
    height: '49%',
    backgroundColor: '#87CEEB',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 10,
  },
  checkinButtonTextEdit: {
    color: 'white',
    fontSize: 23,
    padding: 10,
    textAlign: 'center'
  },
  checkinButtonWrapperCancel: {
    width: '100%',
    height: '49%',
    backgroundColor: '#DC143C',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 10,
    opacity: 0.75,
  },
  checkinButtonTextCancel: {
    color: 'white',
    fontSize: 23,
    padding: 10,
    textAlign: 'center'
  },
  checkinButtonWrapperSnooze: {
    width: '100%',
    height: '49%',
    backgroundColor: '#ffff66',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 10,
  },
  checkinButtonTextSnooze: {
    color: '#33adff',
    fontSize: 23,
    padding: 10,
    textAlign: 'center'
  },
  checkinButtonWrapperDisable: {
    width: '100%',
    height: '49%',
    backgroundColor: '#DC143C',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 10,
    opacity: 0.75,
  },
  checkinButtonTextDisable: {
    color: 'white',
    fontSize: 23,
    padding: 10,
    textAlign: 'center'
  },
  checkinButtonWrapperRemove: {
    width: '100%',
    height: '60%',
    backgroundColor: '#DC143C',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 10,
    opacity: 0.75,
  },
  checkinButtonTextRemove: {
    color: 'white',
    fontSize: 23,
    padding: 10,
    textAlign: 'center'
  },

  //SelectEm.js
  //SelectEm.js
  selectEmContainer: {
    height: '100%',
    width: '100%',
  },
  selectEmRowStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    opacity: 1.0,
    marginTop: 3,
    width: '100%',
  },
  selectEmListRowTextStyle: {
    flex: 1,
    textAlign: 'left',
    fontSize: 24,
    color: '#2980b9',
  },

  errorText: {
    color: 'red',
  }
});
