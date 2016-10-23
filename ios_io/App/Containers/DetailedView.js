'use strict';
 
import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  Text
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    marginTop: 65
  },
  heading: {
    backgroundColor: '#F8F8F8',
  },
  separator: {
    height: 1,
    backgroundColor: '#DDDDDD'
  },
  image: {
    width: 400,
    height: 300
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 5,
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    margin: 5,
    color: '#656565'
  },
  description: {
    fontSize: 18,
    margin: 5,
    color: '#656565'
  }
});

class DetailedView extends Component {
 
  render() {
    var product = this.props.product;
   
  var image = product.image[0].replace(/^http:\/\//i, 'https://');
    var price = product.price_formatted!= undefined ? product.price_formatted.split(' ')[0]:product.city;
 
    return (
      <View style={styles.container}>
        <Image style={styles.image}
            source={{uri: image}} />
        <View style={styles.heading}>
          <Text style={styles.price}>{price}</Text>
          <Text style={styles.title}>{product.name}</Text>
          <View style={styles.separator}/>
        </View>
        <Text style={styles.description}>{product.title}</Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>
    );
  }
}

module.exports = DetailedView;
