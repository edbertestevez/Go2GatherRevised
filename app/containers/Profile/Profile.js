import React, { Component } from 'react';

import {StyleSheet, View, Image, TouchableOpacity, ToastAndroid} from 'react-native';
import {Text, Button, Container, Header, Content, Left, Right, Footer, Tabs, Tab, Icon, Form, Item, Label, List, ListItem, Thumbnail, Body, Input} from 'native-base';
//REDUX
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../../actions';
import styles from '../../styles/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MeetupBadge from '../../components/MeetupBadge';
import FriendRequestBadge from '../../components/FriendRequestBadge';
import * as firebase from 'firebase';
class Profile extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      name:'',
      email: "",
      phone: '',
      photo: '',
      friends: []
    };
   
   this.friendsData = []; 
  }

  

  componentWillMount(){
    this.getFriendsData(this.props.account.uid);
    this.setState({
      name:this.props.account.name,
        email: this.props.account.email,
        phone: this.props.account.phone,
        photo: this.props.account.photo,
    });
    
  }

  getFriendsData(uid){
    firebase.database().ref("/users_friends/"+uid).on("child_added",(snapshot)=>{
      //GET USERS DATA
      firebase.database().ref("/users/"+snapshot.key).on("value",(dataSnap)=>{
        var name = dataSnap.child("name").val();
        var email = dataSnap.child("email").val();
        var photo = dataSnap.child("photo").val();
        this.friendsData.push({
          key:snapshot.key,
          name:name,
          email:email,
          photo:photo
        });
        this.setState({friends:this.friendsData})
      });
    });
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
        <Ionicons name="md-person" style={{fontSize: 26, color: tintColor}}/>
      ),
      headerTitle: <Text style={styles.headerTitle}>Profile</Text>,
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
    		<Content style={{}}>
          <View style={{alignItems:'center', justifyContent:"center", backgroundColor:'#4d5563'}}>
            <Image source={{uri: this.state.photo}} style={styles.profileImage}/>
            <Text style={styles.user_name}>{this.state.name}</Text>
          </View>
          <Tabs initialPage={0} style={{backgroundColor: '#fff'}}>
            <Tab heading="Personal Details"  tabStyle={{backgroundColor: "#59667c", color: "#fff"}} activeTabStyle={{backgroundColor:'#3a404c', color: "#fff"}}>
              <Form style={{marginLeft: 10, marginRight: 30, marginVertical:15}}>
                  <Item stackedLabel>
                    <Label>Name:</Label>
                    <Input editable = {false} selectTextOnFocus={true} onChangeText={(name)=>this.setState({name})}>{this.state.name}</Input>
                  </Item>

                  <Item stackedLabel>
                    <Label>Email:</Label>
                    <Input editable = {false} selectTextOnFocus={true} onChangeText={(email)=>this.setState({email})}>{this.state.email}</Input>
                  </Item>

                  <Item stackedLabel>
                    <Label>Phone:</Label>
                    <Input editable = {false} selectTextOnFocus={true} onChangeText={(phone)=>this.setState({phone})}>{this.state.phone}</Input>
                  </Item>
                </Form>
            </Tab>
            <Tab heading="Friends" tabStyle={{backgroundColor: "#59667c", color: "#fff"}}  activeTabStyle={{backgroundColor:'#3a404c', color: "#fff"}}>
              <List>
                    {this.state.friends.map((record,index)=>{
                      return(
                        <ListItem key={index} onPress={()=>this.props.navigation.navigate("OtherProfile",{info:record})}>
                          <Left style={{flex:1}}>
                            <Thumbnail width={50} height={50} source={{uri: record.photo}} />
                          </Left>
                          <Body style={{flex:3}}>
                            <Text style={{fontSize:14}}>{record.name}</Text>
                            <Text style={{fontSize:12}}>{record.email}</Text>
                          </Body>
                          <Right style={{flex:1}}/>
                        </ListItem>
                      )
                    })
                    }
                  </List>
            </Tab>
          </Tabs>
          
                
        </Content>
    	</Content>
      </Container>
    );
  }
}


//PROPS
const mapStateToProps = state => ({
  state: state,
  account: state.auth
});
 
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(Profile);