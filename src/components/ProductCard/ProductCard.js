import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Col from 'react-bootstrap/lib/Col';
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
      var image;
       var ty= this;
      var name = this.props.data.name== undefined?"":this.props.data.name;
    if(this.props.data!=null&&this.props.data.image!= null)
      {
        image = this.props.data.image[0];
      }
      else if(this.props.data!= undefined && this.props.data.assets!= undefined && this.props.data.assets.display)
      {
        image = this.props.data.assets.display;
      }
      else
      {
        image="";
      }
      return(
         <Col xs={6} md={3}>
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
</Col>

  );
}
}
