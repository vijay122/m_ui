import React from 'react';
import {Card, CardMedia, CardTitle} from 'material-ui/Card';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import {push} from 'react-router-redux';
import * as browserUtils from '../../utils/HtmlUtils';
import LazyLoad from 'react-lazyload';
import Slider from 'react-slick';

export default class CardsContainer extends React.Component {
  constructor(props) {
    super(props);
        this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
  }

  resizeImage(url, height, width) {
    var filter = 'c_fill,q_60,e_improve,' + 'h_' + height + ',' + 'w_' + width + '/';
    var str = url;
    var index = str.indexOf("upload/") + 7;
    var rest = str.substr(0, index) + filter + str.substr(index);
    return rest;
  }

  viewDetails(data, fn, st) {
    var that = this;
    var placeid = data._id;
    var category = fn.props.category;
    fn.props.dispatch(push('/detail/id:' + placeid + "/category:" + category));
  }
    next() {
    this.refs['slider'].slickNext()
  }
  previous() {
    this.refs['slider'].slickPrev()
  }

  render() {
    var isMobile = browserUtils.isMobile();
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      arrows:false,
    };
    if (isMobile) {
      settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows:false,
      };
    }
    var that = this;
    const styles = require('./CardsContainer.scss');
    var packagelist = this.props.packagelist;
    var x = {};
    var canrender = new Array();
    var size = packagelist != undefined ? packagelist.size : 0;
    if (size != undefined && size > 0) {
      canrender[0] = 1;
    }
    else {
      canrender = [];
    }
    return (
      <div >
        <Row className={styles.container}>
          <div className={styles.title}>
            <label className={styles.subhead}>{this.props.type}</label>
            <div style={{float: 'right'}}>
          <button className='button' onClick={this.previous}>Previous</button>
          <button className='button' onClick={this.next}>Next</button>
        </div>
          </div>
          <div className={styles.scriptStyles}>
           {this && this.props!=undefined && this.props.promotionMessage?this.props.promotionMessage:""}
          </div>

          {canrender && canrender.length > 0 && canrender.map(function (v) {

            return (
              <Slider ref="slider" {...settings}>
                {that && that.props && that.props.packagelist && that.props.packagelist.map(function (x) {
                  if (x.image == undefined && x.assets != undefined && x.assets.display) {
                    x.image = [];
                    x.image[0] = x.assets.display;
                  }
                  if (x.image == undefined) {
                    x.image = "";
                  }
                  return (
                    <Col key={x._id} xs={6} md={3}>
                      <div onClick={that.viewDetails.bind(this, x, that)}>
                      <div className={styles.ribbonWrapperGreen}>
                      <div className={styles.ribbonGreen}>
                      Rs {x.price}
                      </div>
                      </div>
                        <Card className={styles.overrideStyles}>
                          <CardMedia
                            overlay={<CardTitle  title={x.name} className={styles.tiles} subtitle={x.title}/>}>
                            <div><h2>{x.name} </h2></div>
                            <h3 className={styles.tileTitle}>{x.title}</h3>
                            <div className={styles.daysDisplay}>
                            {x.noofdays}D/{x.noofnights}N
                            </div>
                              <LazyLoad>
                            <img className={styles.fullWidth} src={x.image[0] != undefined && that.resizeImage(x.image[0], 250, 250)}></img>
                             </LazyLoad>
                          </CardMedia>
                        </Card>
                      </div>
                    </Col>);
                })
                }
              </Slider>
            )
          })
          }
        </Row>
      </div>
    )
  }
}