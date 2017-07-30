import React, {Component} from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {load} from '../../redux/modules/info';
import {asyncConnect} from 'redux-async-connect';
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
      return dispatch(load());
    }
  }
}])

export class Footer extends Component {
  constructor(props) {
    super(props);
    this.setSelectedFilter = this.setSelectedFilter.bind(this);
    this.state = {
      suggestionlist: this.props.products.packages
    };
  }


  render() {
    ;
    const {info, load} = this.props; // eslint-disable-line no-shadow
    const styles = require('./Footer.scss');
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
              Our promise to our customers is a cheaper, faster and safer travel throughout their journey with us.
              We believe the most important thing which we could give our customers is to comfort them in a good mood
              and enjoyable time, whereever they are. 
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
  ;
  console.log('state ' + state);
  return {products: state.products}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, productActions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);

