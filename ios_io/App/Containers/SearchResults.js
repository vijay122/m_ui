'use strict';
 
import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ListView,
  Text
} from 'react-native';

var DetailedView = require('./DetailedView');

var styles = StyleSheet.create({
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  }
});

class SearchResults extends Component {
 
  constructor(props) {
    super(props);
    debugger;

    var dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1._id !== r2._id});
    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.listings)
    };
  }
  rowPressed(listerURL) {
  var product = this.props.listings.filter(prop => prop._id=== listerURL)[0];
 
  this.props.navigator.push({
     id: 'DetailedView',
      name: 'Details',
    passProps: {
      product: product
    },
    title: "Property",
  });
}
 
  renderRow(rowData, sectionID, rowID) {
  var price = rowData.price_formatted!= undefined?rowData.price_formatted.split(' ')[0]: rowData.city;
 var image = rowData.image[0].replace(/^http:\/\//i, 'https://');
 //var image ='"'+rowData.image[0]+'"';
 //console.log(image);
  return (
    <TouchableHighlight onPress={() => this.rowPressed(rowData._id)}
        underlayColor='#dddddd'>
      <View>
        <View style={styles.rowContainer}>
          <Image style={styles.thumb} source={{ uri: image }} />
          <View  style={styles.textContainer}>
            <Text style={styles.price}>{price}</Text>
            <Text style={styles.title}
                  numberOfLines={1}>{rowData.name}</Text>
          </View>
        </View>
        <View style={styles.separator}/>
      </View>
    </TouchableHighlight>
  );
}
 
  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}/>
    );
  }
 
}
module.exports = SearchResults;