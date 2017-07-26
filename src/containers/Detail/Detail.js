import React, {Component} from 'react';
import {Booking} from '../../components';
import Grid from 'react-bootstrap/lib/Grid';
import Image from 'react-bootstrap/lib/Image';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import {isLoaded, load as load, isProductExistInStore,isProductAlreadyLoaded, refreshSection} from '../../redux/modules/products';
import * as detailActions from '../../redux/modules/detail';
import {asyncConnect} from 'redux-async-connect';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {push} from 'react-router-redux';
import geolib  from 'geolib';
import * as browserUtils from '../../utils/HtmlUtils';
import {VisitIcons} from '../../components';

import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup' 

import {TransitionMotion, spring, Motion} from 'react-motion'

var Slider = require('react-slick');


//import distance from 'google-distance'

function qs(key) {
  var vars = [], hash;
  var hashes; // = window.location.href.slice(window.location.href.indexOf('/') + 1).split('/');
  if (typeof window != "undefined") {
    hashes = window.location.href.slice(window.location.href.indexOf('/') + 1).split('/');

  }
  else {
    hashes = 'id:57413ffe7a1d3a001111b3ec';
  }

  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split(':');
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  return vars[key];
}

function isCurrentProduct(product,cat, id)
{
if(product._id==id)
{
  return true;
}
else
{
  return false;
}
}

function mapStateToProps(state) {
  console.log('state ' + state);
  if (state.detail != undefined && state.detail.nearby != null) {
    state.products.detail.nearbylocation = state.products.detail.nearbylocation.concat(state.detail.nearby).unique();
  }
  var id = qs('id');
  var cat = qs('category');
  var st = isProductExistInStore(state, id, cat);
  if (!isProductExistInStore(state, id, cat)) {
    if(this!= undefined && id && cat)
    {
          this.store.dispatch(refreshSection(id, cat));
    }
   // else if(this.store)
    {
         // this.store.dispatch(refreshSection(id, cat));
  
    }
  }
  else {
    state.detail.detail = isProductExistInStore(state, id, cat);
  }
   var deps  ={};
 if(state && state.detail && state.detail.getProductsResult &&  state.detail.getProductsResult.places)
  {
deps = state.detail.getProductsResult.places;
  }
  return {products: state.products, detail: state.detail, dependencies:deps, cart: state.cart, checkout:state.checkout, auth : state.auth}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, detailActions), dispatch)
}

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    // if (!isLoaded(getState())) {
    //   return dispatch(load());
    //   return dispatch(load());
    // }
  }
}])

export class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.error="";
    this.state.detail = props.detail.detail;
    this.state.startIndex = 0;
    this.state.endIndex = 4;
  }

  componentWillMount() {
  var id = qs('id');
  var cat = qs('category');
}
  componentDidMount() {
      var id = qs('id');
  var cat = qs('category');
  if (!isProductExistInStore({}, id, cat))
  {
    if(this.props.detail!= undefined && this.props.detail.detail!= undefined)
    {
          this.props.getProducts(this.props.detail.detail);
    }
    else
    {
          this.props.dispatch(refreshSection(id, cat));
    }
  }
  }

  componentWillReceiveProps(newprops) {
    if (newprops.detail.getProductsResult != undefined)
      this.setState({'dependencies': newprops.detail.getProductsResult});
      var id = qs('id');
  var cat = qs('category');
  var existingproduct = {};
  if(newprops.detail.getProductsResult)
    {
     existingproduct = isProductAlreadyLoaded(newprops.detail.getProductsResult, id, cat);
    }
  if(newprops.detail.getProductsResult== undefined)
  {
    if(newprops.detail && newprops.detail.detail)
    {
         existingproduct = newprops.detail.detail;
    }
    else
    {
   existingproduct = newprops.detail;
 }
  }
  if (!existingproduct)
  {
    if(this.props.detail!= undefined && this.props.detail.detail!= undefined)
    {
          this.props.getProducts(this.props.detail.detail);
    }
    else
    {
          this.props.dispatch(refreshSection(id, cat));
    }
  }
  else
  {
    this.props.detail.detail = existingproduct;
  }
  }

  viewmore(data, fn) {
    data.viewMore(fn, "places");
 //data.dispatch({ type: 'VIEW_MORE', result: fn });
  }

  previousNearby() {

    this.state.endIndex = this.state.startIndex;
    this.state.startIndex = this.state.startIndex - 4;

    var places = this.state.dependencies.places;
    if (places[this.state.startIndex] != undefined) {
      this.setState({
        "startIndex": this.state.startIndex,
        "endIndex": this.state.endIndex
      });
    }

    // data.viewMore(fn,"places");
// data.dispatch({ type: 'VIEW_MORE', result: fn });
  }

  nextNearby() {
    this.state.startIndex = this.state.endIndex;
    this.state.endIndex = this.state.endIndex + 4;

    var places = this.state.dependencies.places;
    if (places[this.state.endIndex] != undefined) {
      this.setState({
        "startIndex": this.state.startIndex,
        "endIndex": this.state.endIndex,
        "springValue":"155%"
      });
    }

    // data.viewMore(fn,"places");
// data.dispatch({ type: 'VIEW_MORE', result: fn });
  }

  resizeImage(url, height, width) {
    var filter = 'c_fill,q_60,e_improve,' + 'h_' + height + ',' + 'w_' + width + '/';
    var str = url;
    var index = str.indexOf("upload/") + 7;
    var rest = str.substr(0, index) + filter + str.substr(index);
    return rest;
  }

  validateAdd(date)
  {
    var error ="";

    if(date!= undefined)
    {
error = "please select the date of your travel.";
    }
    this.setState({error:error});
  }


  renderIncludesMenu(that,detail,cart)
  {
    var productsArray =[];
           if(detail && detail.products && detail.products)
           {
            for(var i=0; i<detail.products.length; i++)
            {
              productsArray.push(<VisitIcons menu={detail.products[i]} dispatch={that.dispatch}/>);
            }
          }

                return productsArray;
  }

  render() {
 var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      arrows:false,
      vertical:true,
    };
        var isMobile = browserUtils.isMobile();
        var hideClassForMobile = isMobile?"hide":"block";
        var self = this;
    var that = this.props;
    var cart = this.props.cart;
    var detail = {};
    if (this.props.detail.detail != undefined)//&& this.state.dependencies== undefined)
    {
      detail = this.props.detail.detail;
    }
    if (this.props.detail.detail != undefined && this.props.detail.detail.count == 0 && this.state.dependencies != undefined && this.state.dependencies.place != undefined) {
      detail = this.state.dependencies.place;
     
    }
     if(detail.image==undefined && detail.assets && detail.assets.display)
      {
         detail.image = [detail.assets.display];
      }
    var packages = [];
