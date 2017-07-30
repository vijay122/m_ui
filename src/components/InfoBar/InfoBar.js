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
              <div>
                <h3 className={styles.footerTitles}>LivelyTrips</h3>
              </div>
              <div className={styles.cursiveLabel}>
                Make your trips lively with livelytrips.com
              </div>
              <p className={styles.aboutUs}>
              "Our promise to our customers is a cheaper, faster and safer travel throughout their journey with us.
              We believe the most important thing which we could give our customers is to comfort them in a good mood
              and enjoyable time, whereever they are". 
              </p>
            </Col>
            <Col xs={12} md={3}>
              <div>
                <Row>
                  <div>
                    <h3 className={styles.footerTitles}>Popular Posts</h3>
                  </div>
                </Row>
              </div>
            </Col>
            <Col xs={12} md={3}>
              <div>
                <Row>
                  <div>
                    <h3 className={styles.footerTitles}>Popular Categories</h3>
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
          <Col className={styles.bigBanner}>
            Contact : 9442426265
            Email : livelytrips@gmail.com
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


