import React from 'react';
import {Card, CardMedia, CardTitle} from 'material-ui/Card';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { push } from 'react-router-redux';
import * as browserUtils from '../../utils/HtmlUtils';

var Slider = require('react-slick');

export default class CardsContainer extends React.Component {
   constructor(props) {
    super(props);
  }
   resizeImage(url, height, width)
{
 var filter='c_fill,q_60,e_improve,'+ 'h_'+height+','+'w_'+width+'/';
 var str = url;
    var index = str.indexOf("upload/") + 7;
  var rest=  str.substr(0, index) + filter + str.substr(index);
  return rest;
}
viewDetails(data,fn,st)
{
  var that =this;
  var placeid= data._id;
  var category = fn.props.category;
   fn.props.dispatch(push('/detail/id:'+placeid+"/category:"+category));
}

render()
{
  var isMobile = browserUtils.isMobile();
   var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
    };
    if(isMobile)
    {
      settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 2,
    };
    }
  var that = this;
  const styles = require('./CardsContainer.scss');
var packagelist = this.props.packagelist;
var x = {};
  var canrender = new Array();
  var size = packagelist!= undefined?packagelist.size:0;
 if( size!= undefined && size>0)
 {
  canrender[0]=1;
 }
 else
 {
   canrender=[];
 }
  return(
    <div >
    <Row className={styles.container}>
    <div className={styles.title}>
    <label className={styles.subhead}>{this.props.type}</label>
    </div>
    <div className={styles.scriptStyles}>
    Hello this is the script container pls have a look at it for the basic onfo
    </div>

    {canrender && canrender.length>0 && canrender.map(function(v)
      {

return(
     <Slider {...settings}>
     {that && that.props && that.props.packagelist && that.props.packagelist.map(function(x)
      {
       if(x.image==undefined && x.assets!= undefined && x.assets.display)
      {
        x.image =[];
        x.image[0] = x.assets.display;
      }
        if(x.image==undefined)
        {
          x.image ="";
        }
        return(
            <Col xs={6} md={3}>
 <div onClick={that.viewDetails.bind(this,x,that)}>
  <Card>
    <CardMedia
      overlay={<CardTitle title={x.name} subtitle={x.title} />}>
    <div><h2>{x.name} </h2></div>
    <label className={styles.tileTitle}>{x.title}</label>
      <img src={x.image[0]!= undefined && that.resizeImage(x.image[0],250,250)}></img>
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