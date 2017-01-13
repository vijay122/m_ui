import React, {Component} from 'react';
import {OrderSummary, CartOptions, PaymentOptions} from '../../components';
import Helmet from 'react-helmet';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import {isLoaded, load as load} from '../../redux/modules/products';
import {asyncConnect} from 'redux-async-connect';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as productActions from '../../redux/modules/products';

import * as checkoutActions from '../../redux/modules/checkout';

import DeleteIcon from 'react-material-icons/icons/action/delete';

import {TableRow, TableRowColumn} from 'material-ui/Table';

import RaisedButton from 'material-ui/RaisedButton';


function mapStateToProps(state) {
  console.log('state ' + state);
  return {cartcontext: state.cart}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, productActions), dispatch)
}

const events = [
  {
    start: '2015-07-20',
    end: '2015-07-02',
    eventClasses: 'optionalEvent',
    title: 'test event',
    description: 'This is a test description of an event',
  },
  {
    start: '2015-07-19',
    end: '2015-07-25',
    title: 'test event',
    description: 'This is a test description of an event',
    data: 'you can add what ever random data you may want to use later',
  },
];

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    if (!isLoaded(getState())) {
      // return dispatch(viewdetail(getState()));
    }
  }
}])



export class Cart extends Component {
  constructor(props) {
    super(props);
    this.checkout = this.checkout.bind(this);
    this.removeCart = this.removeCart.bind(this);
    this.state={
      cartcontext:{
tripInfo:{
  fromdate:this.getEvents(),
  todate:this.getEvents(),
},
      }
    }
    this.state.cartcontext = this.props.cartcontext;
  }

  removeCart(data, fn, st) {

    data.dispatch({type: 'REMOVE_TO_CART', result: {prd: fn}});
  }

  getEvents()
{
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!

  var yyyy = today.getFullYear();
    if(dd<10){
    dd='0'+dd;
    } 
    if(mm<10){
    mm='0'+mm;
    } 
    var today = dd+'/'+mm+'/'+yyyy;
    return today;
    }

  setDate()
  {
    this.state.cartcontext.tripInfo={
  fromdate:this.getEvents(),
  todate:this.getEvents(),
}
  }

  checkout(data, fn, st) {
    this.setDate();
    var cart =    this.state.cartcontext;
    this.props.dispatch(checkoutActions.validateOrder(cart));
   }

  checkout1() {
    var cart = this.props.cartcontext;
    this.props.dispatch(checkoutActions.submitOrder(cart));
  }

  printit() {

// use default options
//NodePDF.render('http://www.google.com', 'google.pdf', function(err, filePath){
    // handle error and filepath
//});
  }

  clicking() {

  }

  render() {
    var self = this;
    var that = this.props;
    var title = "Shopping Cart";
    const cartItems = this.props.cartcontext.items;
    const styles = require('./Detail.scss');
    // require the logo image both from client and server
    return (
      <div className={styles.home}>
        <Helmet title="Home"/>
        <div className="container">
          <label>Shopping Cart</label>
          <Row>
            <Col md={8}>
              <CartOptions items={cartItems}/>
            </Col>
            <Col md={4}>
              <OrderSummary />
            </Col>
          </Row>
        </div>
        <div>
          <RaisedButton label="validate cart" primary={true} onClick={this.checkout}/>
        </div>
        <div>
        <PaymentOptions />
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);


export class CartProduct extends Component {
  render() {
    return (
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