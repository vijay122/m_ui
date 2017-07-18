import React, {Component} from 'react';
import Helmet from 'react-helmet';
import * as checkoutActions from '../../redux/modules/checkout';
import DeleteIcon from 'react-material-icons/icons/action/delete';


import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


export default class CartGrid extends Component {
  constructor(props) {
    super(props);
    this.checkout = this.checkout.bind(this);
    this.removeCart = this.removeCart.bind(this);
  }

  removeCart(data, fn, st) {

    data.dispatch({type: 'REMOVE_TO_CART', result: {prd: fn}});
  }

  checkout() {
    var cart = this.props.cartcontext;
    this.props.dispatch(checkoutActions.submitOrder(cart));
  }

  render() {
    var self = this;
    var that = this.props;
    var mon = this.props.validationresponse && this.props.validationresponse.mon!= undefined?this.props.validationresponse.mon:"";
    var title = "MON:"+ mon ;
    const cartItems = this.props.items;
    const styles = require('./CartGrid.scss');
    return (
      <div className={styles.home}>
        <Helmet title="Home"/>
        <div className="">
          <label>htr</label>
          <Table className={styles.tableClass}>
    <TableHeader>
      <TableRow>
        <TableHeaderColumn>View</TableHeaderColumn>
        <TableHeaderColumn>Name</TableHeaderColumn>
        <TableHeaderColumn>City</TableHeaderColumn>
           <TableHeaderColumn>State</TableHeaderColumn>
        <TableHeaderColumn>Type</TableHeaderColumn>
        <TableHeaderColumn style={{width:'80px'}}>Remove</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody>
{cartItems && cartItems.map(function (place) {
                if (place._id != undefined) {
                  return <CartProduct place={place} removeItem={self.removeCart}/>
                }
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
    const styles = require('./CartGrid.scss');
    var image = this.props.place.image[0];
    return (
      <TableRow>
        <TableRowColumn> <img className={styles.thumbnail} src={image}/></TableRowColumn>
        <TableRowColumn>{this.props.place.name}</TableRowColumn>
        <TableRowColumn>{this.props.place.city}</TableRowColumn>
             <TableRowColumn>{this.props.place.state}</TableRowColumn>
          <TableRowColumn>{this.props.place.type}</TableRowColumn>
         <TableRowColumn style={{width:'80px',    textAlign: 'right'}}><DeleteIcon/></TableRowColumn>
      </TableRow>
    );
  }
}