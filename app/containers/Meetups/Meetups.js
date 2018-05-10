import React, { Component } from 'react';

import {StyleSheet, View, Image, TouchableOpacity, FlatList, BackHandler} from 'react-native';
import {Spinner, Text, Button, Container, Header, Content, Left, Right, Footer, Tabs, Icon, Title, Card, CardItem, Fab} from 'native-base';
import moment from 'moment';
//REDUX
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../../actions';
import styles from '../../styles/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MeetupBadge from '../../components/MeetupBadge';
import { NavigationActions } from 'react-navigation';
import FriendRequestBadge from '../../components/FriendRequestBadge';
class Meetups extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      isGettingData: true
    };
    this.meetupList = [];
  }

  componentDidMount(){
    this.setState({
      isGettingData:false
    })
  }


  static navigationOptions = ({navigation}) => {
    const { state, setParams, navigate } = navigation;
    return{
      headerLeft: <Image source={require('../../img/logo.png')} style={styles.headerLogo}/>,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#1b5454'
      },
      tabBarOptions: {
        showLabel: true
      },
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons name="map-marker-radius" style={{fontSize: 26, color: tintColor}}/>
      ),
      headerTitle: <Text style={styles.headerTitle}>Meetups</Text>,
      headerRight: 
      <View style={[styles.horizontalView, styles.alignCenter, {marginRight:5}]}>
        <TouchableOpacity style={styles.headerRightLogo} onPress={()=>navigate("MeetupRequests")}>
          <MaterialCommunityIcons name="map-marker-plus" color="white" size={27}/>
          <MeetupBadge/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.headerRightLogo}  onPress={()=>navigate("FriendRequests")}>
          <MaterialIcons name="person-add" color="white" size={28}/>
          <FriendRequestBadge/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.headerRightLogo}>
          <Ionicons name="md-settings" color="white" size={27}
          onPress={()=>alert("Settings")}/>
        </TouchableOpacity>
       
      </View>,
      drawerLockMode: 'locked-closed'
    }
  }

  render() {
    return (
      <Container>
    	<Content>
      {this.state.isGettingData ? <Spinner color='#000'/>:null}
              
        <FlatList
                extraData={this.props.state}
                data={this.props.meetups.meetupList}
                renderItem={({item,index})=>{
                  return(
                    <TouchableOpacity 
                      key={index}
                      onPress={()=>this.props.navigation.navigate("ViewMeetup", {info:item})}
                      //onPress={()=>alert(JSON.stringify(item))}
                      //delayLongPress={3800}
                      //onLongPress={()=>alert("DELETE")}
                      style={{backgroundColor:'white', marginTop:5, marginLeft:5, marginRight: 5}}>
                      <CardItem style={{marginBottom:5, flexWrap:"wrap"}}>
                            <View style={{flexDirection:'row'}}>
                              <View style={{flexDirection:'column', width:"92%",flexWrap:"wrap", marginRight:50, marginLeft: 15}}>
                                <Text style={styles.meetupTitle}>{item.event_name}</Text>
                                <Text style={{fontWeight:'bold'}}>{item.event_location}</Text>
                                <Text>{moment(item.event_date).format('LL')} ({item.event_time})</Text>
                              <Text style={{marginRight:10, fontSize: 14}}>{item.event_address}</Text>
                                </View>
                            </View>
                         </CardItem>
                    </TouchableOpacity>
                  );
                }}
              />
    	</Content>
      </Container>
    );
  }
}


//PROPS
const mapStateToProps = state => ({
  meetups: state.meetups,
  
});
 
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(Meetups);