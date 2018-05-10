import React, { Component } from 'react';
import {View, Text, TouchableOpacity, ToastAndroid, Image, Dimensions, Alert} from "react-native";
import { NavigationActions } from 'react-navigation';
//REDUX
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../../actions'
import { BackHandler, ListView } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ResponsiveImage from 'react-native-responsive-image';
import {Container, Header, Content, Form, Input, Item, Label, Spinner, Footer, StyleProvider, Left, Right, Button, Body, Title, Card, CardItem, Fab} from 'native-base';
import * as firebase from 'firebase';
import moment from 'moment';
import * as constants from '../../constants'

import styles from '../../styles/styles'

class MeetupRequests extends Component {

	constructor(props) {
	  super(props);
	  const dsRequests = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	 	this.state = {
	      requestsDataSource: dsRequests,
	      requests:[],
	      isGettingData: false
	    };
	    this.renderRow = this.renderRow.bind(this);
	}

	componentDidMount() {	
	    var that = this;
		    BackHandler.addEventListener('hardwareBackPress', function() {
		    that.props.navigation.goBack();return true;
		});

		this.setState({
			requestsDataSource: this.state.requestsDataSource.cloneWithRows([{key:1}])
		})
	}

	acceptRequest(request_key,meetup_key){
		var that = this;
		firebase.database().ref("/requests/"+that.props.account.uid+"/"+request_key).remove().then(
			firebase.database().ref("/meetups_users/"+that.props.account.uid+"/"+meetup_key).set({status:"active"})
			.then(firebase.database().ref("/meetups/"+meetup_key+"/users/"+that.props.account.uid).set({status:"active"}))
			.then(ToastAndroid.show(constants.REQUEST_ACCEPT_SUCCESS, ToastAndroid.SHORT))
		);
	}

	deleteRequest(key){
		var that = this;
		//console.log(key);
		firebase.database().ref("/requests/"+that.props.account.uid+"/"+key).remove()
		.then(ToastAndroid.show(constants.REQUEST_DECLINE_SUCCESS, ToastAndroid.SHORT));
		//firebase.database().ref("/requests/"+that.props.account.uid+"/"+key).remove();
	}

	confirmAccept(meetup_name, request_key,meetup_key){
		Alert.alert(
			  'Accept Request',
			  "("+meetup_name+')\n\nAre you sure you want to accept this meetup request?',
			  [
			    {text: 'Cancel',  style: 'cancel'},
			  
			  {text: 'Yes', onPress: ()=>{this.acceptRequest(request_key,meetup_key)}},
			    
			  ],
			  { cancelable: false }
			)
	}

	confirmDelete(meetup_name, key){
		Alert.alert(
			  'Decline Request',
			  "("+meetup_name+')\n\nAre you sure you want to decline this meetup request?',
			  [
			    {text: 'Cancel',  style: 'cancel'},
			  {text: 'Yes', onPress: ()=>{this.deleteRequest(key)}},
			    
			  ],
			  { cancelable: false }
			)
	}

	renderRow(item){
		const { navigate } = this.props.navigation;
		var that = this;
		var returnValue = null;
		{that.props.meetups.meetupRequest?
			returnValue = that.props.meetups.meetupRequest.map((record,index)=>{
			var event_date = moment(record.event_date).format('LL')+" ("+record.event_time+")";
			return(
			
				<CardItem key={index} style={{marginTop:5, marginLeft: 5, marginRight: 5}}>
					    <View style={{width: "100%", flexDirection:'column', marginRight:10, marginLeft: 5}}>
					            <Text style={[styles.meetupTitle], {fontSize: 16, color: 'black'}}>{record.event_name}</Text>
						        <Text style={{fontWeight:'bold', fontSize: 16, color: 'black'}}>{record.event_location}</Text>
						        <Text style={{marginBottom:4, fontSize: 14}}>{event_date}</Text>
						        <Text>{record.event_address}</Text>
						        <View style={{flexDirection: 'row', marginTop: 4}}>
						        	<Image 
					        			style={{width: 18, height:18, borderRadius:15, marginRight: 6, marginTop: 2}}
					        			source={{uri: record.requestor_photo}}
					        		/>
						        	<Text>{record.requestor_name}</Text>
						        </View>
						        <View style={{width: "100%",flexDirection:'row', marginBottom:2, marginTop: 5, justifyContent:'center'}}>
							      	<Button 
							      		iconLeft transparent bordered rounded success 
							      		style={{margin:5, paddingLeft:30, paddingRight:45}}
							      		onPress={()=>this.confirmAccept(record.event_name,record.request_key,record.meetup_key)}> 
							      		<MaterialIcons name='check' style={{marginRight:8}} size={20}/>
							      		<Text>Accept</Text>
							      	</Button>
							      	<Button 
							      		iconLeft transparent bordered rounded danger 
							      		style={{margin:5, paddingLeft:30, paddingRight:35}}
							      		onPress={()=>this.confirmDelete(record.event_name,record.request_key)}> 
							      		<MaterialIcons name='close' style={{marginRight:8}} size={20}/>
							      		<Text>Decline</Text>
							      	</Button>
							      	
						      	</View>
					    </View>
				      	
			      	</CardItem>
		)}): returnValue=null}
		return returnValue;
	}

	
	render(){
		return(
			<Container>
				<Header style={[{shadowOpacity: 0,elevation:0, zIndex:10}, styles.header]}>
		          <Left style={{ flex: 1 }}>
		            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
		              <MaterialIcons name='arrow-back' size={25} style={{color:'white'}} />
		            </TouchableOpacity>
		          </Left>
		          <Body style={{ flex: 5,  justifyContent: 'center', alignItems: 'center' }}>
		            <Title>Meetup Requests</Title>
		          </Body>
		          <Right style={{flex:1}}/>
		        </Header>

	      		<Content style={{flex:1,zIndex:2}}>
	      			{this.state.isGettingData ? <Spinner color='#000'/>:null}
	      			<ListView
	      				style={{zIndex:10}}
			      		dataSource={this.state.requestsDataSource}
			      		renderRow={this.renderRow}
			      	/>
	      		</Content>


		</Container>
		)
	}
}

//PROPS
const mapStateToProps = state => ({
  meetups: state.meetups,
  account: state.auth
});
 
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(MeetupRequests);