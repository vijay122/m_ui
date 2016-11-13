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
  View,
  Navigator
} from 'react-native';
import {
  Component
} from 'react';



var SearchPage = require('./App/Containers/SearchPage');

var HomePage = require('./App/Containers/HomePage');

var SearchResults = require('./App/Containers/SearchResults');

var DetailedView = require('./App/Containers/DetailedView');



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
    return (
      <Provider store={ store }>
        <Root />
      </Provider>
    )
  }
}

//
//  <ReactNative.NavigatorIOS
//        style={styles.container}
//        initialRoute={{
//          title: 'Property Finder',
//          component: SearchPage,
//        }}/>


export class MyScene extends Component {
  static get defaultProps() {
    return {
      title: 'MyScene'
    };
  }

  render() {
    return (
      <View>
        <Text>Hi! My name is {this.props.title}.</Text>
      </View>
    )
  }
}

export class HelloWorld extends Component{
  render()
  {
     return React.createElement(ReactNative.Text, {style: styles.text}, "Hello World! again");
  }
}


class YoDawgApp extends Component {
  render() {
  return (
    <Navigator
      initialRoute={{ title: 'My Initial Scene', index: 0 }}
      renderScene={(route, navigator) => {
        return <MyScene title={route.title} />
      }}
    />
  );
}
}


export class Root extends Component {
    render() {
       return (
        <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
          <Text style={{color: 'red', fontWeight: 'bold'}}>请在 index.js 的 renderScene 中配置这个页面的路由</Text>
       <Navigator
        style={{ flex:1 }}
          initialRoute={{ title: 'My Initial Scene', index: 0 , id: 'SearchPage', name: 'Search'}}
          renderScene={this.renderScene.bind(this)}
          configureScene={(route) => {
            if (route.sceneConfig) {
              return route.sceneConfig;
            }
            return Navigator.SceneConfigs.FloatFromRight;
          }} />
          </View>
    );
  }
  renderScene(route, navigator) {
    var routeId = route.id;
    if (routeId === 'SearchPage') {
      return (
        <SearchPage title={route.title}
          navigator={navigator} />
      );
    }
    if (routeId === 'HomePage') {
      return (
        <HomePage title={route.title}
          navigator={navigator} />
      );
    }
    if (routeId === 'SearchResults') {
      return (
        <SearchResults title={route.title}
          navigator={navigator} {...route.passProps}/>
      );
    }
    if (routeId === 'DetailedView') {
      return (
        <DetailedView title={route.title}
          navigator={navigator} {...route.passProps}/>
      );
    }
    return this.noRoute(navigator);
  }
  noRoute(navigator) {
    return (
      <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
        <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
            onPress={() => navigator.pop()}>
          <Text style={{color: 'red', fontWeight: 'bold'}}>请在 index.js 的 renderScene 中配置这个页面的路由</Text>
        </TouchableOpacity>
      </View>
    );
  }
}




AppRegistry.registerComponent('ios_io', () => ios_io);
