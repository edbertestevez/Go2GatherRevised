import React, { Component } from 'react';
import {View, Text, TouchableOpacity, ToastAndroid, Image, Dimensions, ScrollView, Alert, BackHandler} from "react-native";
import { NavigationActions } from 'react-navigation';
//REDUX
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../../actions'
import {FlatList } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import ResponsiveImage from 'react-native-responsive-image';
import {Container, Header, Spinner, Content, Thumbnail, Form, Input, Item, Label, Footer, List, ListItem, StyleProvider, Left, Right, Button, Body, Title, Tab, Tabs, TabHeading} from 'native-base';
import * as firebase from 'firebase';
import moment from 'moment';
import * as constants from '../../constants'

import styles from '../../styles/styles'

class ViewMeetup extends Component {

	constructor(props) {
	  super(props);
	  this.state = {
	      	meetupData:[],
	      	creatorName:"",
			isGettingData: true,
			goingData:[]
	    };
	    this.going = [];
	}

	componentWillMount(){
		const {state} = this.props.navigation;
		this.setState({meetupData:state.params.info})
		this.getCreatorName(state.params.info.creator);
		this.getMeetupFriends(state.params.info.key);
	}

	componentDidMount() {	
	    var that = this;
		    BackHandler.addEventListener('hardwareBackPress', function() {
		    that.props.navigation.goBack();
		    // that.props.navigation.navigate("Main");
		    return true;
		});
	}

	getCreatorName(user_uid){
		firebase.database().ref("/users/"+user_uid+"/name").on("value",(snapshot)=>{
			this.setState({creatorName:snapshot.val()});
		});
	}

	getMeetupFriends(meetup_key){
		firebase.database().ref("/meetups/"+meetup_key+"/users").on("child_added",(snapshot)=>{
			//GET USERS DATA
			firebase.database().ref("/users/"+snapshot.key).on("value",(dataSnap)=>{
				var name = dataSnap.child("name").val();
				var email = dataSnap.child("email").val();
				var photo = dataSnap.child("photo").val();
				this.going.push({
					key:snapshot.key,
					name:name,
					email:email,
					photo:photo
				});
				this.setState({goingData:this.going})
			});
		});
	}

	confirmDelete(){
		Alert.alert(
		  'Confirm Delete',
		  'Are you sure you want to delete this meetup?',
		  [
		  	{text: 'Cancel',  style: 'cancel'},
		  	{text: 'Yes', onPress: () => this.deleteMeetup()},
		  ],
		  { cancelable: false }
		)
	}

	confirmLeave(){
		Alert.alert(
		  'Confirm Leave',
		  'Are you sure you want to leave from this meetup?',
		  [
		    {text: 'Cancel',  style: 'cancel'},
		    {text: 'Yes', onPress: () => this.leaveMeetup()},
		  ],
		  { cancelable: false }
		)
	}

	deleteMeetup(){
		var that = this;
		firebase.database().ref("/meetups/"+that.state.meetupData.key).remove()
		.then(ToastAndroid.show(constants.DELETE_MEETUP_SUCCESS, ToastAndroid.SHORT))
		.then(that.props.navigation.navigate("Main"))	
	}

	leaveMeetup(){
		var that = this;
		firebase.database().ref("/meetups_users/"+that.props.account.uid+"/"+that.state.meetupData.key).remove()
		.then(firebase.database().ref("/meetups/"+that.state.meetupData.key+"/users/"+that.props.account.uid).remove())
		.then(ToastAndroid.show(constants.LEAVE_MEETUP_SUCCESS, ToastAndroid.SHORT))
		.then(that.props.navigation.navigate("Main"))	
	}

