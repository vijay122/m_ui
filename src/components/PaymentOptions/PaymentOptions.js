import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import Well from 'react-bootstrap/lib/Well';
import React, {Component} from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

import areIntlLocalesSupported from 'intl-locales-supported';

import {push} from 'react-router-redux';

var querystring = require('querystring');


export default class PaymentOptions extends React.Component {

  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
    this.onChange = this.onChange.bind(this);
    var that = this;
    this.state = {
      eventKey: "credit",
      tempprod: ["products"],
    };
  }

  serialize = function (obj) {
    var str = [];
    for (var p in obj) {
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    }
    return str.join("&");
  }

  onChange(e) {
    e.preventDefault();
    this.state[e.currentTarget.attributes["data-ctrlid"].value] = e.currentTarget.value;
  }

  handleSelect = function (key) {
    this.setState({key});
  }

  viewDetails(data, fn, st) {
    var searchtable = this.state.key;
    var searchtype = this.refs["searched_id"].props.resultKey;
    var searchvalue = "";
    let result = querystring.stringify(this.refs["searched_id"].state.searchText.resultKey);
    data.props.dispatch(push('/categories:' + searchtable + '/searchtype:' + searchtype + '/search:' + result));
  }


  render() {
    var that = this;
     const styles = require('./PaymentOptions.scss');
    let DateTimeFormat;
    var cartItems = this.props.items;
    if (areIntlLocalesSupported(['fr'])) {
      DateTimeFormat = global.Intl.DateTimeFormat;
    } else {
      const IntlPolyfill = require('intl');
      DateTimeFormat = IntlPolyfill.DateTimeFormat;
      require('intl/locale-data/jsonp/fr');
    }
    const style = {
      margin: 12,
    };
    return (
      <Well className={styles.searchPanel}>
        <Row>
          <Col md={12}>
            <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example">
              <Tab eventKey="credit" title="Credit Card">
              </Tab>
              <Tab eventKey="netbanking" title="Net Banking">
              </Tab>
              <Tab eventKey="paypal" title="PayPal">
              </Tab>
               <Tab eventKey="debit" title="Debit Card">
              </Tab>
            </Tabs>
            <Row>
              {this.state.key == "credit" && this.state.tempprod.map(function (x) {
                return ( <CreditControls />)
              })
              }
            </Row>
             <Row>
              {this.state.key == "netbanking" && this.state.tempprod.map(function (x) {
                return ( <NetBankingControls />)
              })
              }
            </Row>
            <Row>
              {this.state.key == "paypal" && this.state.tempprod.map(function (x) {
                return ( <PayPalControls />)
              })
              }
            </Row>
            <Row>
              {this.state.key == "debit" && this.state.tempprod.map(function (x) {

                return <DebitControls />
              })
              }
            </Row>
          </Col>
        </Row>
      </Well>
    );
  }
}

export class CreditControls extends Component {
	 constructor(props) {
    super(props);
  }
    render() {
    	return (
    			<div className="tab-1 resp-tab-content" aria-labelledby="tab_item-0">
										<div className="payment-info">
											<h3>Personal Information</h3>
											<form>
												<div className="tab-for">				
													<h5>EMAIL ADDRESS</h5>
														<input type="text" value="" />
													<h5>FIRST NAME</h5>													
														<input type="text" value="" />
												</div>			
											</form>
											<h3 className="pay-title">Credit Card Info</h3>
											<form>
												<div className="tab-for">				
													<h5>NAME ON CARD</h5>
														<input type="text" value="" />
													<h5>CARD NUMBER</h5>													
														<input className="pay-logo" type="text" value="0000-0000-0000-0000" required="" />
												</div>	
												<div className="transaction">
													<div className="tab-form-left user-form">
														<h5>EXPIRATION</h5>
															<ul>
																<li>
																	<input type="number" className="text_box" type="text" value="6" min="1" />	
																</li>
																<li>
																	<input type="number" className="text_box" type="text" value="1988" min="1" />	
																</li>
																
															</ul>
													</div>
													<div className="tab-form-right user-form-rt">
														<h5>CVV NUMBER</h5>													
														<input type="text" value="xxxx" required="" />
													</div>
													<div className="clear"></div>
												</div>
												<input type="submit" value="SUBMIT" />
											</form>
											<div className="single-bottom">
													<ul>
														<li>
															<input type="checkbox"  id="brand" value="" />
															<label htmlFor="brand"><span></span>By checking this box, I agree to the Terms & Conditions & Privacy Policy.</label>
														</li>
													</ul>
											</div>
										</div>
									</div>
    	)
    }
}

