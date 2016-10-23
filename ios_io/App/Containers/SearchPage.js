'use strict';
 
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicator,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as productActions from '../../Redux/Reducers/globalReducers/products';
var SearchResults = require('./SearchResults');

//export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);

var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  flowRight: {
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'stretch'
},
buttonText: {
  fontSize: 18,
  color: 'white',
  alignSelf: 'center'
},
button: {
  height: 36,
  flex: 1,
  flexDirection: 'row',
  backgroundColor: '#48BBEC',
  borderColor: '#48BBEC',
  borderWidth: 1,
  borderRadius: 8,
  marginBottom: 10,
  alignSelf: 'stretch',
  justifyContent: 'center'
},
searchInput: {
  height: 36,
  padding: 4,
  marginRight: 5,
  flex: 4,
  fontSize: 18,
  borderWidth: 1,
  borderColor: '#48BBEC',
  borderRadius: 8,
  color: '#48BBEC'
}
});


export default class  SearchPage extends Component {
	constructor(props) {
  super(props);
    this.onSearchPressed = this.onSearchPressed.bind(this);
     this.onMessage = this.onMessage.bind(this);
      this.onNavigate = this.onNavigate.bind(this);
  this.state = {
    searchString: 'london',
      isLoading: false
  };
}

_executeQuery(query) {
  console.log(query);
  this.setState({ isLoading: true });
}
 
onSearchPressed() {
  debugger;
  var search ={};
  search.sectionName="search";
  search.searchby ="Place";
  search.searchvalue ="courtrallam";
  this.props.search(search);
  this.setState({isLoading:true});

 
 // var query = urlForQueryAndPage('place_name', this.state.searchString, 1);
 // this._executeQuery(query);
/*
 this.props.navigator.push({
  title: 'Results',
  component: SearchResults,
  passProps: {listings: response.listings}
});
*/
}
onNavigate()
{
  var results = this.props.searchResult.places;
this.props.navigator.push({
  title: 'Results',
  component: SearchResults,
  passProps: {listings: results}
});
}
 onMessage()
  {
      console.log("location clicked");
    this.state ={
      isLoading : true
    };
  }
onSearchTextChanged(event) {
  console.log('onSearchTextChanged');
  this.setState({ searchString: event.nativeEvent.text });
  console.log(this.state.searchString);
}
  render() {
  	var spinner = this.state.isLoading ?
  ( <ActivityIndicator
      size='large'/> ) :
  ( <View/>);
    return (
    	 <View style={styles.container}>
        <Text style={styles.description}>
          Search for houses to buy!
        </Text>
        <Text style={styles.description}>
          Search by place-name, postcode or search near your location.
        </Text>
         <View style={styles.flowRight}>
  <TextInput
    style={styles.searchInput}
    value={this.state.searchString}
    placeholder='Search via name or postcode'/>
  <TouchableHighlight style={styles.button}
      underlayColor='#99d9f4'>
    <Text style={styles.buttonText} onPress={ () => this.onSearchPressed() }>Go</Text>
  </TouchableHighlight>
</View>
<TouchableHighlight style={styles.button}
    underlayColor='#99d9f4'>
  <Text style={styles.buttonText} onPress={ () => this.onMessage() }>Location</Text>
</TouchableHighlight>
{spinner}
<TouchableHighlight style={styles.button}
    underlayColor='#99d9f4'>
<Text style={styles.buttonText} onPress={ () => this.onNavigate()}>View Results</Text>
</TouchableHighlight>

      </View>
   
    );
  }
}

function mapStateToProps(state) {
  console.log('state '+state);
var obj ={};
if(state!= undefined && state.products!= undefined && state.products.products!= undefined)
{
  obj = state.products.products;
}
return { searchResult: obj }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, productActions), dispatch)
}

//export  connect(mapStateToProps, mapDispatchToProps)(SearchPage);
module.exports = connect(mapStateToProps, mapDispatchToProps)(SearchPage);