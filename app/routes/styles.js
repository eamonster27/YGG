import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  buttonText: {
    fontSize: 20,
    padding: 10,
    textAlign: 'center'
  },
  buttonWrapper: {
		backgroundColor:'#D3D3D3',
		marginBottom: 10,
    width: 300
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  form: {
    width: 300
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
    width: '100%'
  },
  rowText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    color: 'white'
  }
});
