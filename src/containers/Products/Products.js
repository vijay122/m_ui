import React, {Component} from 'react';
import {SquareCard, SearchBar, CardsContainer} from '../../components';
import Helmet from 'react-helmet';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import CarouselItem from 'react-bootstrap/lib/CarouselItem';
import Carousel from 'react-bootstrap/lib/Carousel';
import Thumbnail from 'react-bootstrap/lib/Thumbnail';
import * as productActions from '../../redux/modules/products';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import {bindActionCreators} from 'redux';
import {push} from 'react-router-redux';
import {ReactRpg} from '@vijay122/react-tiles';
import LazyLoad from 'react-lazyload';

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
    this.state = {
      suggestionlist: this.props.products.packages
    };
  }

  handleToggleKitten(data, fn, st) {
   // var placeid = data.props.data._id;
    var params =[];
    params.push('category');
    params.push(fn);
    data.props.dispatch(push('/categories:Package/searchOptions:searchOptions=' + params));
  }

  setSelectedFilter(e, v, s) {
    if (e == 'events') {
      this.setState({'suggestionlist': this.props.products.events});
    }
    else if (e == 'hotels') {
      this.setState({'suggestionlist': this.props.products.hotels});
    }
    else if (e == 'packages') {
      this.setState({'suggestionlist': this.props.products.packages});
    }
  }

  categorySearch()
  {
    alert("searched");
  }

  mapAppScripts(cateroryArray)
  {
    var rry=[];
    if(cateroryArray && cateroryArray.CategoryCount)
    {
    for(var i=0;i<cateroryArray.CategoryCount.length;i++)
    {
      rry.push(this.mapCategory(cateroryArray.CategoryCount[i]));
    }
  }
    return rry;
  }
  mapCategory(obj)
  {
    var self = this;
    if(obj._id =="honeymoon")
return {
    url: "http://www.easyweddings.com.au/articles/wp-content/uploads/sites/5/2014/01/178561859-400x400.jpg",
    text:obj._id+'('+ obj.count+')',
    category:obj._id,
    clickHandler: (url, obj) => {
      console.log("inside category click "+obj)
      self.handleToggleKitten(this,url,self);
    }
  }
  if(obj._id =="sightseeing")
return {
    url: "http://www.norgimatravels.com/wp-content/uploads/2014/06/sightseeing-nepal-400x400.jpg",
    text:obj._id+'('+ obj.count+')',
     category:obj._id,
    clickHandler: (url, obj) => {
      console.log("inside category click "+obj);
      self.handleToggleKitten(this,url,self);
    }
  }
   if(obj._id =="grouptrips")
return {
    url: "https://marutistoragenew.blob.core.windows.net/nexaexperience/rp/img/footer1-1march.png",
    text:obj._id+'('+ obj.count+')',
     category:obj._id,
    clickHandler: (url, obj) => {
      console.log("inside category click "+obj);
      self.handleToggleKitten(this,url,self);
    }
  }
  if(obj._id =="party")
return {
    url: "http://i1.wp.com/discovercorps.com/wp-content/uploads/2013/11/cuba-our-trips-400x400.jpg?fit=400%2C400",
    text:obj._id+'('+ obj.count+')',
     category:obj._id,
    clickHandler: (url, obj) => {
      console.log("inside category click "+obj);
      self.handleToggleKitten(this,url,self);
    }
  }
  }

  render() {

    if (this.props.products.loaded) {
      var that = this;
//  const { productList } = this.props.products.products;
      var view = this.state != null ? this.state.view : "";
      var totalproducts = this.props.productsCount;
      var offer = this.props.products.offers;
      var productlist = this.props.products.products;
          var appscripts = this.props.products.appscripts;
          var sectionscript={};
          if(appscripts!= undefined && appscripts[0])
          {
            appscripts = appscripts[0];
            sectionscript = appscripts.SectionScripts;
          }
      var eventlist = this.props.products.events;
      var hotellist = this.props.products.hotels;
      var packagelist = this.props.products.packages;
      var hotels = this.props.products.hotels;
      var packagescript =sectionscript? sectionscript.packages:"";
      var hotelscript = sectionscript? sectionscript.hotels:"";
      var eventscript = sectionscript? sectionscript.events:"";
      // offer = this.props.products.products[0];
      const styles = require('./Home.scss');
      // require the logo image both from client and server
                  //  <CategoryGallery galleryitems={images} columns={[2, 2, 2]} padding={2}/>
      const logoImage = require('./logo.png');

var images = [
  {
    url: "http://tripconnoisseurs.com/wp-content/uploads/2016/08/Honeymoon.jpg",
    text:"honeymoon",
    clickHandler: (url, obj) => {
      console.log("inside category click "+obj)
    }
  },
  {
    url: "http://www.easternwatersports.com/wp-content/uploads/2016/04/grouptrip-300x300.jpg?x94867",
    text:"treks",
    clickHandler: (url, obj) => {
      console.log("inside category click "+obj)
    }
  },
  {
    text:"grouptrips",
    url: "https://static2.tripoto.com/media/filter/t/img/101328/TripDocument/1474279330_1474279325380.jpg",
    clickHandler: (url, obj) => {
      console.log("inside category click "+obj)
    }
  },
  {
    text:"solotrips",
    url: "http://travelsourceindia.in/wp-content/uploads/2016/06/family-ties-300x300.jpg",
    clickHandler: (url, obj) => {
      console.log("inside category click "+obj)
    }
  }
];

images =this.mapAppScripts(appscripts);


      return (
        <div className={styles.home}>
          <Helmet title="Home"/>
          <Row>
          <Col xs={12} md={8}>
          </Col>
           <Col xs={12} md={4} className={styles.centerText}>
          <h3>Active Trips</h3>
          </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={12} md={8}>
              <HomeSlider data={packagelist}/>
            </Col>
            <Col xs={12} md={4}>
              <ReactRpg imagesArray={images} columns={[2, 2, 2]} padding={2} />
            </Col>
          </Row>
          <div>
            <Row>
              <h3> Find the best livelytrips stays and tours around the world</h3>
            </Row>
            <Row className="show-grid">
              <SearchBar dispatch={that.props.dispatch}/>
            </Row>
          </div>
          <div>
            <Row>
              <h3>We are growing faster with more than {totalproducts} places. Below are recently added.</h3>
            </Row>
            <Row className="show-grid">
              {
                productlist && productlist.map(function (product) {
                  return <SquareCard data={product} key={product.id} dispatch={that.props.dispatch} category="places"/>;
                })}
            </Row>
          </div>
          <Row>
            <hr />
          </Row>

          <CardsContainer packagelist={packagelist} type="Popular Packages" dispatch={that.props.dispatch}
                        promotionMessage={packagescript}  category="packages"/>
          <br />
          {1==1 &&
            <div>
          <CardsContainer packagelist={hotellist} type="Popular Hotels" dispatch={that.props.dispatch}
                         promotionMessage={hotelscript}   category="hotels"/>
          <br />
          <CardsContainer packagelist={eventlist} type="Popular Events" dispatch={that.props.dispatch}
                         promotionMessage={eventscript}   category="events"/>
          <br />
          </div>
        }
        </div>
      );
    }
    else {

      return (<div />);
    }
  }

}

