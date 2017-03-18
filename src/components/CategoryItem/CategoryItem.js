import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Divider from 'material-ui/Divider';
import {push} from 'react-router-redux';


import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default class CategoryItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.images = [];
  }

  resizeImage(url, height, width) {
 var filter = 'c_fill,q_60,e_improve,' + 'h_' + height + ',' + 'w_' + width + '/';
    var str = url;
    var index = str.indexOf("upload/") + 7;
    var rest = str.substr(0, index) + filter + str.substr(index);
    return rest;
  }


  viewDetail(data, category, st)
  {
    var placeid = data.props.products._id;
    data.props.dispatch(push('/detail/id:' + placeid + "/category:"+category));
  }

  render() {
    debugger;
      var category = this.props.category;
    var that = this;
    const styles = require('./CategoryItem.scss');
    var state = this.state;
    var product = this.props.products;
    var img = product.image != undefined && product.image[0] ? product.image[0] : product.assets.display;
    return (
      <Row className={styles.categoryItemContainer}>
        <div>
          <Col md={3}>
            <img src={this.resizeImage(img, 250, 250)} onClick={this.viewDetail.bind(this, that, category)}></img>
          </Col>
          <Col md={7}>
            <Row>
              <h2>{product.name}</h2>
              <h3>{product.title}</h3>
              <h5>{product.city},{product.state}</h5>
              <h5>Operator: {product.created_by}</h5>
            </Row>
            <Row>
              <Divider />
            </Row>
             <Row>
               <Col md={6}>
                <div>Includes:</div>
               <span>Internal transits, flight tickets, Stay and Food.</span>
              </Col>
                <Col md={6}>
                <div>Stay:</div>
              <span></span>
              </Col>
              <Divider />
            </Row>
            <Row>
              <Col md={12}>
                <div>SightSeeing:</div>
                {product && product.products && product.products.map(function (x) {
                  return (<VisitIcons menu={x} dispatch={that.props.dispatch}/>);
                })}
              </Col>
            </Row>
          </Col>
          <Col md={2} className={styles.center}>
            <Row>
              <Row>
                <h1>INR{product.price}</h1>
              </Row>
              <Row>
                {product.noofdays} Days & {product.noofnights} Nights
              </Row>
              <RaisedButton label="Book Now" primary={true} className={styles.btnBook}/>
            </Row>
            <Row>
              Rating
            </Row>
          </Col>
        </div>
      </Row>
    );
  }
}

export class VisitIcons extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.product = props.menu;
    if (props.menu == undefined) {
      this.state.product = {};
      this.state.image = [];
      this.state.image[0] = 'empty';
      this.state.name = "";
    }
  }

  handleClick(data, fn, st) {

    var placeid = data.props.menu._id;
    data.props.dispatch(push('/detail/id:' + placeid + "/category:products"));
  }

  resizeImage(url, height, width) {
    var filter = 'h_' + height + ',w_' + width + '/';
    var str = url;
   if(Array.isArray(url))
   {
    str = url[0];
   }
    var index = str.indexOf("upload/") + 7;
    var rest = str.substr(0, index) + filter + str.substr(index);
    return rest;
  }

  render() {
const styles = require('./CategoryItem.scss');
    var product = this.state.product;
    var ty = this;
    var prodimage = product.image != undefined ? product.image : product.scrollimage;
    var imagesrc = this.resizeImage(prodimage, 80, 80)
    return (
      <div className={styles.tooltip}>
      <img src={imagesrc} onClick={this.handleClick.bind(product, ty)} />
            <span className={styles.tooltiptext}>{product.name}</span>
            </div>
    );
  }
}
