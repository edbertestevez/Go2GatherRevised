import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  ToastAndroid
} from 'react-native';
import {Text, Button, Container, Header, Content, Left, Right, Footer, Tabs, Icon, Item, Input, Thumbnail, List, ListItem, Body} from 'native-base';
//REDUX
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../../actions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as firebase from 'firebase';

class SearchMain extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      searchText:'',
      searchRecord: []
    };
   
   this.searchResult = []; 
  }

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <FontAwesome name="search" style={{fontSize: 22, color: tintColor}}/>
    ),
    header: null,
    drawerLockMode: 'locked-closed'
  }

  displaySearch(){
    this.searchResult = [];
    if(this.state.searchText!=""){
      firebase.database().ref("/users").orderByChild("name").startAt(this.state.searchText).endAt(this.state.searchText+ "\uf8ff").on("child_added", (snapshot)=>{
        this.searchResult.push({
            value: snapshot.key,
            name: snapshot.child("name").val(),
            email: snapshot.child("email").val(),
            photo: snapshot.child("photo").val()
        });
        this.setState({searchRecord: this.searchResult});
        console.log(this.searchResult);
      });
    }else{
      ToastAndroid.show("Search field should not be empty", ToastAndroid.SHORT);
    }
  }

  render() {
    return (
      <Container>
      <Header searchBar rounded style={{backgroundColor: "#fff"}}>
          <Item>
            <Icon name="ios-search" />
            <Input placeholderTextColor="#cacaca" placeholder="Search user" onChangeText={(search)=>this.setState({searchText: search})}/>
            <Button style={{backgroundColor: "#1b5454"}} onPress={()=>this.displaySearch()}>
              <Text style={{marginTop: -3}}>Search</Text>
            </Button>
          </Item>
          
          
        </Header>
    	<Content>
    		        <List>
                    {this.state.searchRecord.map((record,index)=>{
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

export default connect(mapStateToProps,mapDispatchToProps)(SearchMain);