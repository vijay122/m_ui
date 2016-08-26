import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import * as productActions from 'redux/modules/products';
import {isLoaded, load as loadproducts} from 'redux/modules/products';
import {initializeWithKey} from 'redux-form';
import { asyncConnect } from 'redux-async-connect';

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    if (!isLoaded(getState())) {
      return dispatch(loadproducts());
    }
  }
}])
@connect(
  state => ({
    widgets: state.widgets.data,
    editing: state.widgets.editing,
    error: state.widgets.error,
    loading: state.widgets.loading
  }),
  {...productActions, initializeWithKey })
export default class ProductsHeader extends Component {
  static propTypes = {
    widgets: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool,
    initializeWithKey: PropTypes.func.isRequired,
    editing: PropTypes.object.isRequired,
    load: PropTypes.func.isRequired,
    editStart: PropTypes.func.isRequired
  };

  render() {
    return(
      <div>
    <div className="header">
    <div className="top-header">
      <div className="container">
        <div className="header-left">
          <p>Take and Extra 20% OFF with order upto $99</p>
        </div>
        <div className="login-section">
          <ul>
            <li><a href="login.html">Login</a>  </li> |
            <li><a href="register.html">Register</a> </li>
          </ul>
        </div>
            <div className="search-box">
              <div id="sb-search" className="sb-search">
              <form>
                <input className="sb-search-input" placeholder="Enter your search term..." type="search" name="search" id="search" />
                <input className="sb-search-submit" type="submit" value="" />
                <span className="sb-icon-search"> </span>
              </form>
            </div>
            </div>
          <script src="js/classie.js"></script>
          <script src="js/uisearch.js"></script>
            <script>
              new UISearch( document.getElementById( 'sb-search' ) );
            </script>
        <div className="clearfix"></div>
      </div>
    </div>
    <div className="bottom-header">
      <div className="container">
        <div className="logo">
          <a href="index.html"><h1>sporty</h1></a>
        </div>
        <div className="header_bottom_right">
          <div className="h_menu4">
          <a className="toggleMenu" href="">Menu</a>
          <ul className="nav">
            <li className="active"><a href="index.html">HOME</a></li>
            <li><a href="products.html" className="root">FOOTBALL</a>
              <ul>
                <li><a href="products.html">Accessories</a></li>
                <li><a href="products.html">Footwear</a></li>
                <li><a href="products.html">t-shirts</a></li>
                <li><a href="products.html">sporty dresses</a></li>
                <li><a href="products.html">balls</a></li>
                <li><a href="products.html">sales</a></li>
              </ul>
            </li>
            <li><a href="bikes.html">BIKES</a>
              <ul>
                <li><a href="bikes.html">Accessories</a></li>
                <li><a href="bikes.html">helmets</a></li>
                <li><a href="bikes.html">Footwear</a></li>
                <li><a href="bikes.html">spets</a></li>
                <li><a href="bikes.html">arms</a></li>
                <li><a href="bikes.html">sales</a></li>
              </ul>
            </li>
            <li><a href="products.html">GOLF</a>
              <ul>
                <li><a href="products.html">Accessories</a></li>
                <li><a href="products.html">Footwear</a></li>
                <li><a href="products.html">Apparel</a></li>
              </ul>
            </li>
              <li><a href="contact.html">CONTACT</a></li>
            </ul>
            <script type="text/javascript" src="js/nav.js"></script>
        </div>
          <div className="clearfix"></div>
        </div>
      </div>
    </div>
  </div>
   </div>);
   
  }
}