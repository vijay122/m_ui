/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';
var React = require('react');
var ReactNative = require('react-native');
import { Provider } from 'react-redux';
//import Routes from './config/routes'
import configureStore from './Redux/Store';
const store = configureStore();

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

export default class ios_io  extends React.Component {
  render () {
    debugger;
    return (
      <Provider store={ store }>
        <Root />
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

export class Root extends Component {
    render() {
       return (
      <ReactNative.NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Property Finder',
          component: SearchPage,
        }}/>
    );
  }
}

AppRegistry.registerComponent('ios_io', () => ios_io);
