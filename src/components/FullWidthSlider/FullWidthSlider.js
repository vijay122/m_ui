import React from 'react';
var Slider = require('react-slick');

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

import { push } from 'react-router-redux';


export default class ProductCard extends React.Component {
   constructor(props) {
    super(props);
  }
  viewDetails(data,fn,st)
{
  var placeid= data.props.data._id;
   data.props.dispatch(push('/detail/id:'+placeid));
}
    render() 
    {
      debugger;
      var image;
       var ty= this;
      var name = this.props.data.name== undefined?"":this.props.data.name;
    if(this.props.data!=null&&this.props.data.image!= null)
      {
        image = this.props.data.image[0];
      }
      else
      {
        image = "";
      }
      return(
         <div onClick={this.viewDetails.bind(this,ty)}>
  <Card>
    <CardHeader
      title={name}
      subtitle="Subtitle"
      avatar="http://lorempixel.com/100/100/nature/"/>
    <CardMedia
      overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
    >
      <img src={image} />
    </CardMedia>
  </Card>
  </div>

  );
}
}


export default class FullWidthSlider extends React.Component {
   constructor(props) {
    super(props);
  }
  render() {
    debugger;
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

