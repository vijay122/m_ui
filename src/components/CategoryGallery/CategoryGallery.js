import React, {Component} from 'react';
import Helmet from 'react-helmet';
import * as checkoutActions from '../../redux/modules/checkout';
import DeleteIcon from 'react-material-icons/icons/action/delete';


import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


export default class CategoryGallery extends Component {
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

  printit() {

  }

  clicking() {

  }

  render() {
    var self = this;
    var that = this.props;
    var st =[1,2];
    const galleryitems = this.props.galleryitems;
    return (
      <div>
              {galleryitems && galleryitems.map(function (itm) {
                  return  <CategoryItem item = {itm} />
            })
          }
      </div>
    );
  }
}
export class CategoryItem extends Component {
  render() {
    const styles = require('./CategoryGallery.scss');
    var image = this.props.item.url;
    var name = this.props.item._id;
    return (
      <div className={styles.image}>
      <img src={image} alt="" />
      <h2>{name}</h2>
</div>
    );
  }
}