import React from 'react';
var Slider = require('react-slick');
import Row from 'react-bootstrap/lib/Row';

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
          {packagelist && packagelist.map(function (x) {
              return (
                <div />
              )
            }
          )}
        </Row>
      </Slider>
    );
  }
}

