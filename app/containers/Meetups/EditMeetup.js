import React, { Component } from 'react';
import {View, Text, TouchableOpacity, ToastAndroid, Alert} from "react-native";
import { NavigationActions } from 'react-navigation';
//REDUX
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../../actions'
import { BackHandler, ListView } from "react-native";
//FIREBASE
import firebaseApp from '../../config/firebase';
import * as firebase from 'firebase';
import ResponsiveImage from 'react-native-responsive-image';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Container, Header, Content, Form, Input, Spinner, Item, Label, Footer, StyleProvider, Left, Right, Button, Body, Title, Card, CardItem} from 'native-base';
import DatePicker from 'react-native-datepicker';
import Moment from 'react-moment';
import styles from '../../styles/styles'
import DateTimePicker from 'react-native-modal-datetime-picker';
import * as constants from '../../constants'
import RNGooglePlaces from 'react-native-google-places';

class EditMeetup extends Component {

	/*NO REDUX FOR NOW*/
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	key:"",
	  	isCreating: false,
	  	event_name:"",
	  	event_date:"",
	  	event_time:"",
	  	latitude:0,
	  	longitude:0,
	  	event_location:"",
	  	event_address:"",
	  };
	  
	}

	componentDidMount() {	
	    var that = this;
		    BackHandler.addEventListener('hardwareBackPress', function() {
		    that.props.navigation.goBack();
		    return true;
		});
	}

	componentWillMount(){
		const {state} = this.props.navigation;
		console.log(state.params.info)
		this.setState({
			key: state.params.info.key,
			creator: state.params.info.creator,
			event_name: state.params.info.event_name,
		  	event_date:state.params.info.event_date,
		  	event_time:state.params.info.event_time,
		  	latitude:state.params.info.latitude,
		  	longitude:state.params.info.longitude,
		  	event_location:state.params.info.event_location,
		  	event_address:state.params.info.event_address,
		})
	}

	saveChanges(){
		var that = this;
		that.setState({ isCreating:true})
		firebase.database().ref("/meetups/"+that.state.key+"/data").set({
			creator: that.state.creator,
			event_name:that.state.event_name,
		  	event_date:that.state.event_date,
		  	event_time:that.state.event_time,
		  	latitude:that.state.latitude,
		  	longitude:that.state.longitude,
		  	event_location:that.state.event_location,
		  	event_address:that.state.event_address,
		})
		.then(
			setTimeout(()=>{
	        	ToastAndroid.show(constants.UPDATE_MEETUP_SUCCESS, ToastAndroid.SHORT),
		    	that.setState({isCreating:false}),
		    	// that.props.navigation.goBack()
		    	that.props.navigation.navigate("Main")
		    }, 1000)
		)
	}

	confirmChanges(){
		var that = this;
		if(
			that.state.event_name == "" ||
    		that.state.event_data == "" ||
    		that.state.event_time == "" ||
    		that.state.event_address == "" ||
    		that.state.event_place == "" ||
    		that.state.longitude == 0 ||
    		that.state.latitude == 0 
		){
			ToastAndroid.show(constants.INCOMPLETE_FORM, ToastAndroid.SHORT);
		}else{
			Alert.alert(
			"Save Changes",
			"Are you sure you want to update this record?",
			[
				{text: 'Cancel',  style: 'cancel'},
			  	{text: 'Ok', onPress: () => this.saveChanges()},
			    
			],
			{ cancelable: false }
			)
		}
	}

	updateLocation(initialPosition){
		RNGooglePlaces.openAutocompleteModal({
	      latitude: initialPosition.latitude,
	      longitude: initialPosition.longitude,
	      radius: 50
	    })
	      .then((place) => {
	      	console.log(place)
	        this.setState({
	        	event_location: place.name,
	        	longitude: place.longitude,
	        	latitude: place.latitude
	        })
	        //alert(JSON.stringify(place))
	        
	      console.log(place);
	      })
	      .catch(error => {
	        alert("Location not available");
	        console.log(error.message);
	      })
	}

    
	render(){
		return(
			<Container>
			<Header style={{backgroundColor:"#114949"}}>
					 <Left style={{flexDirection:'row', flex:1}}>
					 	<TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
					 	 	<MaterialIcons name="arrow-back" style={{color:"white",marginRight:5, fontSize:25}}/>
						</TouchableOpacity>
						<Text style={{marginLeft:10, color:"white", fontSize:18, fontWeight:'bold'}}>Edit Meetup</Text>
					 	
					 </Left>

					 <Right style={{flexDirection:"row",flex:1 }}>
						 <MaterialCommunityIcons name="tooltip-edit" style={{color:"white",marginRight:5, fontSize:25}}/>
					 </Right>
				</Header>
				<Content padder style={{flex:1}}>
					<Form>
		            	<Item style={{width:'90%',height:50}}>
			              	<Left style={styles.formCustIcon}>
			              	<MaterialCommunityIcons name="nature-people" style={{position:'absolute',left:0}} size={25}/>
			              	</Left>
			              	<Input style={{textAlign:'center',position:'absolute',width:'100%',fontSize:16}} selectTextOnFocus={true} placeholder="Event Name" 
			              		onChangeText={(event_name)=>this.setState({event_name})}>{this.state.event_name}
			              	</Input>
		            	</Item>

		            	<DatePicker
					        style={{flex:1,width: '90%', height: 45, marginTop:20, borderBottomWidth:1,borderBottomColor:"#cacaca",marginLeft:15,
					            }}
					        date={this.state.event_date}
					        mode="date"
					        placeholder="Select Date"
					        format="YYYY-MM-DD"
					        maxDate="2018-06-01"
					        confirmBtnText="Confirm"
					        cancelBtnText="Cancel"
					        customStyles={{
					          dateIcon: {
					            position: 'absolute',
					            left: 0,
					            top: 4,
					            marginLeft: 0,
					            width:28,
								height:28
					            
					          },
					          dateInput: {
					            borderWidth:0,
					          },
					          placeholderText: {
			                      fontSize: 16,
			                      color: '#7f7f7f',
			                  },
			                  dateText:{
			                  	justifyContent: 'flex-start',
			                  }
					          // ... You can check the source to find the other keys.
					        }}
					        onDateChange={(event_date) => this.setState({event_date})}
					      />

		            	<DatePicker
					        style={{flex:1,width: '90%',height: 45, marginTop:20,  borderBottomWidth:1,borderBottomColor:"#cacaca",marginLeft:15,
					            }}
					        date={this.state.event_time}
					        mode="time"
					        placeholder="Select Time"
					        format="h:mm A"
					        confirmBtnText="Confirm"
					        cancelBtnText="Cancel"
					        is24Hour={false}
					        customStyles={{
					          dateIcon: {
					            position: 'absolute',
					            left: 0,
					            top: 4,
					            marginLeft: 0,
					            width:28,
								height:28					            
					          },
					          dateInput: {
					            borderWidth:0,
					          },
					          placeholderText: {
			                      fontSize: 16,
			                      color: '#7f7f7f',
			                  },
			                  dateText:{
			                  	justifyContent: 'flex-start',
			                  }
					          // ... You can check the source to find the other keys.
					        }}
					        onDateChange={(event_time) => this.setState({event_time})}
					      />
		          

					    <Item style={{width:'90%',height: 45, marginTop:12}}>
			              	<Left style={styles.formCustIcon}>
			              	<MaterialCommunityIcons name="account-location" style={{position:'absolute',left:0}} size={25}/>
			              	</Left>
			              	<TouchableOpacity 
			            	onPress={()=>this.updateLocation(this.props.location.user_location)}
			            	style={{width:'100%',height:60, borderBottomWidth:1, borderBottomColor:'#cacaca',marginLeft:0,justifyContent:'center',alignItems:'center'}}>
				           		
				           		<Text style={{fontSize:16, color:"#1b5454", fontWeight:"bold"}}>{this.state.event_location}</Text>
			            	</TouchableOpacity>
		            	</Item>

				        {this.state.isCreating ? 
				        	<Button 
					    		full iconLeft rounded success 
					    		style={{marginTop: 7, height:55,marginBottom:15,marginLeft:15, marginRight:25}} 
						    >
					        	<Spinner color='#fff' style={{color:"white", marginRight:20}}/>
					        	<Text style={{color:'white', fontSize:15}}>Saving Changes</Text>
					        </Button>
				        	:
				        	<Button 
					    		full rounded success 
					    		style={{marginTop: 7, height:55,marginBottom:15,marginLeft:15, marginTop:20,marginRight:25}} 
					    		onPress={()=>this.confirmChanges()}
						    >
					        	<Text style={{color:'white', fontSize:15}}>Save Changes</Text>
					        </Button>
				        }
		          	</Form>	
				</Content>

			</Container>				

		)
	}
}

//PROPS
const mapStateToProps = state => ({
  state: state,
  location: state.location
});
 
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(EditMeetup);