//(this.state.dependencies!= null && this.state.dependencies.packages!= null):this.state.dependencies.packages:[];
    var events = [];
//(this.state.dependencies!= null && this.state.dependencies.events!= null):this.state.dependencies.events:[];
    var hotels = [];
    var places = [];
    var nearbyElements = [];
    var startIndex = this.state.startIndex;
    var endIndex = this.state.endIndex;
     var includes = (detail.description && detail.description.indexOf("|")>-1)?detail.description.split("|").clean(""):[detail.description];
       var excludes = (detail.landmark && detail.landmark.indexOf("|")>-1)? detail.landmark.split("|").clean(""):[detail.landmark];
    if (this.state != null && this.state.dependencies != null) {
      hotels = this.state.dependencies.hotels;
      packages = this.state.dependencies.packages;
      events = this.state.dependencies.events;
      places = this.state.dependencies.places;
    }
    var nearbyElements = places.slice(startIndex, endIndex);
    const dummySentences = ['Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 'Donec hendrerit tempor tellus.', 'Donec pretium posuere tellus.', 'Proin quam nisl, tincidunt et, mattis eget, convallis nec, purus.', 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 'Nulla posuere.', 'Donec vitae dolor.', 'Nullam tristique diam non turpis.', 'Cras placerat accumsan nulla.', 'Nullam rutrum.', 'Nam vestibulum accumsan nisl.'];
    const styles = require('./Detail.scss');
    {
      return (
        <div className={styles.home}>
        {this.props!= undefined && this.props.cart!= undefined && this.props.cart.error!= undefined?
          <div className={styles.scriptStyles}>
                  {this.props.cart.error.map(function(x)
                          {
                              return( <div>{x}</div>)
                            })
                          }
                      </div>:
                <div/>
}
         
          <Row className="show-grid">
            <Col xs={12} md={2} className={styles.nearbyTitleDiv}>
              <label>Nearby Places </label>
            </Col>
            <Col xs={12} md={8} className={styles.titleDiv}>
              <label >{detail != undefined && detail.name} </label>
            </Col>
            <Col xs={12} md={2}>
            </Col>
          </Row>
          <Grid className={styles.noContainer}>
            <Row className="show-grid">
              <Col className={hideClassForMobile} md={2}>
                <a onClick={this.previousNearby.bind(this, that, detail)}>Previous</a>
               {/* <SidebarList videos={nearbyElements} referenceproduct={detail} springValue={self.state.springValue} dispatch={that.dispatch}/> */}
                {
                  detail != undefined && nearbyElements != undefined && nearbyElements.map(function (nearbyloc) {
                    if (detail._id != nearbyloc._id)
                      return (
                     <CSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                    <SidebarTiles data={nearbyloc} key={nearbyloc._id + "detail"} referenceproduct={detail}
                                           key={nearbyloc.id} dispatch={that.dispatch}></SidebarTiles>
                                             </CSSTransitionGroup>);
                  })
                }
                <a onClick={this.nextNearby.bind(this, that, detail)}>Next</a>
              </Col>
              <Col xs={12} md={6}>
                <Row>
                  <Image className={styles.imageContainer}
                         src={detail != undefined && detail.image != undefined && this.resizeImage(detail.image[0], 400, 550)}/>
                </Row>
                {detail.products && (
                  <Row>
                  <h5>Place visits included in package/Itenary:</h5><br/>
                  {this.renderIncludesMenu(that,detail,cart)}
                </Row>)}
              </Col>
              <Col xs={12} md={3}>
                <Booking that={that} detail={detail} cartContext={cart} checkout={this.props.checkout} validate={this.validateAdd}  callBack={this.props.callBack} auth ={this.props.auth}/>
              </Col>
            </Row>
            <Row style={{minHeight: "300px"}}>
              <Col xs={12} md={8}>
                <Row className="show-grid">
                  <h3>Features</h3>
                </Row>
                <Row>
                  <Tabs defaultActiveKey={1}>
                    <Tab eventKey={1} title="About & Info">
                   { detail.type!="package" &&
      <Row className="show-grid">
                        <Col sm={12} md={6}><h1>About the place:</h1><br/>{detail.description}</Col>
                        <Col sm={12} md={6}><h1>Landmarks:</h1><br/>{detail.landmark}</Col>
                      </Row>
                    }
    {detail.type=="package" && detail.description && detail.landmark
&& 
<Row className="show-grid">                     
                        {                           
      
                          <div>
                          <Col sm={12} md={6}><h1>Package Includes/Itenary:</h1><br/>
                         {includes && includes.map(function(x)
                            {
                         return(<li>{x}</li>)
                       })
                         }
                          </Col>
                          <Col sm={12} md={6}><h1>Excludes:</h1><br/>
                        {excludes && excludes.map(function(x)
                        {
                         return(<li>{x}</li>)
                       })
                         }
                          </Col>
                          </div>
                        }
                      </Row>
    }
                    </Tab>
                    <Tab eventKey={2} title="Location and visiting">
                      <Row className="show-grid">
                        <Col sm={6} md={3}>How to reach?<br/>{detail.howtoreach}</Col>
                        <Col sm={6} md={3}>What to eat?<br/>{detail.whattoeat}</Col>
                        <Col sm={6} md={3}>What to do?<br/>{detail.whattodo}</Col>
                        <Col sm={6} md={3}>
                          {
                            //  eventKey!= undefined && eventKey.map(function(x)
//{
//return <WeatherCard detail={detail}/>
//})
                          }
                        </Col>
                      </Row>
                    </Tab>
                  </Tabs>
                </Row>
              </Col>
              {1== 1 &&
              <Col xs={12} md={4}>
                <div className={styles.operatorBox}>
                  <h3>About the Tour Operator</h3>
                  <hr/>
                  <p>{detail.aboutoperator}</p>
                </div>
              </Col>
            }
            </Row>
            <Row>
              <Col xs={12} md={4}>

              </Col>
              <Col xs={12} md={4}>

              </Col>
              <Col xs={12} md={4}>

              </Col>
            </Row>
            {1==1 &&
            <Row>
              <Col xs={12} md={4}>
               <Row className={styles.hotelsHeader}>
                              <h2> Hotels near {detail.name} </h2>
                              </Row>
                <DetailRecommendationList data="hotels" recommendedList={hotels} referenceproduct={detail}
                                          dispatch={this.props.dispatch}/>
              </Col>
              <Col xs={12} md={4}>
               <Row className={styles.packagesHeader}>
                              <h2> Packages near {detail.name} </h2>
                              </Row>
                <DetailRecommendationList data="packages" recommendedList={packages} referenceproduct={detail}
                                          dispatch={this.props.dispatch}/>
              </Col>
              <Col xs={12} md={4}>
               <Row className={styles.eventsHeader}>
                              <h2> Events near {detail.name} </h2>
                              </Row>
                <DetailRecommendationList data="events" recommendedList={events} referenceproduct={detail}
                                          dispatch={this.props.dispatch}/>
              </Col>
            </Row>
          }
          </Grid>
        </div>
      );
    }

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Detail);


