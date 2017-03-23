import React from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import areIntlLocalesSupported from 'intl-locales-supported';
import MenuItem from 'material-ui/MenuItem';
import {isProductExistsInCart} from '../../utils/validation';
import Chip from 'material-ui/Chip';

export default class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {type: null};
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect = (event, index, value) => {
    this.setState({type: value})
    this.state.type = value;
  }

    onChange(e) {
    var statename = e.target.attributes["data-ctrlid"].value;
    var newvalue = e.currentTarget.value;
    this.setState({statename: newvalue});
    this.state[e.target.attributes["data-ctrlid"].value] = e.currentTarget.value;
  }

  validateAdd()
  {
    var errorlist=[];
    if(this.state.controlledDate != undefined)
    {

    }
    else
    {
      errorlist.push("Please select your travel dates.");
    }
    return errorlist;
  }
  addToCart(data, fn, st) {
   var st = this.validateAdd();
    if(st.length<=0)
    {
    data.dispatch({type: 'ADD_TO_CART', result: fn});
    }
    else
    {
          data.dispatch({type: 'ERROR', result: st});
    }

  }

  renderPriceDetails(that,detail,cart){

    var cartItems =[];
    var styles = require('./Booking.scss');
        let DateTimeFormat;
        var detail = this.props.detail;
    if (areIntlLocalesSupported(['fr'])) {
      DateTimeFormat = global.Intl.DateTimeFormat;
    } else {
      const IntlPolyfill = require('intl');
      DateTimeFormat = IntlPolyfill.DateTimeFormat;
      require('intl/locale-data/jsonp/fr');
    }
    var dates = new DateTimeFormat('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              }).format;
    if(this.props.cartContext && this.props.cartContext.items)
    {
cartItems = this.props.cartContext.items;
    }
      return (
        <div>
       <Row>
       <h1>INR {detail.price} only</h1>
       <h2>{detail.noofdays} Days and {detail.noofnights} Nights at {detail.city}, {detail.state}</h2>
       {
        detail.category && detail.category.map(function(category)
{
return (<Chip>{category}</Chip>)
})
}
            <h5>I wound love to book this package for you!!</h5>
            <DatePicker
              container="inline"
              floatingLabelText="Choose your travel date"
              hintText="Custom date format"
              firstDayOfWeek={0}
              value={this.state.controlledDate}
               onChange={this._handleChange}
              formatDate={dates}
            />
          </Row>
          </div>
      )
    }



  renderButtons(that,detail,cart){
    var cartItems =[];
    var styles = require('./Booking.scss');
    if(this.props.cartContext && this.props.cartContext.items)
    {
cartItems = this.props.cartContext.items;
    }

    if (!isProductExistsInCart(cartItems,detail)) {
      return (
        <div>
      <label>If you like to add it to your visit list.</label>
      <RaisedButton label="I want to visit" primary={true} onClick={this.addToCart.bind(this, that, detail)} />
        </div>
      );
    } else {
      return (
        <label className={styles.successText}>Item is already added to cart</label>
      );
    }
  }
  _handleChange = (event, date) => {
    this.setState({
      controlledDate: date,
    });
  };


  render() {
    var that = this.props.that;
    var detail = this.props.detail;
    var cart = this.props.cartContext;

    return (
      <Row>
        <Col md={12}>
           { this.renderPriceDetails(that,detail,cart) }
          <Row>
            { this.renderButtons(that,detail,cart) }
          </Row>
          <Row>
            <label>We would love to call you and explain more about the trip (on your convinent phone number).</label>
            <TextField
                          hintText="Phone number"
                          floatingLabelText="Enter the phone number"
                          floatingLabelFixed={true}
                          data-ctrlid="name"
                          type='number'
                          default
                          onChange={this.onChange.bind(this)}
                          value={this.state.name}/>
            <RaisedButton label="Call me back" primary={true} onClick={this.addToCart.bind(this, that, detail)}/>
          </Row>
        </Col>
      </Row>
    );
  }
}
