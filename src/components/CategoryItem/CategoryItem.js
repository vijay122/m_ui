import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import CarouselItem from 'react-bootstrap/lib/CarouselItem';
import Divider from 'material-ui/Divider';

import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default class CategoryItem extends Component{
     constructor(props) {
    super(props);
      this.state={};
      this.state.images =[];
  }
   render() 
   {

   	  const styles = require('./CategoryItem.scss');
         var state = this.state;
    return (
     <Row>
     <div>
     <Col md={3}>
     <img src="http://placehold.it/300x250"></img>
     </Col>
      <Col md={7}>
      <Row>
      <h2>Package name</h2>
      <h5>base address, soo and sooooo... with pin code</h5>
      <h5>Tour Operator</h5>
      </Row>
      <Row>
      <Divider />
      </Row>
      <Row>
      SightSeeing:
      </Row>
     </Col>
      <Col md={2} className={styles.center}>
      <Row>
<Row>
Price
</Row>
<Row>
3 days 4 nights
</Row>
     <RaisedButton label="Book Now" primary={true} />
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

