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
    render() 
    {
   
      return(
        <Row>
        <Col md={12}>
        <Row>
        <h3>Summary</h3>
        <hr />
         <TextField
      hintText="MultiLine with rows: 2 and rowsMax: 4"
        floatingLabelText="Do you have a promo code?"/>
          <FlatButton label="Apply" primary={true}/>
        <hr />
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
  <RaisedButton label="Checkout" primary={true}/>
</Row>
</Col>
</Row>
  );
}
}
