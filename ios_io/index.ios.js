/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';
var React = require('react');
var ReactNative = require('react-native');
import { Provider } from 'react-redux'

import {
  AppRegistry,
  Text,
  View
} from 'react-native';
import {
  Component
} from 'react';
var SearchPage = require('./App/Containers/SearchPage');

//var  createStore  = require('../../src/redux/create');

console.log(createMiddleware);

var styles = ReactNative.StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  },
  container: {
    flex: 1
  }
});

  const mockStore = {
    info: {
      load: () => {},
      loaded: true,
      loading: false,
      data: {
        message: 'This came from the api server',
        time: Date.now()
      }
    }
  };
//import { createStore } from 'redux'
//import combineReducers from '../src/redux/modules/reducer';
//const store = createStore(RootReducer)

 //import createStore from '../src/redux/create';

//import * as configs from '../src/redux/actionCreators';
//const store = createStore({}, {}, mockStore);
// creates our Redux store (elsewhere)
//const store = configureStore();

export default class Root extends React.Component {
  render () {
    return (
      <Provider store={ store }>
        <ios_io />
      </Provider>
    )
  }
}

export class HelloWorld extends Component{
  render()
  {
     return React.createElement(ReactNative.Text, {style: styles.text}, "Hello World! again");
  }
}

export  class ios_io extends Component {
    render() {
       return (
      <ReactNative.NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Property Finder',
          component: SearchPage,
        }}/>
    );
  // return React.createElement(ReactNative.Text, {style: styles.text}, "Hello World! again");
  }
}

AppRegistry.registerComponent('Root', () => Root);
