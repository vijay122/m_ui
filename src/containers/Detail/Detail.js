import React, { Component } from 'react';
import { Link } from 'react-router';
import { CounterButton, GithubButton, Booking, WeatherCard } from '../../components';
import config from '../../config';
import Helmet from 'react-helmet';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Grid from 'react-bootstrap/lib/Grid';
import Image from 'react-bootstrap/lib/Image';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import CarouselItem from 'react-bootstrap/lib/CarouselItem';
import Carousel from 'react-bootstrap/lib/Carousel';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem from 'react-bootstrap/lib/NavItem';
import Nav from 'react-bootstrap/lib/Nav';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import Thumbnail from 'react-bootstrap/lib/Thumbnail';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import Panel from 'react-bootstrap/lib/Panel';
import {isLoaded, load as load, viewdetail} from '../../redux/modules/products';
import * as detailActions from '../../redux/modules/detail';
import { asyncConnect } from 'redux-async-connect';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as productActions from '../../redux/modules/products';
import { push } from 'react-router-redux';

import geolib  from 'geolib';

import RaisedButton from 'material-ui/RaisedButton';

//import distance from 'google-distance'

function mapStateToProps(state) {
  console.log('state '+state);
  if(state.detail!= undefined && state.detail.nearby!= null)
  {
     state.products.detail.nearbylocation = state.products.detail.nearbylocation.concat(state.detail.nearby).unique();
   }
  return { products: state.products, detail: state.detail }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, detailActions), dispatch)
}

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
   // if (!isLoaded(getState())) {
   //   return dispatch(load());
   // }
  }
}])
export class Detail extends Component {
   constructor(props) {
    super(props);
       this.state = {};
       this.state.detail=props.products.detail;
  }
componentWillMount(){
 
}

componentDidMount(){
this.props.getProducts(this.props.products.current);
}
componentWillReceiveProps(newprops)
{
   if(newprops.detail.getProductsResult!= undefined)
  this.setState({'dependencies':newprops.detail.getProductsResult});

}
viewmore(data,fn)
{
  data.viewMore(fn,"places");
// data.dispatch({ type: 'VIEW_MORE', result: fn });
}
  addToCart(data,fn,st) {
   // data.dispatch({"ADD_TO_CART",fn});
      data.dispatch({ type: 'ADD_TO_CART', result: fn });
    // data.AddToCart(fn);
}
resizeImage(url, height, width)
{
  var filter='c_fill,q_60,e_improve,'+ 'h_'+height+','+'w_'+width+'/';
 var str = url;
    var index = str.indexOf("upload/") + 7;
  var rest=  str.substr(0, index) + filter + str.substr(index);
  return rest;
}
  render() {
    var that = this.props;
    var detail ={};
    if(this.props.products.detail!= undefined )//&& this.state.dependencies== undefined)
    {
      detail = this.props.products.detail;
    }
   if( this.props.products.detail!= undefined && this.props.products.detail.count==0 && this.state.dependencies!= undefined && this.state.dependencies.place!= undefined)
{
  detail = this.state.dependencies.place;
}
var packages =[];
//(this.state.dependencies!= null && this.state.dependencies.packages!= null):this.state.dependencies.packages:[];
var events =[];
//(this.state.dependencies!= null && this.state.dependencies.events!= null):this.state.dependencies.events:[];
var hotels =[];
var places =[];

if(this.state!= null && this.state.dependencies!= null )
{
hotels = this.state.dependencies.hotels;
packages = this.state.dependencies.packages;
events = this.state.dependencies.events;
places = this.state.dependencies.hotels;
}

const dummySentences = ['Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 'Donec hendrerit tempor tellus.', 'Donec pretium posuere tellus.', 'Proin quam nisl, tincidunt et, mattis eget, convallis nec, purus.', 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 'Nulla posuere.', 'Donec vitae dolor.', 'Nullam tristique diam non turpis.', 'Cras placerat accumsan nulla.', 'Nullam rutrum.', 'Nam vestibulum accumsan nisl.'];

    const styles = require('./Detail.scss');
    {
      debugger;
return (
      <div className={styles.home}>
        <Helmet title="Home"/>
        <label>Places near to {detail!=undefined&& detail.name} </label>
          <Grid className={styles.noContainer}>
    <Row className="show-grid">
     <Col xs={12} md={2}>
      {
        detail!= undefined && places!= undefined && places.map(function (nearbyloc){
            return <SidebarTiles data={nearbyloc} referenceproduct={detail} key={nearbyloc.id}></SidebarTiles>;
          })}
        <a onClick={this.viewmore.bind(this,that,detail)}>View More</a>
      </Col>
      <Col xs={12} md={6}>
      <Row>
              <Image src={detail!= undefined && detail.image!= undefined && this.resizeImage(detail.image[0],400,550)} />
              </Row>
              <Row>
              this is the small images
              </Row>
      </Col>
      <Col xs={12} md={3}>
      <Booking that = {that} detail={detail}/>
    </Col>
    </Row>
    <Row style={{minHeight:"300px"}}>
    <Col xs={12} md={8} >
     <Row className="show-grid">
       <h3>Features</h3>
    </Row>
     <Row>
      <Tabs defaultActiveKey={2}>
    <Tab eventKey={1} title="Tab 1">
    <Row className="show-grid">
      <Col sm={6} md={3}>How to reach?<br/>{dummySentences.slice(0, 6).join(' ')}</Col>
      <Col sm={6} md={3}>What to eat?<br/>{dummySentences.slice(0, 4).join(' ')}</Col>
      <Col sm={6} md={3}>What to do?<br/>{dummySentences.slice(0, 6).join(' ')}</Col>
      <Col sm={6} md={3}>
<WeatherCard detail={detail}/>
      </Col>
    </Row>
    </Tab>
    <Tab eventKey={2} title="Tab 2">Tab 2 content</Tab>
    <Tab eventKey={3} title="Tab 3" disabled>Tab 3 content</Tab>
  </Tabs>
    </Row>
    </Col>
    <Col xs={12} md={4}>
    <div>
     <h3>what ppl talks about?</h3>
       <Panel header="epics">
      Panel content
    </Panel>
    </div>
    </Col>
    </Row>
    <Row>
      <Col xs={12} md={4}>
    <h2> Hotels in {detail.name} </h2>
    </Col>
        <Col xs={12} md={4}>
      <h2> Packages in {detail.name} </h2>
      </Col>
          <Col xs={12} md={4}>
      <h2> Events in {detail.name} </h2>
      </Col>
    </Row>
    <Row>
    <Col xs={12} md={4}>
    <DetailRecommendationList data="hotels" recommendedList={hotels} referenceproduct={detail} dispatch ={this.props.dispatch}/>
    </Col>
    <Col xs={12} md={4}>
     <DetailRecommendationList data="packages" recommendedList={packages} referenceproduct={detail} dispatch ={this.props.dispatch}/>
    </Col>
    <Col xs={12} md={4}>
     <DetailRecommendationList data="events" recommendedList={events} referenceproduct={detail} dispatch ={this.props.dispatch}/>
    </Col>
    </Row>
  </Grid>
        </div>
    );
    }
    
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Detail);


export class SidebarTiles extends Component {
  resizeImage(url, height, width)
{
   if(url == null)
   {
    return "";
   }
  if(url != null && typeof url =='object')
  {
    url = url[0];
  }
  var filter='h_'+height +',w_'+width+'/';
 var str = url;

    var index = str.indexOf("upload/") + 7;
  var rest=  str.substr(0, index) + filter + str.substr(index);
  return rest;
}
componentDidMount()
{
}
componentWillReceiveProps(newprops)
{

  var input = newprops.data.loc.coordinates;
  if(input!= undefined)
  {
  var refprod = newprops.referenceproduct;
  var inMeters = geolib.getDistance(
    {latitude: input[0], longitude: input[1]},
    {latitude: refprod.latitude, longitude: refprod.longitude}
);
  var kms = inMeters/1000;
  this.setState({distance:kms})
}
}
  render() {
    var current = this.props.data;
    var distance =(this.state!=null && this.state.distance!= undefined) ?this.state.distance +" kms":"";
return(
  <div>
  <Row>
    <label>{current.name} </label>
  </Row>
         <Row>   
      <Col xs={12} md={7} width={150} height={150}>
          
      <div>
      <Image src={this.resizeImage(current.image[0],100,100)} alt="150x100">
      </Image>
      </div>
</Col>
<Col md={5}>
<h6>in</h6>
 <h5>{distance}</h5>
</Col>
      </Row>
      </div>
      );
  }
}

export class DetailRecommendationList extends Component {
  render() {
    var rows = [];
    var that = this;
    {
     this.props && this.props.recommendedList && this.props.recommendedList.map(function (place){
     rows.push( <DetailRecommendations recommended={place} referenceproduct={that.props.referenceproduct} dispatch={that.props.dispatch}/>);
    })}
return(
         <Row style={{padding:"4px"}}>   
    {rows}
      </Row>
      );
  }
}

export class DetailRecommendations extends Component {
 constructor(props) {
    super(props);
       this.state = {};
       this.state.product=props.recommended;
       if(props.recommended == undefined)
       {
        this.state.product={};
        this.state.image=[];
        this.state.image[0]='empty';
        this.state.name ="";
       }
  }
   handleClick(data,fn,st) {
   var placeid= data.props.recommended._id;
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
componentWillReceiveProps(newprops)
{
  var input = newprops.data;
  var res = newprops.referenceproduct;
  var inMeters = geolib.getDistance(
    {latitude: 51.5103, longitude: 7.49347},
    {latitude: "51° 31' N", longitude: "7° 28' E"}
);
  var kms = inMeters/1000;
  this.setState({distance:kms})
  // if(newprops.detail.getProductsResult!= undefined)
 // this.setState({'dependencies':newprops.detail.getProductsResult});

}
  componentDidMount()
{
  //var input = this.props.referenceproduct;
  var res = this.props.referenceproduct;
  var inMeters = geolib.getDistance(
    {latitude: 51.5103, longitude: 7.49347},
    {latitude: "51° 31' N", longitude: "7° 28' E"}
);
  var kms = inMeters/1000;
  this.setState({distance:kms})
  // if(newprops.detail.getProductsResult!= undefined)
 // this.setState({'dependencies':newprops.detail.getProductsResult});

}
  render() {
    var product=this.state.product;
     var ty = this;
     var prodimage = product.image!= undefined ? product.image[0]: product.scrollimage;
     var imagesrc = this.resizeImage(prodimage,100,100)
return(
<div className="recommendedTile">
      <Row style={{padding:'2px'}}  onClick={this.handleClick.bind(this,ty)}> 
      <Col xs={4} md={3}>
       <img src={imagesrc}></img>

</Col>
<Col xs={8} md={9}>
      <div>
      <Row>
      <Col md={8}>
     <label>{product.name}</label>
       
        <div>{product.city}</div>
        <div>{product.title}</div>
     </Col>
     <Col md={4}>
     <div>price</div>
     <div>stars</div>
     <div>    
     <a>view</a>
     </div>
     </Col>
     </Row>
      </div>

</Col>
<br />
      </Row>
      </div>
      );
  }
}

