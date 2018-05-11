import React, { Component } from 'react';
import {View, Text, TouchableOpacity, ToastAndroid, Image, Dimensions} from "react-native";
import { NavigationActions } from 'react-navigation';
//REDUX
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../../actions'
import { BackHandler, ListView } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Container, Header, Content, Form, Input, Item, Label, Footer, StyleProvider, Left, Right, Button, Body, Title, Card, CardItem} from 'native-base';
import * as firebase from 'firebase';
import styles from '../../styles/styles'

class OtherProfileScreen extends Component {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	key:'',
	  	name:'',
	  	email: "",
	  	phone: '',
	  	photo: '',
	  	sentMeRequest:false,
	  	requestFromMe:false,
	  };
	  
	}
	componentDidMount() {
	    var that = this;
	    BackHandler.addEventListener('hardwareBackPress', function() {
	    that.props.navigation.goBack();return true;
	   });
	  }

	componentWillMount(){
		const {state} = this.props.navigation;
		firebase.database().ref("/friend_requests/"+this.props.account.uid+"/"+state.params.info.key).on("child_added", (snapshot)=>{
			if(snapshot.key=="status"){
				var val = snapshot.val();
				this.setState({sentMeRequest:val})
			}
		});
		firebase.database().ref("/friend_requests/"+state.params.info.key+"/"+this.props.account.uid).on("child_added", (snapshot)=>{
			if(snapshot.key=="status"){
				var val = snapshot.val();
				this.setState({requestFromMe:val})
			}
		});
		console.log("CELL",state.params.info.phone)
		this.setState({
			key: state.params.info.key,
			name:state.params.info.name,
		  	email: state.params.info.email,
		  	photo: state.params.info.photo,
		});

		if(state.params.phone!=undefined){
			this.setState({phone: state.params.info.phone})
		}else{
			this.setState({phone:"Not available"})
		  	
		}
	}

	removeFriend(){
		var that = this;
		firebase.database().ref("/users_friends/"+that.props.account.uid+"/"+that.state.key).remove()
		.then(ToastAndroid.show("Removed as friend", ToastAndroid.SHORT))
	}

	addFriend(){
		var that = this;
		firebase.database().ref("/friend_requests/"+that.state.key+"/"+that.props.account.uid).set({
			status:true
		})
		.then(ToastAndroid.show("Friend request sent", ToastAndroid.SHORT))
	}

	confirmFriend(){
		firebase.database().ref("/friend_requests/"+that.props.account.uid+"/"+that.state.key).remove()
		.then(firebase.database().ref("/users_friends/"+that.props.account.uid+"/"+that.state.key).set({
			status:true
		}))
		.then(ToastAndroid.show('Friend added successfully', ToastAndroid.SHORT))
	}

	declineRequest(){
		var that = this;
		firebase.database().ref("/friend_requests/"+that.props.account.uid+"/"+that.state.key).set({
			status:false
		})
		.then(ToastAndroid.show("Declined friend request", ToastAndroid.SHORT))	
	}

	cancelRequest(){
		var that = this;
		firebase.database().ref("/friend_requests/"+that.state.key+"/"+that.props.account.uid).remove()
		.then(ToastAndroid.show("Cancelled Friend Request", ToastAndroid.SHORT))
	}


	render(){
		return(
			<Container>
				<Header style={{backgroundColor:'#4d5563',shadowOpacity: 0,elevation:0}}>
		          <Left style={{ flex: 1 }}>
		            <Button style={{backgroundColor: 'transparent'}}  onPress={()=>this.props.navigation.goBack()}>
		              <Icon name='arrow-back' size={24} style={{color:'white'}} />
		            </Button>
		          </Left>
		          <Body style={{ flex: 5,  justifyContent: 'center', alignItems: 'center' }}>
		            <Title>User Information</Title>
		          </Body>
		          <Right style={{ flex: 1 }}>
		          	
		          </Right>
		        </Header>

				<Content style={{}}>
					<View style={{alignItems:'center', justifyContent:"center", backgroundColor:'#4d5563'}}>
						{/*<Image source={{uri: this.state.photo}} style={styles.profileImage}/>*/}
						<Image source={{uri:this.state.photo}} style={styles.profileImage}/>
						<Text style={styles.user_name}>{this.state.name}</Text>
						
						{this.props.friends.friendsLabel.findIndex((record)=>record.value==this.state.key) > -1 ?
						<View>
							<Button 
								iconLeft danger rounded 
								style={[styles.roundButtonNoIcon,{marginBottom: 20}]}
								onPress={()=>this.removeFriend()}>
								<Text style={styles.buttonWhiteText}>Remove as Friend</Text>
							</Button>
						</View>
						:
						this.state.sentMeRequest ?
						<View style={{flexDirection:"row", marginBottom:15}}>
							<Button 
								style={styles.selectRoundButton} 
								rounded success
								onPress={()=>this.confirmFriend()}
							>
								<Text style={styles.buttonWhiteText}>Confirm</Text>
							</Button>
							<Button 
								style={styles.selectRoundButton} 
								rounded bordered light
								onPress={()=>this.declineRequest()}
							>
								<Text style={styles.buttonWhiteText}>Decline</Text>
							</Button>
						</View>
						:
						this.state.requestFromMe ?
						<View style={{flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
							<View>
							<Button iconLeft info transparent rounded style={styles.roundButtonNoBottomProfile}>
								<Icon name="check-circle" size={20} style={{color:"white", marginRight:10}}/>
								<Text style={styles.buttonWhiteText}>Friend Request Sent</Text>
							</Button>
							</View>
							<View>
							<Button 
								iconLeft info rounded 
								style={styles.roundButtonNoIcon}
								onPress={()=>this.cancelRequest()}
							>
								<Text style={styles.buttonWhiteText}>Cancel Request</Text>
							</Button>
							</View>
						</View>
						:
						<View>
							<Button 
								iconLeft info rounded 
								style={styles.roundButton}
								onPress={()=>this.addFriend()}
							>
								<Icon name="person-add" size={20} style={{color:"white", marginRight:10}}/>
								<Text style={styles.buttonWhiteText}>Add Friend</Text>
							</Button>
						</View>
						
						}

						{/*<View>
							<Button iconLeft info rounded style={styles.roundButton}>
								<Icon name="person-add" size={20} style={{color:"white", marginRight:10}}/>
								<Text style={styles.buttonWhiteText}>Add Friend</Text>
							</Button>
						</View>*/}

						{/*<View style={{flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
							<View>
							<Button iconLeft info transparent rounded style={styles.roundButtonNoBottomProfile}>
								<Icon name="check-circle" size={20} style={{color:"white", marginRight:10}}/>
								<Text style={styles.buttonWhiteText}>Friend Request Sent</Text>
							</Button>
							</View>
							<View>
							<Button iconLeft info rounded style={styles.roundButtonNoIcon}>
								<Text style={styles.buttonWhiteText}>Cancel Request</Text>
							</Button>
							</View>
						</View>*/}

			            
					</View>
					<Form style={{marginLeft: 10, marginRight: 30, marginTop:15}}>
		            	<Item stackedLabel>
		              	<Label>Name:</Label>
		              	<Input editable = {false} selectTextOnFocus={true} onChangeText={(name)=>this.setState({name})}>{this.state.name}</Input>
		            	</Item>

		            	<Item stackedLabel>
		              	<Label>E-mail:</Label>
		              	<Input editable = {false} selectTextOnFocus={true} onChangeText={(email)=>this.setState({email})}>{this.state.email}</Input>
		            	</Item>

		            	<Item stackedLabel>
		              	<Label>Phone:</Label>
		              	<Input editable = {false} selectTextOnFocus={true} onChangeText={(phone)=>this.setState({phone})}>{this.state.phone}</Input>
		            	</Item>

		            </Form>
		            
				</Content>

			</Container>			

		)
	}
}

//PROPS
const mapStateToProps = state => ({
  account: state.auth,
  friends: state.friends
});
 
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(OtherProfileScreen);