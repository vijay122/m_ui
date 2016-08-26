import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Col from 'react-bootstrap/lib/Col';
import { push } from 'react-router-redux';

export default class SquareCard extends React.Component
{
  constructor(props) {
    super(props);
        var that = this;
  }
  resizeImage(url, height, width)
{
  var filter='c_fill,q_60,e_improve,'+ 'h_'+height+','+'w_'+width+'/l_text:Doppio%20One_20:Vijay:%20Jonathan%20Doe,g_south_west,y_5,x_10,co_rgb:eee/';


 var str = url;
    var index = str.indexOf("upload/") + 7;
  var rest=  str.substr(0, index) + filter + str.substr(index);
  return rest;
}
viewDetails(data,fn,st)
{
  var placeid= data.props.data._id;
   data.props.dispatch(push('/detail/id:'+placeid));
}


  render()
  {
    var ty= this;
    var image = this.props.data.image[0];
    var product = this.props.data;
    return(
          <Col xs={6} md={3}>
          <div onClick={this.viewDetails.bind(this,ty)}>
  <Card>
    <CardMedia
      overlay={<CardTitle title={product.name} subtitle={product.title} />}
    >
      <img src={image!= undefined && this.resizeImage(image,250,250)}></img>
    </CardMedia>
  </Card>
  </div>
</Col>
      )
  }
} 