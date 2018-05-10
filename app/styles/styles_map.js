import {StyleSheet} from 'react-native';
module.exports = StyleSheet.create({
  radius:{
    height: 50,
    width: 50,
    borderRadius: 50/2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,122,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0,122,255,0.3)',
    alignItems:'center',
    justifyContent: 'center'
  },
  myMarker:{
    height: 20,
    width:20,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 20/2,
    overflow: 'hidden',
    backgroundColor: '#007AFF'
  },
  infoMap:{
    width:'100%',
    height:'auto',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    position:'absolute',
    zIndex:2,
    backgroundColor: 'rgba(255,255,255,0.8)',
  }
});
