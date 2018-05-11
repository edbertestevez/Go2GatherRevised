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
  headerLogo:{
    width: 42,
    height: 42,
    marginLeft:5
  },
  headerTitle:{
    fontSize: 22,
    letterSpacing: 2.5,
    color: '#edfeff',
    fontFamily: 'Impact'
  },
  header:{
    backgroundColor: "#1b5454",
    zIndex:2
  },

  //colors
  bg_primary:{
    backgroundColor: "#1b5454",
  },
  bgRed:{
    backgroundColor: '#bf2409', 
  },
  bgBlue:{
    backgroundColor: '#435cd8',
  },

  horizontalView: {
    flexDirection: 'row' 
  },
  verticalView: {
    flexDirection: 'column' 
  },
  alignCenter: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerRightLogo:{
    marginLeft: 12,
    width: 35,
    height: "100%"
  },
  notifCount: {
      height: 14,
      width: 14,
      borderRadius: 20/2,
      alignItems: 'center',
      opacity:0.9,
      top: 0,
      right: 0,
      position: 'absolute'
  },
  font10:{
    fontSize: 10
  },
  c_white:{
    color:'#fff'
  },
  searchArea:{
    width:'90%', 
    backgroundColor: '#fafafa', 
    position:'absolute', 
    top:15, 
    zIndex: 2, 
    marginLeft:'5%', 
    borderRadius: 5,
    shadowColor: '#cacaca',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    borderTopWidth: 0,
    shadowRadius: 2,
    elevation: 3
  },
  searchResult:{
    position: 'absolute',
    backgroundColor: '#000000',
    width: '100%',
    height: '100%',
    zIndex: 1
  },
  m10:{
    margin:10
  },
  mlr5:{
    marginLeft: 5,
    marginRight: 5
  },
  p15:{
    padding: 15
  },
  lineBottom:{
    borderBottomWidth: 1,
    borderBottomColor: '#cacaca'
  },

  //VIEW MEETUP
  btn_mr10:{
    color:"white", marginRight:10
  },
  btn_cwhite_14:{
    color:"white", 
    fontSize:14
  },
  viewMeetupTitle:{
    width:"100%",
    color:"white",
    fontSize:23,
    fontWeight:"bold",
    marginBottom:15
  },
  roundButton:{
    paddingLeft:15, paddingRight:25, marginBottom:20,marginRight:8
  },
  formCustIcon:{
    maxWidth:30,
    height:25
  },
  buttonWhiteText:{
    color:"white",
    fontSize:14
  },
  buttonBlackText:{
    color:"black",
    fontSize:14
  },
    selectRoundButton:{
    paddingLeft:30, paddingRight:30, marginRight:5
  },
  //PROFILE
  profileImage:{
    width: 120,
    height: 120,
    borderRadius: 110,
    zIndex:10,
    marginVertical: 20,
  },
  user_name:{
    fontSize:20,
    color: '#fff',
    //marginTop: 20,
    marginBottom: 20,
    fontWeight:'bold'
  },
  roundButtonNoIcon:{
    paddingLeft:25, paddingRight:25, marginBottom:20,marginRight:8
  },
});
