import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Divider from 'material-ui/Divider';
import { push } from 'react-router-redux';


import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default class CategoryItem extends Component{
     constructor(props) {
    super(props);
      this.state={};
      this.state.images =[];
  }
   resizeImage(url, height, width)
{
  var filter='c_fill,q_60,e_improve,'+ 'h_'+height+','+'w_'+width+'/l_text:Doppio%20One_20:Vijay:%20Jonathan%20Doe,g_south_west,y_5,x_10,co_rgb:eee/';


 var str = url;
    var index = str.indexOf("upload/") + 7;
  var rest=  str.substr(0, index) + filter + str.substr(index);
  return rest;
}
   render()
   {
var that = this;
   	  const styles = require('./CategoryItem.scss');
         var state = this.state;
         var product = this.props.products;
         var img = product.image!= undefined && product.image[0]?product.image[0]:product.assets.display;
    return (
     <Row>
     <div>
     <Col md={3}>
     <img src={this.resizeImage(img,250,250)}></img>
     </Col>
      <Col md={7}>
      <Row>
      <h2>{product.name}</h2>
      <h3>{product.title}</h3>
      <h5>{product.city}</h5>
      <h5>Operator: {product.operator}</h5>
      </Row>
      <Row>
      <Divider />
      </Row>
      <Row>
      <Col md={4}>
      <div>SightSeeing:</div>
      {product && product.products && product.products.map(function(x)
        {
          return(<VisitIcons menu={x} dispatch={that.props.dispatch}/>);
        })}
      </Col>
      <Col md={4}>
      </Col>
      <Col md={4}>
      </Col>
      </Row>
     </Col>
      <Col md={2} className={styles.center}>
      <Row>
<Row>
Price
</Row>
<Row>
3 days 4 nights
</Row>
     <RaisedButton label="Book Now" primary={true} />
     </Row>
     <Row>
     Rating
     </Row>
     </Col>
     </div>
     </Row>
    );
  }
}

export class VisitIcons extends Component {
 constructor(props) {
    super(props);
       this.state = {};
       this.state.product=props.menu;
       if(props.menu == undefined)
       {
        this.state.product={};
        this.state.image=[];
        this.state.image[0]='empty';
        this.state.name ="";
       }
  }
   handleClick(data,fn,st) {
var placeid= data.props.menu.value;
   data.props.dispatch(push('/detail/id:'+placeid));
}
resizeImage(url, height, width)
{
  var filter='h_'+height +',w_'+width+'/';
 var str = url;
    var index = str.indexOf("upload/") + 7;
  var rest=  str.substr(0, index) + filter + str.substr(index);
  return rest;
}
  render() {

    var product=this.state.product;
     var ty = this;
     var prodimage = product.image!= undefined ? product.image: product.scrollimage;
     var imagesrc = this.resizeImage(prodimage,80,80)
return(
      <img src={imagesrc}   onClick={this.handleClick.bind(product,ty)}/>
      );
  }
}