function mapStateToProps(state) {
  console.log('state ' + state);
  var productsCount = state.products != undefined ? state.products.productsCount : 0;
  var packagesCount = state.products != undefined ? state.products.packagesCount : 0;
  return {products: state.products, productsCount: productsCount, packagesCount: packagesCount}
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
    if (this.props.data != null && this.props.data.image != null) {
      image = this.props.data.image[0];
    }
    else {
      image = "";
    }
    if (this.props.data) {
      const {detail} = this.props.data;
      const {showKitten} = this.state;
      return (
        <Col xs={6} md={4}>
          <Thumbnail className={styles.thumbNoBorder} style={{height: 400 + 'px', width: 300 + 'px'}} src={image}
                     alt="242x200">
          </Thumbnail>
        </Col>
      )
    }
    else {
      return (
        <Col xs={6} md={4}>
          <Thumbnail className={styles.thumbNoBorder} style={{height: 400 + 'px', width: 300 + 'px'}}
                     src="http://placehold.it/400x300" alt="242x200">
          </Thumbnail>
        </Col>
      )
    }

  }

  state = {
    showKitten: false
  }

  handleToggleKitten(data, fn, st) {
    var placeid = data.props.data._id;
    data.props.dispatch(push('/detail/id:' + placeid));
  }
}

export class HomeSlider extends Component {

  constructor(props) {
    super(props);

  }

  render() {
      const styles = require('./Home.scss');
    var that = this;
    var image = "";


    var list = this.props.data;
    return (
      <Carousel>
        {list && list.map(function (scrolloffer) {
            var img = "";
            if (scrolloffer != undefined && scrolloffer.assets != undefined && scrolloffer.assets.display != undefined) {
              img = scrolloffer.assets.display;
            }
            var priceper ="only";
            if(scrolloffer.category =="honeymoon")
            {
              priceper = "only";
            }
            return (
              <CarouselItem>
              <div className={styles.infomessage}>
              <p> Rs:{scrolloffer.price} <sub>{priceper}</sub></p>
              <p>{scrolloffer.noofdays}Days&{scrolloffer.noofnights}Nights</p>
              <p>{scrolloffer.state}</p>
              </div>
   <LazyLoad once > 
                <img src={that.resizeImage(img, 450, 900)}/>
                  </LazyLoad>
                <div className="carousel-caption">
                  <h1>{scrolloffer.city}</h1>
                  <h2>{scrolloffer.title} {scrolloffer.type}</h2>
                </div>
              </CarouselItem>
            )
          }
        )}

      </Carousel>
    )
  }

  resizeImage(url, height, width) {
   var filter = 'c_fill,q_60,e_improve,' + 'h_' + height + ',' + 'w_' + width + '/';
    var str = url != undefined ? url : "";
    var index = str.indexOf("upload/") + 7;
    var rest = str.substr(0, index) + filter + str.substr(index);
    return rest;
  }
}




