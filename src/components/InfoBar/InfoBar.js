import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as footerActions from '../../redux/modules/info';
import {load, loadFooter} from '../../redux/modules/info';
import { asyncConnect } from 'redux-async-connect';
import  'isomorphic-fetch';

import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

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

/*@connect(
    state => ({info: state.info.data}),
    dispatch => bindActionCreators({load}, dispatch))
*/


export default class InfoBar extends Component {
  static propTypes = {
    info: PropTypes.object,
   // load: PropTypes.func.isRequired
  }
  componentDidMount(){
//this.props.loadFooter();
//loadFooter();
}

  render() {
    const {info, load} = this.props; // eslint-disable-line no-shadow
    const styles = require('./InfoBar.scss');
    return (
      <div className={styles.footer}>
      <div className={styles.centerWidth}>
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
      <Row>
      <Col>
      Contact : 8473282821
      Email : livelytrips@gmail.com
      </Col>
      </Row>
      <Row>
      <Col>
      Terms of use
      </Col>
      </Row>
      <Row>
      <Col>
      Sitemap
      </Col>
      </Row>
      <div className={styles.copyright}>
      <Row>
    <Col xs={12} md={6}>
    @2016 livelytrips copyrighted
    </Col>
    <Col xs={12} md={6}>
<Row className={styles.footerlinks}>
<Col xs={12} md={2}>
About
</Col>
<Col xs={12} md={2}>
Livelytrips
</Col>
<Col xs={12} md={2}>
Contact
</Col>
<Col xs={12} md={2}>
Survey
</Col>
<Col xs={12} md={2}>
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
  console.log('state '+state);
  return { AppState: state.products }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, footerActions), dispatch)
}


