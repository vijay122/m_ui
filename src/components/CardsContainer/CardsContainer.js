import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

var Slider = require('react-slick');

import { ProductCard} from '../../components';

export default class CardsContainer extends React.Component {
   constructor(props) {
    super(props);
  }
   resizeImage(url, height, width)
{
 // var filter='c_fill,q_60,e_improve,'+ 'h_'+height+','+'w_'+width+'/l_text:Doppio%20One_20:Vijay:%20Jonathan%20Doe,g_south_west,y_5,x_10,co_rgb:eee/';
var filter='c_fill,q_60,e_improve,'+ 'h_'+height+','+'w_'+width+'/';


 var str = url;
    var index = str.indexOf("upload/") + 7;
  var rest=  str.substr(0, index) + filter + str.substr(index);
  return rest;
}
viewDetails(data,fn,st)
{
  var that =this;
  var placeid= data.props.data._id;
   data.props.dispatch(push('/detail/id:'+placeid));
}

render()
{
   var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
    };
  var that = this;
  const styles = require('./CardsContainer.scss');
var packagelist = this.props.packagelist;
var x = {};
  var canrender = new Array();
 if( this.props.packagelist!= undefined && this.props.packagelist.length>0)
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
        debugger;
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
 <div onClick={that.viewDetails.bind(this,that)}>
  <Card>
    <CardMedia
      overlay={<CardTitle title={x.name} subtitle={x.title} />}>
    <div><h2>{x.name} </h2></div>
    <label>{x.title}</label>
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