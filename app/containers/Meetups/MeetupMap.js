import React, { Component } from 'react';
import {View, TouchableHighlight, StyleSheet,Image, BackHandler} from "react-native";
import { NavigationActions } from 'react-navigation';
//REDUX
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../../actions'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import MapViewDirections from 'react-native-maps-directions';
import {Container, Header, Root, Content, ActionSheet, Fab, Thumbnail, Text, Footer, FooterTab, StyleProvider, Left, Right, Button, Body, Title, Card, CardItem} from 'native-base';
//CONTENT
import styles from '../../styles/styles'
//import GeocoderAPI from '../../config/geocoder';
import RNGooglePlaces from 'react-native-google-places';
import Geocoder from 'react-native-geocoding';
//MAPS
import MapView, {Marker, Callout} from 'react-native-maps';
import mapstyles from '../../styles/styles_map';
import moment from 'moment';

import * as firebase from 'firebase'

const defaultAPIKey = "AIzaSyD2AcRJkV3zokjx3oxmLJHBQOmRelqKPY0";
Geocoder.setApiKey(defaultAPIKey);

class MeetupMap extends Component {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	//edit this to actual props
	  	meetup:{
			longitude: 0,
			latitude: 0,
			longitudeDelta:0.004,
			latitudeDelta:0.004,
			place: "",
			address:"",
			time:"",
			date:'',
		},
		info:{
			duration: '',
			distance: '',
		},
		aboutClicked: false,
		//usersPoints:[],
		userButtons:[],
		usersInfo:[],
		showDirection: false,
	  };

	  this.userList=[];
	  this.buttonList=[{text: "Close",icon:'close'}];
	}

	componentWillMount(){
		const {state} = this.props.navigation;
		console.log(state.params.info.key);
		console.log("PROPS " + JSON.stringify(state.params));
		this.setState({
			meetup:{
				title: state.params.info.event_name,
				longitude: state.params.info.longitude,
				latitude: state.params.info.latitude,
				longitudeDelta:0.004,
				latitudeDelta:0.004,
				place: state.params.info.event_location,
				address:state.params.info.event_address,
				time:state.params.info.event_time,
				date:state.params.info.event_date
			},
			myLocation:{
				latitude: this.props.location.user_location.latitude,
				longitude:  this.props.location.user_location.longitude,
			},
			regionPoint:{
				longitude: state.params.info.longitude,
				latitude: state.params.info.latitude,
				longitudeDelta:0.004,
				latitudeDelta:0.004,
			}
		});


		firebase.database().ref("/meetups/"+state.params.info.key+"/users").on('child_added', (snapshot) =>{
			if(snapshot.key != this.props.account.uid){
				//console.log(snapshot.key)

				//GET RECORD OF EACH USER
				firebase.database().ref("/users/"+snapshot.key).once('value', (dataSnapshot) =>{
					var user_uid = snapshot.key;
					var user_name = dataSnapshot.child("name").val();
					var user_photo = dataSnapshot.child("photo").val();
					var user_latitude = dataSnapshot.child("location").child("latitude").val();
					var user_longitude = dataSnapshot.child("location").child("longitude").val();

					this.userList.push({
						uid: user_uid,
						name: user_name,
						photo: user_photo,
						latitude: user_latitude,
						longitude: user_longitude
					})

					this.buttonList.push({
						text: user_name,
						icon:'search'
					})

					this.setState({
						usersInfo: this.userList,
						userButtons: this.buttonList
					})
				});

				//CHANGE RECORD OF INDIVIDUAL USER
				firebase.database().ref("/users/"+snapshot.key).on('child_changed', (dataSnapshot) =>{
					//update the record's specific data changed
					var indexUpdate = this.state.usersInfo.findIndex((value)=>value.uid==snapshot.key);
					console.log("CHANGE HAPPEN ON = ",snapshot.key,dataSnapshot.key, indexUpdate);
					
					if(dataSnapshot.key!="location"){
						var updateValue = dataSnapshot.val();
					}else{
						var newLong = dataSnapshot.child("longitude").val();
						var newLat = dataSnapshot.child("latitude").val();
						var updateValue = {
							latitude: newLat,
							longitude: newLong
						}
						console.log(JSON.stringify(updateValue))
					}

					let usersInfo = [...this.state.usersInfo];
					switch(dataSnapshot.key){
						case "photo":{usersInfo[indexUpdate].photo = updateValue;}break;
						case "location":{
							usersInfo[indexUpdate].latitude = updateValue['latitude'];
							usersInfo[indexUpdate].longitude = updateValue['longitude'];
						}break;
						case "name":{usersInfo[indexUpdate].name = updateValue;}break;
						case "phone":{usersInfo[indexUpdate].phone = updateValue;}break;
					}
					this.setState({
						usersInfo
					})	

					console.log("UPDATED: ", this.state.usersInfo)
					
				});
			}
		});

		firebase.database().ref("/meetups/"+state.params.info.key+"/users").on('child_removed', (snapshot) =>{
			console.log("REMOVED USER: ",snapshot.key)
			var indexRemove = this.state.usersInfo.findIndex((value)=>value.uid==snapshot.key);
			console.log("INDEX REMOVED = ",indexRemove);
			if(indexRemove!=-1){
				var userArray = this.state.usersInfo;
				var buttonArray = this.state.userButtons;
				userArray.splice(indexRemove,1)	
				buttonArray.splice(indexRemove+1,1)	
				this.setState({	
					usersInfo:userArray,
					userButtons: buttonArray
				})
				//that.state.meetups.filter( (item, index) => indexRemove !== index)
				console.log("DATA AFTER REMOVED",this.state.usersInfo)
			}
		});
	}
	componentDidMount() {
	    var that = this;
	    BackHandler.addEventListener('hardwareBackPress', function() {
	    that.props.navigation.goBack();return true;
	   });
	  }
	

	gotoMyLocation(){
		var that = this;
		this.setState({
			regionPoint:{
				latitude: that.props.location.user_location.latitude,
				longitude: that.props.location.user_location.longitude,	
				longitudeDelta:0.004,
				latitudeDelta:0.004,
			}
		})
		
		this._map.animateToRegion({
			latitude: that.props.location.user_location.latitude,
			longitude: that.props.location.user_location.longitude,	
			longitudeDelta:0.004,
			latitudeDelta:0.004,
		}, 500)
	}

	toggleDirection(){
		var that = this;
		console.log(that.state.showDirection);
		that.state.showDirection == false ? that.setState({showDirection:true}) : that.setState({showDirection:false})
	}

	gotoMeetupLocation(){
		var that = this;
		this.setState({
			regionPoint:{
				latitude: that.state.meetup.latitude,
				longitude: that.state.meetup.longitude,	
				longitudeDelta:0.004,
				latitudeDelta:0.004,
			}
		})
		this._map.animateToRegion({
			latitude: that.state.meetup.latitude,
			longitude: that.state.meetup.longitude,	
			longitudeDelta:0.004,
			latitudeDelta:0.004,
		}, 500)
	}

	gotoSelectedLocation(num){
		
		//console.log("EDEODKEoJDE");
		var that = this;
		if(num!=0){
			this.setState({
				regionPoint:{
					latitude: that.state.usersInfo[num-1].latitude,
					longitude: that.state.usersInfo[num-1].longitude,	
					longitudeDelta:0.004,
					latitudeDelta:0.004,
				}
			})
			this._map.animateToRegion({
				latitude: that.state.usersInfo[num-1].latitude,
				longitude: that.state.usersInfo[num-1].longitude,	
				longitudeDelta:0.004,
				latitudeDelta:0.004,
			},500)
		}
	}

	setInfo(result){
		this.setState({
		    info:{
		    duration: result.duration,
		    distance: result.distance
		}});
		console.log("MAPS")
	}

	showFriendsList(){
		var that = this;
		var BUTTONS = that.state.userButtons;
		var CANCEL_INDEX = 0;

		ActionSheet.show(
	        {
	            options: BUTTONS,
	            cancelButtonIndex: CANCEL_INDEX,
	            title: "Go to User's Location"
	        },
	        buttonIndex => {
	            that.gotoSelectedLocation(buttonIndex);
	            
	        }
	    )
	}

	render(){
		const {goBack} = this.props.navigation;
		return(
			<Container style={{flex:1}}>

	        <Header style={styles.header}>
	          	<Left style={{flex:1}}>
	          	<Icon 
	         		name="arrow-back" 
	         		size={28} 
	         		style={{color:'white'}}
	         		onPress={() => goBack()}
	         	/>
	          	</Left>
	          	<Body style={{flex:5, alignItems:'center', justifyContent:'center',zIndex:1}}>
	          		<Text style={{color:'white', fontWeight:'bold', fontSize:20}}>
	          			{this.state.meetup.title}
	          		</Text>
	          	</Body>
	         	<Right style={{flex:1}}>
	         		{this.state.aboutClicked
	         			?
	         			<Icon 
	         				name="info-outline" 
	         				size={28} 
	         				style={{color:'yellow'}}
	         				//onPress={()=>this.setState({aboutClicked:false})}
	         			/>
	         			:
	         			<Icon 
	         				name="info-outline" 
	         				size={28} 
	         				style={{color:'white'}}
	         				//onPress={()=>this.setState({aboutClicked:true})}
	         			/>
	         		}
	          		
	        	</Right>
	        </Header>
	       
	        <View style={{flex:1,zIndex:1}}>
			
			{this.state.aboutClicked
			?
			<View style={mapstyles.infoMap}>
		        <Text style={{fontSize:17,fontWeight:'bold', color:'#660000'}}>
		        	Date: {moment(this.state.meetup.date).format('LL')}
		        </Text>
		        <Text style={{fontSize:17,fontWeight:'bold', color:'#660000',marginBottom:5}}>
		        	Time: {this.state.meetup.time}
		        </Text>
		        <Text style={{fontSize:15,fontWeight:'bold'}}>Travel Time: {this.state.info.duration}4min</Text>
		        <Text style={{fontSize:15,fontWeight:'bold'}}>Distance: {this.state.info.distance}800m</Text>
	        </View>
	        :null
	    	}

			{this.state.regionPoint.latitude != 0 ?
			<MapView
				ref={component => {this._map = component;}}
				style={StyleSheet.absoluteFill}
				mapType={this.props.location.mapType}
	        	initialRegion={{
		            latitude: this.state.regionPoint.latitude,
		            longitude: this.state.regionPoint.longitude,
		            latitudeDelta: 0.004,
		            longitudeDelta: 0.004,
		        }}
		    >
		        <Marker coordinate={{latitude: this.state.meetup.latitude,longitude: this.state.meetup.longitude,}}>
			    <View><Image style={{width: 60, height:60}} source={require('../../img/maplogo.png')}/></View>
			    </Marker>

			   	{
			   		this.state.usersInfo.map((record,index)=>{		
			   		var userPhoto = record.photo;
					return(
					    <Marker 
					    	coordinate={{
					    		latitude:record.latitude,
					    		longitude:record.longitude
					    	}} 
					    	key={index}>
					    <View>
					    <Image style={{width: 60, height:60}}source={require('../../img/usermarker2.png')}/>
					    <Thumbnail
				          style={{width: 38, height: 38, position:'absolute', marginLeft:11, marginTop:4}}
				          source={{uri: userPhoto}}
				        />
					    </View>
					    </Marker>			
			   		);
			   		})
			   	}

			    <Marker coordinate={{latitude: this.props.location.user_location.latitude,longitude: this.props.location.user_location.longitude,}}>
			     <View>
					    <Image style={{width: 60, height:60}}source={require('../../img/usermarker.png')}/>
					    <Thumbnail
				          style={{width: 38, height: 38, position:'absolute', marginLeft:11, marginTop:4}}
				          source={{uri: this.props.account.photo}}
				        />
			    </View>
			    </Marker>

	        	{this.state.showDirection == true ?
	        	<MapViewDirections
	              origin={{
	              	//users location
	                	latitude: this.props.location.user_location.latitude,
			            longitude: this.props.location.user_location.longitude,
	              }}
	              destination={{
	              	//destination search location
	                	latitude: this.state.meetup.latitude,
			            longitude: this.state.meetup.longitude,
	              }}
	              apikey={"AIzaSyD2AcRJkV3zokjx3oxmLJHBQOmRelqKPY0"}
	              strokeWidth={8}
	              strokeColor="#1b5454"
	             //  onReady={(result)=>{console.log("MAP")}}
	             //  //onReady={(result) => this.setInfo(result)}
		            // onError={(errorMessage) => {
		            //   // console.log('GOT AN ERROR');
		            // }}
	            /> 
	            :null}
	        </MapView>
	        :null}

		        <Fab
		            style={{backgroundColor:"#f2f2f2",zIndex:5,marginBottom:195}}
		            position="bottomRight"
		            onPress={()=>this.gotoMyLocation()}>
		            
		            <Icon name="my-location" style={{ color:"#4f4f4f"}}/>
		        </Fab>
		        
		        <Fab
		            style={{backgroundColor:"#f2f2f2",zIndex:5,marginBottom:130}}
		            position="bottomRight"
		            onPress={()=>this.toggleDirection()}>
		            <View style={{flexDirection:'column', justifyContent:"center", alignItems:"center"}}>
		            {this.state.showDirection ?	
		            	<Icon name="directions" style={{color:"#028fe5", fontSize:30}}/>
		            :
		            	<Icon name="directions" style={{color:"#4f4f4f", fontSize:30}}/>
		        	}	
		            </View>
		        </Fab>

		        <Fab
		            style={{backgroundColor:"#1b5454",zIndex:5,marginBottom:65}}
		            position="bottomRight"
		            onPress={()=>this.gotoMeetupLocation()}>
		            
		            <Thumbnail source={require('../../img/logo.png')} style={{width:40, height:40}}/>
		        </Fab>

	            <Fab
		            style={{backgroundColor:"#1b5454",zIndex:5}}
		            position="bottomRight"
		            onPress={()=>this.showFriendsList()}>
		            <Icon name="people" />
		        </Fab>
	        </View>
	        
	      	</Container>
		)
	}
}

//PROPS
const mapStateToProps = state => ({
  location: state.location,
  account: state.auth
});
 
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(MeetupMap);