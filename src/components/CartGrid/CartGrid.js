import React, { Component } from 'react';
import { Link } from 'react-router';
import { CounterButton, GithubButton, OrderSummary,Calendar , TravelMap} from '../../components';
import config from '../../config';
import Helmet from 'react-helmet';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Grid from 'react-bootstrap/lib/Grid';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import CarouselItem from 'react-bootstrap/lib/CarouselItem';
import Carousel from 'react-bootstrap/lib/Carousel';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem from 'react-bootstrap/lib/NavItem';
import Nav from 'react-bootstrap/lib/Nav';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import Thumbnail from 'react-bootstrap/lib/Thumbnail';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import {isLoaded, load as load, viewdetail} from '../../redux/modules/products';
import { asyncConnect } from 'redux-async-connect';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as productActions from '../../redux/modules/products';

import * as checkoutActions from '../../redux/modules/checkout';

import IconButton from 'material-ui/IconButton';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import DeleteIcon from 'react-material-icons/icons/action/delete';




import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


export default class CartGrid extends Component {
  constructor(props) {
    super(props);
    this.checkout = this.checkout.bind(this);
    this.removeCart = this.removeCart.bind(this);
  }
  removeCart(data,fn,st)
  {

    data.dispatch({type:'REMOVE_TO_CART', result:{prd:fn}});
    }
  checkout()
  {
    var cart =this.props.cartcontext;
    debugger;
    this.props.dispatch(checkoutActions.submitOrder(cart));
  }
  printit()
  {

  }
  clicking()
  {

  }
  render() {
    var self = this;
    var that = this.props;
    var title ="Shopping Cart";
    const cartItems= this.props.items;
    const styles = require('./CartGrid.scss');
    debugger;
    return (
      <div className={styles.home}>
        <Helmet title="Home"/>
        <div className="">
          <label>htr</label>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHeaderColumn>Item#</TableHeaderColumn>
                    <TableHeaderColumn>Product Name</TableHeaderColumn>
                    <TableHeaderColumn>Price</TableHeaderColumn>
                    <TableHeaderColumn>Quantity</TableHeaderColumn>
                    <TableHeaderColumn>Total</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cartItems && cartItems.map(function (place)
                  {
                    return <CartProduct place={place} removeItem={self.removeCart}/>
                  })
                  }
                </TableBody>
              </Table>
        </div>
      </div>
    );
  }
}
export class CartProduct extends Component {
  render() {
    return(
      <TableRow>
        <TableRowColumn>
          <DeleteIcon/>
        </TableRowColumn>
        <TableRowColumn>{this.props.place.name}</TableRowColumn>
        <TableRowColumn>{this.props.place.city}</TableRowColumn>
        <TableRowColumn>{this.props.place._id}</TableRowColumn>
        <TableRowColumn>0</TableRowColumn>
      </TableRow>
    );
  }
}