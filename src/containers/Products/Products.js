import React, { Component } from 'react';
import { Link } from 'react-router';
import { CounterButton, GithubButton, ProductGrid,ProductCard,SquareCard, SearchBar, CardsContainer } from '../../components';
import config from '../../config';
import Helmet from 'react-helmet';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Grid from 'react-bootstrap/lib/Grid';
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

import * as productActions from '../../redux/modules/products';
import {connect} from 'react-redux';
import {isLoaded, load as load, viewdetail,loadAllData} from '../../redux/modules/products';
import {initializeWithKey} from 'redux-form';
import { asyncConnect } from 'redux-async-connect';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { ReactRpg } from 'react-rpg';


import {Tabs, Tab} from 'material-ui/Tabs';

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
  //  if (!isLoaded(getState())) {
  //    return dispatch(load());
  //  }
  }
}])



//@connect(
  //state => ({
    //productlist :state.entries
  //}),
  //{...productActions, initializeWithKey })
export class Products extends Component {
  constructor(props) {
    super(props);
        this.setSelectedFilter = this.setSelectedFilter.bind(this);
        this.state={
          suggestionlist:this.props.products.packages
        };
  }

  handleToggleKitten(data,fn,st) {
var placeid= data.props.data._id;
   data.props.dispatch(push('/detail/id:'+placeid));
}
 setSelectedFilter (e,v,s)
 {
  if(e=='events')
  {
    this.setState({'suggestionlist':this.props.products.events});
  }
  else if(e=='hotels')
  {
   this.setState({'suggestionlist':this.props.products.hotels});
  }
  else if(e=='packages')
  {
   this.setState({'suggestionlist':this.props.products.packages});
  }
 }
  render()
  {
     if(this.props.products.loaded)
  {
    var that = this;
//  const { productList } = this.props.products.products;
var view = this.state!= null? this.state.view:"";
  var offer = this.props.products.offers;
 var productlist =this.props.products.products;
 var eventlist = this.props.products.events;
 var hotellist = this.props.products.hotels;
  var packagelist = this.props.products.packages;
   var hotels = this.props.products.hotels;
  // offer = this.props.products.products[0];
    const styles = require('./Home.scss');
    // require the logo image both from client and server
    const logoImage = require('./logo.png');
    return (
      <div className={styles.home}>
        <Helmet title="Home"/>
    <Row className="show-grid">
   <Col xs={12} md={8}>
     <HomeSlider  data={this.props.products.offers}/>
 </Col>
  <Col xs={12} md={4}>
    <ReactRpg imagesArray={images} columns={[ 2, 2, 2 ]} padding={2} />
  </Col>
    </Row>
    <div>
    <Row>
   <h4> Find the best livelytrips stays and tours around the world</h4>
    </Row>
    <Row className="show-grid">
    <SearchBar dispatch={that.props.dispatch}/>
    </Row>
    </div>
    <div>
    <Row>
    <label>Component Name</label>
    </Row>
    <Row className="show-grid">
     {
    productlist && productlist.map(function (product){
    return <SquareCard data={product} key={product.id}  dispatch={that.props.dispatch}/>;
    })}
    </Row>
    </div>
    <Row>
    <hr />
    </Row>
    <CardsContainer packagelist={packagelist} type="Popular Hotels"  dispatch={that.props.dispatch}/>
    <br />
  <CardsContainer packagelist={eventlist}  type="Popular Packages" dispatch={that.props.dispatch} />
  <br />
  <CardsContainer packagelist={hotellist}   type="Popular Events" dispatch={that.props.dispatch}/>
  <br />
        </div>
    );
  }
  else
  {

    return(<div />);
  }
  }

}

function mapStateToProps(state) {
  console.log('state '+state);
  return { products: state.products }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, productActions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);


export class ProductTiles extends Component {

 constructor(props) {
    super(props);
        var that = this;
  }
  render() {
    const styles = require('./Home.scss');
    var ty = this;
    var image;
    if(this.props.data!=null&&this.props.data.image!= null)
      {
image = this.props.data.image[0];
      }
      else
      {
        image = "";
      }
    if(this.props.data)
    {
      const {detail} = this.props.data;
        const {showKitten} = this.state;
        return(
         <Col xs={6} md={4}>
      <Thumbnail className={styles.thumbNoBorder} style={{height: 400 + 'px',width:300+'px'}} src={image} alt="242x200">
      </Thumbnail>
    </Col>
      )
    }
    else
    {
        return(
         <Col xs={6} md={4}>
      <Thumbnail className={styles.thumbNoBorder} style={{height: 400 + 'px',width:300+'px'}} src="http://placehold.it/400x300" alt="242x200">
      </Thumbnail>
    </Col>
      )
    }

  }
     state = {
    showKitten: false
  }

  handleToggleKitten(data,fn,st) {
var placeid= data.props.data._id;
   data.props.dispatch(push('/detail/id:'+placeid));
}
}

export class HomeSlider extends Component {

 constructor(props) {
    super(props);

  }
  render() {
      var that = this;
    var list = this.props.data;
    return (
     <Carousel>
    {list && list.map(function(scrolloffer)
      {
        return(
            <CarouselItem>
      <img src={that.resizeImage(scrolloffer.scrollimage,450,900)}/>
      <div className="carousel-caption">
        <h2>{scrolloffer.city}</h2>
        <h3>{scrolloffer.title} {scrolloffer.type}</h3>
      </div>
    </CarouselItem>
    )
  }
     )}

  </Carousel>
  )
  }
   resizeImage(url, height, width)
{
  var filter='c_fill,q_60,e_improve,'+ 'h_'+height+','+'w_'+width+'/l_text:Doppio%20One_20:Vijay:%20Jonathan%20Doe,g_south_west,y_95,x_10,co_rgb:eee/';


 var str = url!=undefined?url:"";
    var index = str.indexOf("upload/") + 7;
  var rest=  str.substr(0, index) + filter + str.substr(index);
  return rest;
}
}

const images = [
  {
    url: "http://placehold.it/100x100",
    clickHandler: (url, obj) => { console.log(url) }
  },
  {
    url: "http://placehold.it/300x300",
    clickHandler: (url, obj) => { console.log(obj) }
  },
   {
    url: "http://placehold.it/200x200",
    clickHandler: (url, obj) => { console.log(obj) }
  },
   {
    url: "http://placehold.it/200x200",
    clickHandler: (url, obj) => { console.log(obj) }
  }
];