	render(){
		var headerTab2 = `Going (${this.going.length})`;
		return(
			<Container>
				<Header style={{elevation:0, backgroundColor:"#032d2d", zIndex:100}}>
					<Left>
						<Button transparent onPress={()=>this.props.navigation.navigate("Main")}>
							<Icon name="arrow-back" size={27} style={{color:"white"}}/>
						</Button>
					</Left>
					<Right>
						{this.state.meetupData.creator != this.props.account.uid ?
						<Button transparent onPress={()=>this.confirmLeave()}>
							<Text style={{fontSize:15,color:"#e8a92c",marginRight:2}}>Leave Meetup</Text>
						</Button>
						:
						<Button transparent onPress={()=>this.confirmDelete()}>
							<Icon name="delete" size={30} style={{color:"white", marginRight:5}}/>
						</Button>
						}
					</Right>
				</Header>
				<Content>
					<View style={{width:"100%",backgroundColor:"#032d2d", justifyContent:'center',alignItems:'center'}}>
						{/*<ResponsiveImage source={require('../../img/logo.png')} initWidth="100" initHeight="100" style={{marginBottom:0, marginTop:-5}}/>*/}
						<View>
							<Text style={styles.viewMeetupTitle}>{this.state.meetupData.event_name}</Text>
						</View>
						<View style={{marginBottom:-5}}>
							<Button 
								iconLeft rounded danger 
								style={styles.roundButton}
								onPress={()=>this.props.navigation.navigate("MeetupMap", {info:this.state.meetupData})}
							>
								<Icon name="map" size={22} style={styles.btn_mr10}/>
								<Text style={styles.btn_cwhite_14}>View Meetup Map</Text>
							</Button>
						</View>
						<View style={{flexDirection:"row"}}>
							<Button 
								rounded success iconLeft 
								style={styles.roundButton}
								onPress={()=>this.props.navigation.navigate("EditMeetup",{info:this.state.meetupData})}
							>
								<Icon name="edit" size={22} style={styles.btn_mr10}/>
								<Text style={styles.btn_cwhite_14}>Edit Meetup</Text>
							</Button>
							<Button 
								rounded primary iconLeft
								style={styles.roundButton}
								onPress={()=>this.props.navigation.navigate("SendMeetupInvite",{info:this.state.meetupData, going:this.state.goingData})}
							>
								<Icon name="send" size={22} style={styles.btn_mr10}/>
								<Text style={styles.btn_cwhite_14}>Invite Friends</Text>
							</Button>
						</View>
					</View>
					
					<Tabs tabBarUnderlineStyle={{backgroundColor:"#468484"}}>
			          <Tab 
			          	heading="Details" 
			          	tabStyle={{backgroundColor:'#f2f7f7'}} 
			          	activeTabStyle={{backgroundColor:'#f2f7f7'}} 
			          	textStyle={{color:"#016666"}} 
			          	activeTextStyle={{color:"#016666"}}>
			          	<View>
			          		<Form style={{paddingLeft:5, paddingRight:10, marginTop:10}}>
			          			<Item stackedLabel>
					              <Label style={{fontWeight:"bold"}}>Created By</Label>
					              <Input value={this.state.creatorName} underlineColorAndroid="transparent" disabled/>
					            </Item>
					            <Item stackedLabel>
					              <Label style={{fontWeight:"bold"}}>Meetup Place</Label>
					              <Input value={this.state.meetupData.event_location} disabled/>
					            </Item>
					            <Item stackedLabel>
					              <Label style={{fontWeight:"bold"}}>Address</Label>
					              <Input selectTextOnFocus={true} maxLength = {45} disabled value={this.state.meetupData.event_address}/>
					            </Item>
					            <Item stackedLabel>
					              <Label style={{fontWeight:"bold"}}>Date</Label>
					              <Input value={moment(this.state.meetupData.event_date).format('LL')} disabled/>
					            </Item>
					            <Item stackedLabel last>
					              <Label style={{fontWeight:"bold"}}>Time</Label>
					              <Input value={this.state.meetupData.event_time} disabled/>
					            </Item>
					            
					          </Form>
			          	</View>
			          </Tab>


			          <Tab heading={headerTab2}
			          	tabStyle={{backgroundColor:'#f2f7f7'}} 
			          	textStyle={{color:"#016666"}} 
			          	activeTextStyle={{color:"#016666"}} 
			          	activeTabStyle={{backgroundColor:'#f2f7f7'}}>
			          	<List>
			          		{this.state.goingData.map((record,index)=>{
			          			return(
			          				<ListItem key={index}>
						              <Left style={{flex:1}}>
						                <Thumbnail width={50} height={50} source={{uri: record.photo}} />
						              </Left>
						              <Body style={{flex:3}}>
						                <Text style={{fontSize:14}}>{record.name}</Text>
						              </Body>
						              {this.state.meetupData.creator == this.props.account.uid?
						              this.props.account.uid != record.key ?
						              <Right style={{flex:1}}>
						                <Text style={{color:"#660000"}}>Remove</Text>
						              </Right>
						              :<Right style={{flex:1}}/>
						              :null}
						            </ListItem>
			          			)
			          		})
			          		}
			          	</List>

			          	</Tab>
			        </Tabs>
				</Content>
			</Container>
		)
	}
}

//PROPS
const mapStateToProps = state => ({
  account: state.auth
});
 
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(ViewMeetup);