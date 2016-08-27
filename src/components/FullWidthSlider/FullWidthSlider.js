import React from 'react';
var Slider = require('react-slick');

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

import { push } from 'react-router-redux';



export default class FullWidthSlider extends React.Component {
   constructor(props) {
    super(props);
  }
  render() {
    ;
    var that = this;
    var packagelist = this.props.packagelist;
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
   // var settings = this.props.settings;
    return (
      <Slider {...settings}>
      <Row>
      {packagelist && packagelist.map(function(x)
        {
                  return(
               <div />
                    )
        }

        )}
      </Row>
      </Slider>
    );
  }
}

