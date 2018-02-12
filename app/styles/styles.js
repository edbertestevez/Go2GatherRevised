import {StyleSheet} from 'react-native';
module.exports = StyleSheet.create({
  mainContainer:{
    flex: 1,
    backgroundColor: "#033031",
    alignItems: 'center',
  },
  logoname:{
    fontSize: 40,
    fontFamily: 'Impact',
    color: '#d8f9fa',
    textAlign: 'center',
    marginTop:-20,
    marginBottom: 5
  },
  footerText:{
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
  footerName:{
    fontSize: 14,
    color: 'white',
    fontWeight:'bold',
    textAlign: 'center',
  },
  footerContainer:{
    position: 'absolute',
    bottom: 20
  },
  subTitle:{
    fontSize: 22,
    color: '#fff',
    textAlign: 'center',
    width: '65%',
    marginBottom: 45
  },
  bgRed:{
    backgroundColor: '#bf2409', 
  },
  bgBlue:{
    backgroundColor: '#435cd8',
  },
  optionText:{
    width: '80%', 
    justifyContent: 'center',
  },
  optionButton:{
    width: '70%', 
    height: 55, 
    flexDirection: 'row', 
    marginBottom: 10,
    alignItems:'center',
    //borderRadius: 50,
  },
  optionIcon:{
    width: 50, 
    justifyContent: 'center'
  },
  optionButtonIcon:{
    width: 60, 
    color: 'white',
    marginLeft: 15
  },
  optionButtonText:{
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginRight: 30,
    marginLeft:-10
  },

});
