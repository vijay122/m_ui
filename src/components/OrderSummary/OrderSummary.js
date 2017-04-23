import React from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

export default class OrderSummary extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Row>
        <Col md={12}>
                  <Row>
                   <Col md={6}>
          <h3>No of Travellers</h3>
          </Col>
           <Col md={6}>
           </Col>
          </Row>
               <Row>
                <Col md={6}>
          <h3>Total trip distance</h3>
           </Col>
            <Col md={6}>
           </Col>
          </Row>
          <Row>
           <Col md={6}>
          <h3>Journey start date</h3>
            </Col>
             <Col md={6}>
           </Col>
           </Row>
            <Row>
                <Col md={6}>
          <h3>No of Night Stays</h3>
           </Col>
            <Col md={6}>
           </Col>
          </Row>
           <Row>
                <Col md={6}>
          <h3>Order created date:</h3>
           </Col>
            <Col md={6}>
           </Col>
          </Row>
          <Row>
            <h3>Subtotal</h3>
            <hr />
          </Row>
          <Row>
            <h3>Estimated total</h3>
            <hr />
          </Row>
          <Row>
           <div class="pm-button"><a href="https://www.payumoney.com/paybypayumoney/#/172C5A91CC51AC93E97B72406D2801B9">
           <img src="https://www.payumoney.com//media/images/payby_payumoney/buttons/113.png" /></a></div>
          </Row>
        </Col>
      </Row>
    );
  }
}
