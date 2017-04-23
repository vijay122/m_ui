import React, {Component} from 'react';
import {OrderSummary, CartOptions, PaymentOptions,PanelContainer,CartGrid} from '../../components';
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
import DatePicker from 'material-ui/DatePicker';


function mapStateToProps(state) {
  console.log('state ' + state);
  var validation ;
  if(state.checkout!= undefined && state.checkout.validationresponse!= undefined &&  state.checkout.validationresponse.result)
  {
    validation = state.checkout.validationresponse.result;
  }
  return {cartcontext: state.cart , validationresponse: validation}
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
   componentDidMount() {
    this.setDate();
    var cart =    this.state.cartcontext;
    this.props.dispatch(checkoutActions.validateOrder(cart));
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

  handleOptionChange = (changeEvent) => {
    this.setState({
    selectedOption: changeEvent.target.value
  });
  }

  render() {
    var self = this;
    var that = this.props;
    var mon ="";
    var validationresponse = this.props.validationresponse;
    if(validationresponse!= undefined && validationresponse.mon != undefined)
    {
mon = validationresponse.mon;
    }
    var title = "Master Order Number :"+ mon;
    const cartItems = this.props.cartcontext.items;
    const styles = require('./Detail.scss');
    // require the logo image both from client and server
    return (
      <div className={styles.home}>
       <Row>
       <h5>Dear Traveller, Thanks for choosing livelytrips.com</h5>
       </Row>
       <Row>
       <h5>Order number:{title}</h5>
       </Row>
        <Row>
         <Col xs={12} md={4}>
        <PanelContainer title="Summary" subtitle="Your travel shapshot">
        <OrderSummary />
        </PanelContainer>
        </Col>
      <Col xs={12} md={8}>
      <div>
        <PanelContainer title="Order Review">
        <CartGrid items={cartItems} validationresponse={validationresponse}/>
         <Row>
        <Col xs={12} md={6}>
        coupon code
        </Col>
         <Col xs={12} md={6}>
         comments
        </Col>
        </Row>
        </PanelContainer>

</div>
        </Col>
        </Row>
          <Row>
        <Col xs={12} md={4}>
        <PanelContainer title="Billing Address"/>
        </Col>
        <Col xs={12} md={4}>
        <PanelContainer title="Travel Dates" subtitle="Date of the travel and traveller details">
        <Row>
         <Col xs={12} md={6}>
         Travel Date
              </Col>
         <Col xs={12} md={6}>
        <DatePicker
              container="inline"
              floatingLabelText="Date of travel"
              hintText="Custom date format"
              firstDayOfWeek={0}
              value={this.state.controlledDate}
               onChange={this._handleChange}
            />
            </Col>
 <Col xs={12} md={6}>
         Traveller name
              </Col>
         <Col xs={12} md={6}>
        
            </Col>
        </Row>
        </PanelContainer>
        </Col>
         <Col xs={12} md={4}>
        <PanelContainer title="Payment Method">
        <Row>
           <div className="radio">
      <label>
        <input type="radio" value="cashondelivery" 
                      checked={this.state.selectedOption === 'cashondelivery'} 
                      onChange={this.handleOptionChange} />
        Cash On Delivery
      </label>
    </div>
    <div className="radio">
      <label>
        <input type="radio" value="paynow" 
                      checked={this.state.selectedOption === 'paynow'} 
                      onChange={this.handleOptionChange} />
        Pay Now
      </label>
    </div>
     </Row>
    </PanelContainer>
        </Col>
        </Row>
        <Row>
        <div id="paymentDiv">
        </div>
        <iframe id="paymentFrame">

        </iframe>
 
        </Row>
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