export class NetBankingControls extends Component {
	 constructor(props) {
    super(props);
  }
    render() {
    	return (
    			<div className="tab-1 resp-tab-content" aria-labelledby="tab_item-1">
										<div className="payment-info">
											<h3>Net Banking</h3>
											<div className="radio-btns">
												<div className="swit">								
													<div className="check_box"> <div className="radio"> <label><input type="radio" name="radio" checked=""/><i></i>Andhra Bank</label> </div></div>
													<div className="check_box"> <div className="radio"> <label><input type="radio" name="radio" /><i></i>Allahabad Bank</label> </div></div>
													<div className="check_box"> <div className="radio"> <label><input type="radio" name="radio" /><i></i>Bank of Baroda</label> </div></div>
													<div className="check_box"> <div className="radio"> <label><input type="radio" name="radio" /><i></i>Canara Bank</label> </div></div>	
													<div className="check_box"> <div className="radio"> <label><input type="radio" name="radio" /><i></i>IDBI Bank</label> </div></div>
													<div className="check_box"> <div className="radio"> <label><input type="radio" name="radio" /><i></i>Icici Bank</label> </div></div>	
													<div className="check_box"> <div className="radio"> <label><input type="radio" name="radio" /><i></i>Indian Overseas Bank</label> </div></div>	
													<div className="check_box"> <div className="radio"> <label><input type="radio" name="radio" /><i></i>Punjab National Bank</label> </div></div>	
													<div className="check_box"> <div className="radio"> <label><input type="radio" name="radio" /><i></i>South Indian Bank</label> </div></div>
													<div className="check_box"> <div className="radio"> <label><input type="radio" name="radio" /><i></i>State Bank Of India</label> </div></div>		
												</div>
												<div className="swit">								
													<div className="check_box"> <div className="radio"> <label><input type="radio" name="radio" checked="" /><i></i>City Union Bank</label> </div></div>
													<div className="check_box"> <div className="radio"> <label><input type="radio" name="radio" /><i></i>HDFC Bank</label> </div></div>
													<div className="check_box"> <div className="radio"> <label><input type="radio" name="radio" /><i></i>IndusInd Bank</label> </div></div>
													<div className="check_box"> <div className="radio"> <label><input type="radio" name="radio" /><i></i>Syndicate Bank</label> </div></div>
													<div className="check_box"> <div className="radio"> <label><input type="radio" name="radio" /><i></i>Deutsche Bank</label> </div></div>	
													<div className="check_box"> <div className="radio"> <label><input type="radio" name="radio" /><i></i>Corporation Bank</label> </div></div>
													<div className="check_box"> <div className="radio"> <label><input type="radio" name="radio" /><i></i>UCO Bank</label> </div></div>	
													<div className="check_box"> <div className="radio"> <label><input type="radio" name="radio" /><i></i>Indian Bank</label> </div></div>	
													<div className="check_box"> <div className="radio"> <label><input type="radio" name="radio" /><i></i>Federal Bank</label> </div></div>	
													<div className="check_box"> <div className="radio"> <label><input type="radio" name="radio" /><i></i>ING Vysya Bank</label> </div></div>	
												</div>
												<div className="clear"></div>
											</div>
											<a href="#">Continue</a>
										</div>
									</div>
    	)
    }
}

export class PayPalControls extends Component {
	 constructor(props) {
    super(props);
  }
    render() {
    	return (
    			<div className="tab-1 resp-tab-content" aria-labelledby="tab_item-2">
										<div className="payment-info">
											<h3>PayPal</h3>
											<h4>Already Have A PayPal Account?</h4>
											<div className="login-tab">
												<div className="user-login">
													<h2>Login</h2>
													
													<form>
														<input type="text" value="name@email.com"  required="" />
														<input type="password" value="PASSWORD"  required="" />
															<div className="user-grids">
																<div className="user-left">
																	<div className="single-bottom">
																			<ul>
																				<li>
																					<input type="checkbox"  id="brand1" value="" />
																					<label for="brand1"><span></span>Remember me?</label>
																				</li>
																			</ul>
																	</div>
																</div>
																<div className="user-right">
																	<input type="submit" value="LOGIN" />
																</div>
																<div className="clear"></div>
															</div>
													</form>
												</div>
											</div>
										</div>
									</div>
    	)
    }
}

