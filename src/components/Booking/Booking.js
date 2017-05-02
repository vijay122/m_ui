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

    this.state = {type: null,phoneerror:""};
        if(this.props.checkout)
    {
      this.state.controlledDate = this.props.checkout.startdate;
    }
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

  validatePhonenumber(ip)
  {
    var pattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
return pattern.test(ip);
  }

  callBack()
  {
    var callbackinfo={};
    callbackinfo.number = this.state.callbacknumber;
    callbackinfo.session = "xyz";
    callbackinfo.interests =["PACKAGEs"];
    callbackinfo.currentItemName =this.props.detail.name;
     callbackinfo.currentItemId =this.props.detail._id;
    if(this.validatePhonenumber(this.state.callbacknumber))
    {
    this.setState({phoneerror:"",message:"callback to your number registered. Our experts will contact you within an hour"});
    }
    else
    {
          this.setState({phoneerror:"Please enter a valid phone number"});
    }

    this.props.callBack(callbackinfo);
  }

  validateAdd(data)
  {
    var errorlist=[];
    if(this.state.controlledDate != undefined)
    {
    data.dispatch({type: 'SET_TRAVEL_START_DATE', result: this.state.controlledDate});
    }
    else
    {
      errorlist.push("Please select your travel dates.");
    }
    return errorlist;
  }
  addToCart(data, fn, st) {
   var st = this.validateAdd(data);
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
    var dt = this.state.controlledDate;
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
       {detail.type=='standalone' && ( 
        <div>
         <h2>{detail.title}</h2>
          <h5>{detail.name},{detail.city},{detail.state},{detail.country}</h5>
        </div>)
      }
       {detail.type=='package' && ( 
        <div>
       <Row>
       <div>
       <h1>INR {detail.price} only</h1>
       <h2>{detail.noofdays} Days and {detail.noofnights} Nights at {detail.city}, {detail.state}</h2>
       {
        detail.category && detail.category.map(function(category)
{
return (<Chip>{category}</Chip>)
})
}
</div>
           
            
          </Row>
          </div>)
        }
       { 1!=1 && <div>
         <h5>I wound love to book this package for you!!</h5>
        <DatePicker
              container="inline"
              floatingLabelText="Choose your travel start date"
              hintText="Custom date format"
              firstDayOfWeek={0}
              value={this.state.controlledDate}
               onChange={this._handleChange}
              formatDate={dates}
            />
          </div>
        }
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
        <label className={styles.successText}>Item is in the cart now</label>
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
    var message = this.state.message?this.state.message:"";
    var cart = this.props.cartContext;
    var styles = require('./Booking.scss');
    return (
      <Row>
        <Col md={12}>
           { this.renderPriceDetails(that,detail,cart) }
          <Row>
            {1!=1 && this.renderButtons(that,detail,cart) }
          </Row>
         { detail.type=='package' && ( 
          <Row className={styles.callbackContainer}>
            <label>We would love to call you and explain more about the trip (on your convinent phone number).</label>
            <p className={styles.successText}>{message}</p>
            <TextField
                          hintText="Phone number"
                          floatingLabelText="Enter your phone number"
                          floatingLabelFixed={true}
                          data-ctrlid="callbacknumber"
                          type='number'
                          errorText={this.state.phoneerror}
                          default
                          onChange={this.onChange.bind(this)}
                          value={this.state.callbacknumber}/>
            <RaisedButton className={styles.callToActionButton} label="Call me back" primary={true} onClick={this.callBack.bind(this, that, detail)}/>
          </Row>)
        }
        </Col>
      </Row>
    );
  }
}