export class SidebarTiles extends Component {
  resizeImage(url, height, width) {
    if (url == null) {
      return "";
    }
    if (url != null && typeof url == 'object') {
      url = url[0];
    }
    var filter = 'h_' + height + ',w_' + width + '/';
    var str = url;

    var index = str.indexOf("upload/") + 7;
    var rest = str.substr(0, index) + filter + str.substr(index);
    return rest;
  }

  componentDidMount() {
    var input = this.props.data.loc.coordinates;
    var refprod = this.props.referenceproduct;
    var inMeters = "";
    if (refprod != undefined && refprod.loc != undefined && refprod.loc.coordinates[1]) {
      inMeters = geolib.getDistance(
        {latitude: input[1], longitude: input[0]},
        {latitude: refprod.loc.coordinates[1], longitude: refprod.loc.coordinates[0]}, function () {
        }
      );
    }

    var kms = inMeters / 1000;
    this.setState({distance: kms})
  }

  componentWillReceiveProps(newprops) {
    if (newprops != undefined && newprops.data != undefined && newprops.data.loc != undefined && newprops.data.loc.coordinates != undefined) {
      var input = newprops.data.loc.coordinates;
      var refprod = newprops.referenceproduct;
      var inMeters = "";
      if (refprod != undefined && refprod.loc != undefined && refprod.loc.coordinates[1] != undefined) {
        inMeters = geolib.getDistance(
          {latitude: input[1], longitude: input[0]},
          {latitude: refprod.loc.coordinates[1], longitude: refprod.loc.coordinates[0]}, function () {
          }
        );
      }
      var kms = inMeters / 1000;
      this.setState({distance: kms})
    }
  }

