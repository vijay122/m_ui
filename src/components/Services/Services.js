import React from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import areIntlLocalesSupported from 'intl-locales-supported';
import {isProductExistsInCart} from '../../utils/validation';
import Chip from 'material-ui/Chip';
import Modal from 'react-bootstrap/lib/Modal';

import {Login} from '../../containers/';
import {ReactRpg} from '@vijay122/react-tiles';

export default class Services extends React.Component {
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
   if(!data.auth.loggedIn)
   {
   this.setState({lgShow: true});
 }
  
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
    var styles = require('./Services.scss');
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

    var images = [
  {
    url: "http://tripconnoisseurs.com/wp-content/uploads/2016/08/Honeymoon.jpg",
    text:"honeymoon",
    clickHandler: (url, obj) => {
      console.log("inside category click "+obj)
    }
  },
  {
    url: "http://www.easternwatersports.com/wp-content/uploads/2016/04/grouptrip-300x300.jpg?x94867",
    text:"treks",
    clickHandler: (url, obj) => {
      console.log("inside category click "+obj)
    }
  },
  {
    text:"grouptrips",
    url: "https://static2.tripoto.com/media/filter/t/img/101328/TripDocument/1474279330_1474279325380.jpg",
    clickHandler: (url, obj) => {
      console.log("inside category click "+obj)
    }
  },
  {
    text:"solotrips",
    url: "http://travelsourceindia.in/wp-content/uploads/2016/06/family-ties-300x300.jpg",
    clickHandler: (url, obj) => {
      console.log("inside category click "+obj)
    }
  }
];
    
      return (
        <div>
       {detail.type=='standalone' && ( 
        <div>
         <h2>Additional Services</h2>
         <ReactRpg imagesArray={images} columns={[3, 3, 3]} padding={2} />
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
          </div>
      )
    }



  renderButtons(that,detail,cart){
    var cartItems =[];
    var styles = require('./Services.scss');
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
   lgClose = () => this.setState({ lgShow: false });


  render() {
    var that = this.props.that;
    var detail = this.props.detail;
    var message = this.state.message?this.state.message:"";
    var cart = this.props.cartContext;
    var styles = require('./Services.scss');

    return (
      <Row>
        <Col md={12}>
           { this.renderPriceDetails(that,detail,cart) }
        </Col>
      </Row>
    );
  }
}


const MyLargeModal = React.createClass({
  render() {
    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Please Login to continue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Wrapped Text</h4>
          <Login />
                 </Modal.Body>
      </Modal>
    );
  }
});
