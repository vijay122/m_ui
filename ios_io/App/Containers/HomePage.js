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
var ScrollableTabView = require('react-native-scrollable-tab-view');
import * as productActions from '../../Redux/Reducers/globalReducers/products';

var styles = StyleSheet.create({
  layout: {
  }
});

export default class  HomePage extends Component {
  render() {
    return (
      <ScrollableTabView style={styles.layout}>
        <ReactPage tabLabel="React" />
        <FlowPage tabLabel="Flow" />
        <JestPage tabLabel="Jest" />
      </ScrollableTabView>
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

export class  ReactPage extends Component {
  render() {
    return (
     <View>
       <TouchableHighlight
         underlayColor='#99d9f4'>
         <Text>React</Text>
       </TouchableHighlight>
     </View>
    );
  }
}

export class  FlowPage extends Component {
  render() {
    return (
      <View>
        <TouchableHighlight
          underlayColor='#99d9f4'>
          <Text>FlowPage</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export class  JestPage extends Component {
  render() {
    return (
      <View>
        <TouchableHighlight
          underlayColor='#99d9f4'>
          <Text>JestPage</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
module.exports = connect(mapStateToProps, mapDispatchToProps)(HomePage);