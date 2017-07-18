import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import * as footerActions from '../../redux/modules/info';
import { Link} from 'react-router';
import  'isomorphic-fetch';

import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

import Chip from 'material-ui/Chip';

import {push} from 'react-router-redux';

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

export default class InfoBar extends Component {
  static propTypes = {
    info: PropTypes.object,
    // load: PropTypes.func.isRequired
  }

  viewDetails(data, fn, st,x)
  {
        x.preventDefault();
        return false;
   // var placeid = fn._id;
   // data.props.dispatch(push('/detail/id:' + placeid + "/category:products"));

  }

  componentDidMount() {
  }

  render() {
    var linkitems = [];
      var ty = this;
          var category = 'products';
    linkitems = this.props.linkItems;
    const {info, load} = this.props; // eslint-disable-line no-shadow
    const styles = require('./InfoBar.scss');
    return (
      <div className={styles.footer}>
        <div className={styles.centerWidth}>
          <Row>
            <Col xs={12} md={3}>
              <div className={styles.violetTextColor}>
                <h3>LivelyTrips</h3>
              </div>
              <div>
                Make your trips lively
              </div>
              <p>
                Our Commitment
                We are committed to establishing lasting relationships with our customers by exceeding their
                expectations the first time and every time, through consistently delivering outstanding quality of
                service, experience and value.
              </p>
            </Col>
            <Col xs={12} md={3}>
              <div>
                <Row>
                  <div className={styles.violetTextColor}>
                    <h3>Popular Posts</h3>
                  </div>
                </Row>
              </div>
            </Col>
            <Col xs={12} md={3}>
              <div>
                <Row>
                  <div className={styles.violetTextColor}>
                    <h3>Popular Categories</h3>
                    <div style={styles.wrapper}>
                      {linkitems && linkitems.size > 0 && linkitems.map(function (x) {
                       var href ="http://www.livelytrips.com/detail/id:"+x._id+"/category:products";
                       var st = x;
                        return (
                          <div>
                            <a target="__blank" href={href} onClick={ty.viewDetails.bind(x, ty, st)}>{x.name}, {x.city}</a>
                          </div>)
                      })}
                    </div>
                  </div>
                </Row>
              </div>
            </Col>
            <Col xs={12} md={3}>
              <div>
                <Row>
                  <div className={styles.violetTextColor}>
                    <h3>Lets be Friends..</h3>
                    <div style={styles.wrapper}>
                      <Chip
                        style={styles.chip}
                      >
                        
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
            Contact : 8110001444
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
              @2017 livelytrips copyrighted
            </Col>
            <Col xs={12} md={6} className={styles.blackBackgroundColor}>
              <Row className={styles.footerlinks}>
               <Col xs={12} md={2}>
                  <Link to={'/'}>Home</Link>
                </Col>
                <Col xs={12} md={2}>
                   <Link to={'/about'}>About</Link>
                </Col>
                <Col xs={12} md={2}>
                  <Link to={'/contact'}>Contact</Link>
                </Col>
               
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

//export default connect(mapStateToProps, mapDispatchToProps)(InfoBar);

function mapStateToProps(state) {
  console.log('state ' + state);
  return {AppState: state.products}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, footerActions), dispatch)
}


