import React, { Component } from 'react';
import {View, Text, TouchableOpacity, ToastAndroid, Image, Dimensions, Alert} from "react-native";
import { NavigationActions } from 'react-navigation';
//REDUX
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../actions'
import { BackHandler, FlatList } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ResponsiveImage from 'react-native-responsive-image';
import {Container, Header, Content, Form, Input, Item, Label, Spinner, Footer, Radio, StyleProvider, ListItem, Left, Right, Button, Body, Title, Card, CardItem, Fab} from 'native-base';
import * as firebase from 'firebase';
import moment from 'moment';
import * as constants from '../constants'

import styles from '../styles/styles'

class Settings extends Component {

	constructor(props) {
	  super(props);
	 	this.state = {
	    };   
	}

	componentDidMount() {	
	    var that = this;
		    BackHandler.addEventListener('hardwareBackPress', function() {
		    that.props.navigation.goBack();return true;
		});
	}

	changeMapStyle(data){
		this.props.actions.updateMapStyle(data);
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
		            <Title>Settings</Title>
		          </Body>
		          <Right style={{flex:1}}/>
		        </Header>
		        <Content>
		        	<Label style={{fontWeight:'bold', marginHorizontal: 10, marginVertical: 8}}>MAP STYLE</Label>
		        	<ListItem onPress={()=>this.changeMapStyle("standard")}>
			            <Left>
			            <Label>Standard</Label>
			            </Left>
			            <Right>
			              <Radio onPress={()=>this.changeMapStyle("standard")} selected={this.props.settings.mapStyle=="standard"} />
			            </Right>
			        </ListItem>
			        <ListItem onPress={()=>this.changeMapStyle("satellite")}>
			        	<Left>
			            <Label>Satellite</Label>
			            </Left>
			            <Right>
			              <Radio onPress={()=>this.changeMapStyle("satellite")} selected={this.props.settings.mapStyle=="satellite"} />
			            </Right>
			        </ListItem>
			        <ListItem onPress={()=>this.changeMapStyle("hybrid")}>
			            <Left>
			            <Label>Hybrid</Label>
			            </Left>
			            <Right>
			              <Radio  onPress={()=>this.changeMapStyle("hybrid")} selected={this.props.settings.mapStyle=="hybrid"} />
			            </Right>
			        </ListItem>
			        <Button danger block rounded style={{marginVertical: 40, marginHorizontal: 10}} onPress={()=>this.props.actions.func_googleSignout()}><Text style={{color: "#fff", fontSize: 18, fontWeight:"bold"}}>Logout</Text></Button>
		        </Content>
			</Container>
		)
	}
}

//PROPS
const mapStateToProps = state => ({
	 settings: state.settings
});
 
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(Settings);