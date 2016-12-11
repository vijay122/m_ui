import React from 'react';
import {Card, CardMedia, CardTitle} from 'material-ui/Card';
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
  var filter='c_fill,q_60,e_improve,'+ 'h_'+height+','+'w_'+width+'/';


 var str = url;
    var index = str.indexOf("upload/") + 7;
  var rest=  str.substr(0, index) + filter + str.substr(index);
  return rest;
}
viewDetails(data,fn,st)
{
  var placeid= data.props.data._id;
   data.props.dispatch(push('/detail/id:'+placeid+"/category:products"));
}


  render()
  {
    var category = this.props.category;
        const styles = require('./SquareCard.scss');
    var ty= this;
    var image ='';

      if(this.props.data.image[0]!= undefined)
      {
 image = this.props.data.image[0];
    }
    else if(this.props.data.assets!= undefined)
    {
      image = this.props.data.assets.display;
    }

    var product = this.props.data;
    return(
          <Col xs={6} md={3}>
          <div onClick={this.viewDetails.bind(this,ty,category)}>
  <Card>
    <CardMedia
      overlay={<CardTitle title={product.name} className={styles.tiles} subtitle={product.title} />}
    >
      <img src={image!= undefined && this.resizeImage(image,250,250)}></img>
    </CardMedia>
  </Card>
  </div>
</Col>
      )
  }
}