  handleClick(data, fn, st) {
    var placeid = data.props.data._id;
    var category = "products";
    data.props.dispatch(push('/detail/id:' + placeid + "/category:" + category));
  }

  render() {
    var ty = this;
    var current = this.props.data;
        const styles = require('./Detail.scss');
    var distance = (this.state != null && this.state.distance != undefined) ? this.state.distance + " kms" : "";
    return (
      <div>
        <Row>
          <label>{current.name} </label>
        </Row>
        <Row>
          <Col xs={12} md={7}>
            <div className={styles.extraWidth}>
              <Image className={styles.parentWidth} src={current.image[0]} alt="150x100"
                     onClick={this.handleClick.bind(this, ty)}>
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
    var tab = this.props.data;
    var rows = [];
    var that = this;
    {
      this.props && this.props.recommendedList && this.props.recommendedList.map(function (place) {
        rows.push(<DetailRecommendations recommended={place} key={place._id + "detail"} category={tab}
                                         referenceproduct={that.props.referenceproduct}
                                         dispatch={that.props.dispatch}/>);
      })
    }
    return (
      <Row style={{padding: "4px"}}>
        {rows}
      </Row>
    );
  }
}

export class DetailRecommendations extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.product = props.recommended;
    if (props.recommended == undefined) {
      this.state.product = {};
      this.state.image = [];
      this.state.image[0] = 'empty';
      this.state.name = "";
    }
  }

  handleClick(data, fn, st) {
    var placeid = data.props.recommended._id;
    var category = data.props.category;
    data.props.dispatch(push('/detail/id:' + placeid + "/category:" + category));
  }

  resizeImage(url, height, width) {
    var filter = 'h_' + height + ',w_' + width + '/';
    var str = url;
    var index = str.indexOf("upload/") + 7;
    var rest = str.substr(0, index) + filter + str.substr(index);
    return rest;
  }

  componentWillReceiveProps(newprops) {
    var input = newprops.data;
    var res = newprops.referenceproduct;
    var inMeters = geolib.getDistance(
      {latitude: 51.5103, longitude: 7.49347},
      {latitude: "51° 31' N", longitude: "7° 28' E"}
    );
    var kms = inMeters / 1000;
    this.setState({distance: kms})
    // if(newprops.detail.getProductsResult!= undefined)
    // this.setState({'dependencies':newprops.detail.getProductsResult});

  }

  componentDidMount() {
    //var input = this.props.referenceproduct;
    var res = this.props.referenceproduct;
    var inMeters = geolib.getDistance(
      {latitude: 51.5103, longitude: 7.49347},
      {latitude: "51° 31' N", longitude: "7° 28' E"}
    );
    var kms = inMeters / 1000;
    this.setState({distance: kms})
    // if(newprops.detail.getProductsResult!= undefined)
    // this.setState({'dependencies':newprops.detail.getProductsResult});

  }

  render() {
    var product = this.state.product;
    var ty = this;
        const styles = require('./Detail.scss');
    var prodimage = product.image != undefined ? product.image[0] : product.assets.display;
    var imagesrc = this.resizeImage(prodimage, 100, 100);
    return (
      <div className="recommendedTile">
      <div className={styles.ribbon}>-50%</div>
        <Row style={{padding: '2px'}} onClick={this.handleClick.bind(this, ty)}>
          <Col xs={4} md={3}>
          <div className={styles.extraWidth}>
            <img className={styles.parentWidth} src={imagesrc}></img>
          </div>
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