export class DebitControls extends Component {
	 constructor(props) {
    super(props);
  }
    render() {
    	return (
    			<div className="tab-1 resp-tab-content" aria-labelledby="tab_item-3">	
										<div className="payment-info">
											
											<h3 className="pay-title">Dedit Card Info</h3>
											<form>
												<div className="tab-for">				
													<h5>NAME ON CARD</h5>
														<input type="text" value="" />
													<h5>CARD NUMBER</h5>													
														<input className="pay-logo" type="text" value="0000-0000-0000-0000"   required="" />
												</div>	
												<div className="transaction">
													<div className="tab-form-left user-form">
														<h5>EXPIRATION</h5>
															<ul>
																<li>
																	<input type="number" className="text_box" type="text" value="6" min="1" />	
																</li>
																<li>
																	<input type="number" className="text_box" type="text" value="1988" min="1" />	
																</li>
																
															</ul>
													</div>
													<div className="tab-form-right user-form-rt">
														<h5>CVV NUMBER</h5>													
														<input type="text" value="xxxx"   required="" />
													</div>
													<div className="clear"></div>
												</div>
												<input type="submit" value="SUBMIT" />
											</form>
											<div className="single-bottom">
													<ul>
														<li>
															<input type="checkbox"  id="brand" value="" />
															<label for="brand"><span></span>By checking this box, I agree to the Terms & Conditions & Privacy Policy.</label>
														</li>
													</ul>
											</div>
										</div>	
									</div>
    	)
    }
}

