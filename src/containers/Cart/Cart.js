import React, { Component } from 'react';
import { Link } from 'react-router';
import { CounterButton, GithubButton, OrderSummary,CartOptions , TravelMap} from '../../components';
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
import RaisedButton from 'material-ui/RaisedButton';

import EventCalendar from 'react-event-calendar';



import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

function mapStateToProps(state) {
  console.log('state '+state);
  return { cartcontext: state.cart }
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

// use default options
//NodePDF.render('http://www.google.com', 'google.pdf', function(err, filePath){
    // handle error and filepath
//});
}
clicking()
{

}
  render() {
    var self = this;
    var that = this.props;
    var title ="Shopping Cart";
    const cartItems= this.props.cartcontext.items;
    const styles = require('./Detail.scss');
    debugger;
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
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);


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