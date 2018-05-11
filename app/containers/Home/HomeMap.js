import React, { Component } from 'react';
import {View, TouchableHighlight, StyleSheet, Text,Image} from "react-native";
import { NavigationActions } from 'react-navigation';
import {Fab} from 'native-base';
//REDUX
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../../actions'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
//MAPS
import MapView, {Marker, Callout} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import RNGooglePlaces from 'react-native-google-places';
//CONTENT
import mapStyles from '../../styles/styles';

class HomeMap extends Component {
	constructor(props) {
	  super(props);
	  console.disableYellowBox = true;
	  
	  this.state = {
	  	toggleDirection: false,
	  	locationFocus: false
	  }
	}

	componentWillMount(){
		//console.log(this.props);
	}

	gotoMyLocation(){
		var that = this;
		this._map.animateToRegion({
			latitude: that.props.user_location.latitude,
			longitude: that.props.user_location.longitude,	
			longitudeDelta:0.004,
			latitudeDelta:0.004,
		}, 500)

		var newFocus = !that.state.locationFocus;
		that.setState({
			locationFocus:newFocus
		})
	}

	gotoFromLocation(){
		var that = this;
		this._map.animateToRegion({
			latitude: that.props.all_location.search_location_from.latitude,
			longitude: that.props.all_location.search_location_from.longitude,
			longitudeDelta:0.004,
			latitudeDelta:0.004,
		}, 500)
	}

	gotoToLocation(){
		var that = this;
		this._map.animateToRegion({
			latitude: that.props.all_location.search_location_to.latitude,
			longitude: that.props.all_location.search_location_to.longitude,	
			longitudeDelta:0.004,
			latitudeDelta:0.004,
		}, 500)
	}

	toggleDirection(){
		var that = this;

		var newValue = !that.state.toggleDirection;
		that.setState({
			toggleDirection: newValue
		});

		//console.log(this.props.all_location);
	}

	render(){

		if(this.props.all_location.search_location_to.longitude!=0 && this.props.all_location.search_location_from.longitude!=0){
			var fabIcons1 = 
		        <Fab
			        style={{backgroundColor: this.state.locationFocus ? "#1b5454" : "#f2f2f2" ,zIndex:5, marginBottom:195}}
			        position="bottomRight"
			        onPress={()=>this.gotoMyLocation()}
			        >
			            
			        <Icon name="my-location" style={{color:this.state.locationFocus ? "#fff" : "#4f4f4f"}}/>
			    </Fab>
			var fabIcons2 =    
		        <Fab
			        style={{backgroundColor: this.state.toggleDirection ? "#1b5454" : "#f2f2f2" ,zIndex:5, marginBottom:130}}
			        position="bottomRight"
			        onPress={()=>this.toggleDirection()}
			        >
			            
			        <Icon name="directions" style={{ color:this.state.toggleDirection ? "#fff" : "#4f4f4f", fontSize:30}}/>
			    </Fab>
			var fabIcons3 =
			    <Fab
			        style={{backgroundColor:"#f2f2f2",zIndex:5, marginBottom:65}}
			        position="bottomRight"
			        onPress={()=>this.gotoFromLocation()}
			        >
 			       <View style={{alignItems:'center'}}> 
			        	<Feather name="map-pin" style={{ color:"#4f4f4f", fontSize:20}}/>
			    		<Text style={{fontSize:12, textAlign:'center'}}>FROM</Text>
			    	</View>
			    </Fab>
			var fabIcons4 =
			    <Fab
			        style={{backgroundColor:"#f2f2f2",zIndex:5}}
			        position="bottomRight"
			        onPress={()=>this.gotoToLocation()}
			        >
 			        <View style={{alignItems:'center'}}> 
			        	<Feather name="map-pin" style={{ color:"#4f4f4f", fontSize:20}}/>
			    		<Text style={{fontSize:12, textAlign:'center'}}>TO</Text>
			    	</View>
			    </Fab>
		}else{
			var fabIcons1 = null;
			var fabIcons2 = null;
			var fabIcons3 =  null;
			var fabIcons4 =
			    <Fab
			        style={{backgroundColor: this.state.locationFocus ? "#1b5454" : "#f2f2f2" ,zIndex:5}}
			        position="bottomRight"
			        onPress={()=>this.gotoMyLocation()}
			        >
			        <Icon name="my-location" style={{ color:this.state.locationFocus ? "#fff" : "#4f4f4f"}}/>
			    </Fab>
		}
		return(
			<View style={{flex:1}}>
				<MapView
					ref={component => {this._map = component;}}
					style={StyleSheet.absoluteFill}	
					mapType={this.props.settings.mapStyle}
		        	initialRegion={{
			            latitude: this.props.user_location.latitude,
			            longitude: this.props.user_location.longitude,
			            latitudeDelta: this.props.user_location.latitudeDelta,
			            longitudeDelta: this.props.user_location.longitudeDelta,
			          }}>   

			        <MapView.Marker
				    	coordinate={{
				    		latitude: this.props.user_location.latitude,
			            	longitude: this.props.user_location.longitude,
				    	}}
				    >
				    <View>
				    	<Image style={{width: 60, height:60}}source={require('../../img/maplogo.png')}/>
				    </View>	
				    </MapView.Marker>

				    {this.props.all_location.search_location_from.longitude!=0 && this.props.all_location.search_location_from.longitude!=0 ?
				    	<MapView.Marker
					    	coordinate={{
					    		latitude: this.props.all_location.search_location_from.latitude,
				            	longitude: this.props.all_location.search_location_from.longitude,
					    	}}
					    />:null
				    }

				    {this.props.all_location.search_location_to.longitude!=0 && this.props.all_location.search_location_to.longitude!=0 ?
				    	<MapView.Marker
					    	coordinate={{
					    		latitude: this.props.all_location.search_location_to.latitude,
				            	longitude: this.props.all_location.search_location_to.longitude,
					    	}}
					    	pinColor="#1b5454"
					    />:null
				    }

				    {this.state.toggleDirection ?
				    	<MapViewDirections
			              origin={{
			              	//users location
			                latitude: this.props.all_location.search_location_to.latitude,
			                longitude: this.props.all_location.search_location_to.longitude,
			              }}
			              destination={{
			              	//destination search location
			                latitude: this.props.all_location.search_location_from.latitude,
			                longitude: this.props.all_location.search_location_from.longitude,
			              }}
			              apikey={"AIzaSyD2AcRJkV3zokjx3oxmLJHBQOmRelqKPY0"}
			              strokeWidth={6}
			              strokeColor="#1b5454"
			            /> 
			         :null
			     	}
		        </MapView>
		        
		       	{fabIcons1}
		       	{fabIcons2}
		       	{fabIcons3}
		       	{fabIcons4}
			</View>
		);
	}
}

//PROPS
const mapStateToProps = state => ({
  user_location: state.location.user_location,
  all_location: state.location,
  meetups: state.meetups,
  settings: state.settings
});
 
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(HomeMap);