export  class PaymentOptionsdepricated extends Component {
  constructor(props) {
    super(props);
  }
    render() {
    	    const styles = require('./PaymentOptions.scss');
	   return (<div className="main">
		<h1>Payment Form Widget</h1>
		<div className="content">
						<div className="sap_tabs">
							<div id="horizontalTab" className={styles.blockClass}>
								<div className="pay-tabs">
									<h2>Select Payment Method</h2>
									  <ul className="resp-tabs-list">
										  <li className="resp-tab-item" aria-controls="tab_item-0" role="tab"><span><label className="pic1"></label>Credit Card</span></li>
										  <li className="resp-tab-item" aria-controls="tab_item-1" role="tab"><span><label className="pic3"></label>Net Banking</span></li>
										  <li className="resp-tab-item" aria-controls="tab_item-2" role="tab"><span><label className="pic4"></label>PayPal</span></li> 
										  <li className="resp-tab-item" aria-controls="tab_item-3" role="tab"><span><label className="pic2"></label>Debit Card</span></li>
										  <div className="clear"></div>
									  </ul>	
								</div>
								<div className="resp-tabs-container">
									<div className="tab-1 resp-tab-content" aria-labelledby="tab_item-0">
										<div className="payment-info">
											<h3>Personal Information</h3>
											<form>
												<div className="tab-for">				
													<h5>EMAIL ADDRESS</h5>
														<input type="text" value="" />
													<h5>FIRST NAME</h5>													
														<input type="text" value="" />
												</div>			
											</form>
											<h3 className="pay-title">Credit Card Info</h3>
											<form>
												<div className="tab-for">				
													<h5>NAME ON CARD</h5>
														<input type="text" value="" />
													<h5>CARD NUMBER</h5>													
														<input className="pay-logo" type="text" value="0000-0000-0000-0000" required="" />
												</div>	
												<div className="transaction">
													<div className="tab-form-left user-form">
														<h5>EXPIRATION</h5>
															<ul>
																<li>
																	<input type="number" className="text_box" type="text" value="6" min="1" />	
																</li>
																<li>
																	<input type="number" className="text_box" type="text" value="1988" min="1" />	
																</li>
																
															</ul>
													</div>
													<div className="tab-form-right user-form-rt">
														<h5>CVV NUMBER</h5>													
														<input type="text" value="xxxx"  required="" />
													</div>
													<div className="clear"></div>
												</div>
												<input type="submit" value="SUBMIT" />
											</form>
											<div className="single-bottom">
													<ul>
														<li>
															<input type="checkbox"  id="brand" value="" />
															<label for="brand"><span></span>By checking this box, I agree to the Terms & Conditions & Privacy Policy.</label>
														</li>
													</ul>
											</div>
										</div>
									</div>
									<div className="tab-1 resp-tab-content" aria-labelledby="tab_item-1">
										<div className="payment-info">
											<h3>Net Banking</h3>
											<div className="radio-btns">
												<div className="swit">								
													<div className="check_box"> <div className="radio"> <label><input type="radio" name="radio" checked=""/><i></i>Andhra Bank</label> </div></div>
													<div className="check_box"> <div className="radio"> <label><input type="radio" name="radio" /><i></i>Allahabad Bank</label> </div></div>
													<div className="check_box"> <div className="radio"> <label><input type="radio" name="radio" /><i></i>Bank of Baroda</label> </div></div>
													<div className="check_box"> <div className="radio"> <label><input type="radio" name="radio" /><i></i>Canara Bank</label> </div></div>	
													<div className="check_box"> <div className="radio"> <label><input type="radio" name="radio" /><i></i>IDBI Bank</label> </div></div>
													<div className="check_box"> <div className="radio"> <label><input type="radio" name="radio" /><i></i>Icici Bank</label> </div></div>	
													<div className="check_box"> <div className="radio"> <label><input type="radio" name="radio" /><i></i>Indian Overseas Bank</label> </div></div>	
													<div className="check_box"> <div className="radio"> <label><input type="radio" name="radio" /><i></i>Punjab National Bank</label> </div></div>	
													<div className="check_box"> <div className="radio"> <label><input type="radio" name="radio" /><i></i>South Indian Bank</label> </div></div>
													<div className="check_box"> <div className="radio"> <label><input type="radio" name="radio" /><i></i>State Bank Of India</label> </div></div>		
												</div>
												<div className="swit">								
													<div className="check_box"> <div className="radio"> <label><input type="radio" name="radio" checked="" /><i></i>City Union Bank</label> </div></div>
													<div className="check_box"> <div className="radio"> <label><input type="radio" name="radio" /><i></i>HDFC Bank</label> </div></div>
													<div className="check_box"> <div className="radio"> <label><input type="radio" name="radio" /><i></i>IndusInd Bank</label> </div></div>
													<div className="check_box"> <div className="radio"> <label><input type="radio" name="radio" /><i></i>Syndicate Bank</label> </div></div>
													<div className="check_box"> <div className="radio"> <label><input type="radio" name="radio" /><i></i>Deutsche Bank</label> </div></div>	
													<div className="check_box"> <div className="radio"> <label><input type="radio" name="radio" /><i></i>Corporation Bank</label> </div></div>
													<div className="check_box"> <div className="radio"> <label><input type="radio" name="radio" /><i></i>UCO Bank</label> </div></div>	
													<div className="check_box"> <div className="radio"> <label><input type="radio" name="radio" /><i></i>Indian Bank</label> </div></div>	
													<div className="check_box"> <div className="radio"> <label><input type="radio" name="radio" /><i></i>Federal Bank</label> </div></div>	
													<div className="check_box"> <div className="radio"> <label><input type="radio" name="radio" /><i></i>ING Vysya Bank</label> </div></div>	
												</div>
												<div className="clear"></div>
											</div>
											<a href="#">Continue</a>
										</div>
									</div>
									<div className="tab-1 resp-tab-content" aria-labelledby="tab_item-2">
										<div className="payment-info">
											<h3>PayPal</h3>
											<h4>Already Have A PayPal Account?</h4>
											<div className="login-tab">
												<div className="user-login">
													<h2>Login</h2>
													
													<form>
														<input type="text" value="name@email.com"  required="" />
														<input type="password" value="PASSWORD" required="" />
															<div className="user-grids">
																<div className="user-left">
																	<div className="single-bottom">
																			<ul>
																				<li>
																					<input type="checkbox"  id="brand1" value="" />
																					<label for="brand1"><span></span>Remember me?</label>
																				</li>
																			</ul>
																	</div>
																</div>
																<div className="user-right">
																	<input type="submit" value="LOGIN" />
																</div>
																<div className="clear"></div>
															</div>
													</form>
												</div>
											</div>
										</div>
									</div>
									<div className="tab-1 resp-tab-content" aria-labelledby="tab_item-3">	
										<div className="payment-info">
											
											<h3 className="pay-title">Dedit Card Info</h3>
											<form>
												<div className="tab-for">				
													<h5>NAME ON CARD</h5>
														<input type="text" value="" />
													<h5>CARD NUMBER</h5>													
														<input className="pay-logo" type="text" value="0000-0000-0000-0000" required="" />
												</div>	
												<div className="transaction">
													<div className="tab-form-left user-form">
														<h5>EXPIRATION</h5>
															<ul>
																<li>
																	<input type="number" className="text_box" type="text" value="6" min="1" />	
																</li>
																<li>
																	<input type="number" className="text_box" type="text" value="1988" min="1" />	
																</li>
																
															</ul>
													</div>
													<div className="tab-form-right user-form-rt">
														<h5>CVV NUMBER</h5>													
														<input type="text" value="xxxx" required="" />
													</div>
													<div className="clear"></div>
												</div>
												<input type="submit" value="SUBMIT" />
											</form>
											<div className="single-bottom">
													<ul>
														<li>
															<input type="checkbox"  id="brand" value="" />
															<label for="brand"><span></span>By checking this box, I agree to the Terms & Conditions & Privacy Policy.</label>
														</li>
													</ul>
											</div>
										</div>	
									</div>
								</div>	
							</div>
						</div>	

		</div>
		<p className="footer">Copyright © 2016 Payment Form Widget. All Rights Reserved | Template by <a href="https://w3layouts.com/" target="_blank">w3layouts</a></p>
	</div>)
}
}