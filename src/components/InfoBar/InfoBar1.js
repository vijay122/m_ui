import React, { Component } from 'react';
import { Link } from 'react-router';
import { CounterButton, GithubButton, ProductGrid,ProductCard,SquareCard, SearchBar } from 'components';
import config from '../../config';
import Helmet from 'react-helmet';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Grid from 'react-bootstrap/lib/Grid';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

import CarouselItem from 'react-bootstrap/lib/CarouselItem';
import Carousel from 'react-bootstrap/lib/Carousel';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem from 'react-bootstrap/lib/NavItem';
import Nav from 'react-bootstrap/lib/Nav';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import Thumbnail from 'react-bootstrap/lib/Thumbnail';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';


import {connect} from 'react-redux';

import {initializeWithKey} from 'redux-form';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import {Tabs, Tab} from 'material-ui/Tabs';


import * as footerActions from 'redux/modules/info';
import {load, loadFooter} from 'redux/modules/info';
import { asyncConnect } from 'redux-async-connect';
import  'isomorphic-fetch';



import Chip from 'material-ui/Chip';

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    if (!isLoaded(getState())) {
      return dispatch(loadFooter());
    }
  }
}])

export default class Footer extends Component {
  constructor(props) {
    super(props);
     //   this.setSelectedFilter = this.setSelectedFilter.bind(this);
        this.state={
         footerinfo:this.props
        };
  }

 
  render() {
  debugger;
    const {info, load} = this.props; // eslint-disable-line no-shadow
    const styles = require('./InfoBar.scss');
    return (
      <div className={styles.footer}>
      <div className="container">
         <Row>
    <Col xs={12} md={3}>
   <div className={styles.blackColor}>
<h3>LivelyTrips</h3>
   </div>
   <div>
Make your trips lively
   </div>
   <p>
 Our Commitment 
We are committed to establishing lasting relationships with our customers by exceeding their expectations the first time and every time, through consistently delivering outstanding quality of service, experience and value.
   </p>
   <Row>
   Contact Us
   </Row>
   <Row>
   Social icons
   </Row>
   </Col>
    <Col xs={12} md={3}>
<div>
<Row>
<div className={styles.blackColor}>
<h3>Popular Posts</h3>
</div>
</Row>
</div>
  </Col>
    <Col xs={12} md={3}>
     <div>
     <Row>
     <div className={styles.blackColor}>
     <h3>Popular Categories</h3>
      <div style={styles.wrapper}>
      {info != undefined && info.loaded!= undefined && info.loaded==true }
      <Chip
          style={styles.chip}
        >
          Text Chip
        </Chip>
        </div>
     </div>
     </Row>
     </div>
   </Col>
     <Col xs={12} md={3}>
     <div>
     <Row>
     <div className={styles.blackColor}>
     <h3>Lets be Friends..</h3>
      <div style={styles.wrapper}>
      <Chip
          style={styles.chip}
        >
          Text Chip
        </Chip>
        </div>
     </div>
     </Row>
     </div>
   </Col>
    </Row>
    
      </div>
      <div className={styles.copyright}>
      <Row>
    <Col xs={6} md={6}>
    @2016 livelytrips copyrighted
    </Col>
    <Col xs={6} md={6}>
<Row>
<Col xs={2} md={2}>
About
</Col>
<Col xs={2} md={2}>
Livelytrips
</Col>
<Col xs={2} md={2}>
Contact
</Col>
<Col xs={2} md={2}>
Survey
</Col>
<Col xs={2} md={2}>
Help
</Col>
</Row>
    </Col>
    </Row>
      </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  debugger;
  console.log('state '+state);
  return { footerinfo: state.info }
}

function mapDispatchToProps(dispatch) {
  debugger;
  return bindActionCreators(Object.assign({}, footerActions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);

