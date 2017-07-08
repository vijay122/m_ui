import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {IndexLink, Link} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import {Form, FormGroup, Button, FormControl} from 'react-bootstrap'
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Helmet from 'react-helmet';
import {isLoaded as isInfoLoaded, load as loadInfo} from '../../redux/modules/info';
import {isLoaded as isAuthLoaded, load as loadAuth, logout} from '../../redux/modules/auth';
import {load as load, isLoaded} from '../../redux/modules/products';
import {InfoBar, Badge} from '../../components';
import * as detailActions from '../../redux/modules/detail';
import {routeActions, push} from 'react-router-redux';
import config from '../../config';
import {asyncConnect} from 'redux-async-connect';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'react-material-icons/icons/action/shopping-cart';
import * as browserUtils from '../../utils/HtmlUtils';

injectTapEventPlugin();

const AppbarStyles = () => getMuiTheme({
  palette: {
    primary1Color: '#25C5CD',
    textColor: '#313131',
    // primary2Color:"#2173B3",
    // primary3Color:"#A9D2EB",
    accent1Color: "#ED2B2B",
    // accent2Color:"#ED2B2B",
    // accent3Color:"#F58C8C"
  }
});


@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    if (!isLoaded(getState())) {
      return dispatch(load());
    }
  }
}])


@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

 //   if (!isInfoLoaded(getState())) {
//      promises.push(dispatch(loadFooter()));
 //   }
 //   if (!isAuthLoaded(getState())) {
      //  promises.push(dispatch(loadAuth()));
 //   }

    return Promise.all(promises);
  }
}])
@connect(
  state => ({user: state.auth.user}),
  {logout, pushState: push})
export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 3,
      searchItem:'stays'
    };
  }

  handleChange = (event, index, value) => this.setState({value});

  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  handleTouch(param) {
    var nexturl = param.currentTarget.attributes["data-url"].value;
    this.props.pushState(nexturl);
  }

  componentDidMount() {
    this.setState({'document': [1]});//to enable snowing
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState('/');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }
  }

  _handleAccountMenu(e) {
    console.log(e.target);
  }

  getSeoContents() {
    var product = this.props.detail.detail;
    var seo = {};
    if (product) {

      seo.title = product.name + " tourism " + product.name + " resorts " + product.name + " hotels " + product.name + " trip deals " + product.city + " cheap travels " + product.state + " budget tours";
      seo.meta = {};
      var metaArray = [];
      var met = {};
      met.name = "description";
      met.content = product.description;
      metaArray.push(met);
      seo.meta = metaArray;
    }
    else {
      //get State
      seo.title = "";
      seo.meta = {};
      var metaArray = [];
      var met = {};
      met.name = "";
      met.content = "";
      metaArray.push(met);
      seo.meta = metaArray;
    }
    return seo;
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  handleSearchSelection(searchItem,data,x)
  {
    this.setState({searchItem});
  }

  render() {
   var logoImage = require('./sunny.svg');
        var styles = require('./App.scss');
           var isMobile = browserUtils.isMobile();
        var hideClassForMobile = isMobile?"hide":"block";
    var tempArr =[];
    tempArr.push("hi");
    var pageContents = this.getSeoContents();
    if (pageContents == undefined) {
      pageContents = {};
      pageContents.title = "Livelytrips";
      var meta = {};

      meta.name = "Localtrips";
      meta.content = "joo";
      var st = [];
      st.push(meta);
      pageContents.meta = st;

    }
    var seoitems = {};
    var cartcount = 0;
    var isAdmin = false;
    var isEditAllowed = false;
    if (this.props.user != undefined) {
      isAdmin = this.props.user.role == "admin";
      isEditAllowed = this.props.user.role == "dataoperator";
    }
    var isAdminTabAllowed = isAdmin || isEditAllowed;
    if (this.props.appstate != null && this.props.appstate.products != null && this.props.appstate.products.products != null) {
      seoitems = this.props.appstate.products.products;
    }
    if (this.props.appstate != null && this.props.appstate.cart != null && this.props.appstate.cart.items != null)
      cartcount = this.props.appstate.cart.items.length;
    const {user} = this.props;

    var userdataloaded = [];
    var logintext = "Login";
    if (this != undefined && this.props != undefined && this.props.user != null) {
      if (this.props.user.name != null) {
        logintext = this.props.user.name;
        userdataloaded[0] = true;
      }

      else if (this.props.user._id != null) {
        logintext = this.props.user._id;
        userdataloaded[0] = true;
      }
    }

    var buttonStyle = {
      backgroundColor: 'transparent',
      color: 'white'
    };

    return (
      <MuiThemeProvider muiTheme={AppbarStyles()}>
        <div className={styles.app}>
          <Helmet
            title={pageContents.title}
            meta={pageContents.meta}
          />
          <div>
          </div>
          <div className={styles.fixed}>
          <div className={styles.smalltopbar}><a href="http://www.livelytrips.com">livelytrips</a>
          { /* <Link className={styles.loginButton} to="/login">login</Link> */} 
          {1!=1 &&
          (<div className={styles.tophiddenbar}>
                     <Row>
              <Col md={3}>
              </Col>
              <Col className={hideClassForMobile} md={6}>
              <div className={styles.searchContainer}>
               <Row>
              <Col md={3} className={styles.fullWidth} className={styles.noPadding}>
              <div className="dropdown">
                    <button className="dropbtn">Stays</button>
                    <div className="dropdown-content">
                        <a onClick={this.handleSearchSelection.bind('packages',this)}>Tours</a>
                        <a onClick={this.handleSearchSelection.bind('hotels',this)}>Hotels</a>
                        <a onClick={this.handleSearchSelection.bind('events',this)}>Events</a>
                    </div>
              </div>
              </Col>
               <Col md={9} className={styles.noPadding}> 
               <input className={styles.height54} type="text" /> 
              </Col>
              </Row>
              </div>
              </Col>
              <Col md={3}>
              
              </Col>
              </Row>
             </div>)}

          </div>
</div>
          <div>
            <Row>
              <Col md={3} className={styles.logoContainer}>
              <h2>LivelyTrips</h2>
              </Col>
              <Col md={9} className="mininav">
                <nav className="minnav">
                  <ul>
                    <li>
                      <Link to={'/products/'} activeClassName="active">Home</Link>
                    </li>
                    <li>
                      <a>I Travel for.. <span className="caret"></span></a>
                      <div>
                        <ul>
                          <li>
                            <Link to={'/categories:Package/searchOptions:searchOptions=category,sightseeing'} activeClassName="active">Sight
                              Seeing</Link>
                          </li>
                          <li>
                            <Link to={'/categories:Package/searchOptions:searchOptions=category,grouptrips'} activeClassName="active">Group Trips</Link>
                          </li>
                           <li>
                            <Link to={'/categories:Package/searchOptions:searchOptions=category,party'} activeClassName="active">Party</Link>
                          </li>
                          <li>
                            <Link to={'/categories:Package/searchOptions:searchOptions=category,honeymoon'}
                                  activeClassName="active">Honeymoon</Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li><Link to={'/about/'} activeClassName="active">About</Link></li>
					  <li><Link to={'/blog/'} activeClassName="active">Blog</Link></li>
                    <li>
                      {cartcount != null && this.props.appstate != null && this.props.appstate.cart != null && this.props.appstate.cart.items && tempArr.map(function (x) {
                          return (
                             <Link to={'/cart'} activeClassName="active">Cart<span
                        className="new badge ltBadge">{cartcount}</span></Link>
                          );
                        }
                      )}
                    </li>
                    {userdataloaded != undefined && userdataloaded.length > 0 && isAdminTabAllowed && userdataloaded.map(function (x) {
                      return (
                        <li>
                          <a>Admin <span className="caret"></span></a>
                          <div>
                            <ul>
                              <li>
                                <Link to={'/admin/'} activeClassName="active">Manage users</Link>
                              </li>
                              <li>
                                <Link to={'/upload'} activeClassName="active">Add place</Link>
                              </li>
                              <li>
                                <Link to={'/packagebuilder/'} activeClassName="active">Add package</Link>
                              </li>
                            </ul>
                          </div>
                        </li>
                      );
                    })
                    }
                    <li><Link to={'/contact/'} activeClassName="active">Contact</Link></li>
                    
                  </ul>
                </nav>

              </Col>
            </Row>

          </div>
          <br />
          <br />
          <br />
          <div className={styles.appContent}>
          {
            this.props.appstate.products.loaded == true
            ?
            <div className={styles.pageContainer}>
              {this.props.children}
            </div>
          :
            <div className={styles.preloader}>
          <img src={logoImage}/>
          </div>
        }
          </div>
          <InfoBar linkItems={seoitems}/>
{/* this.props &&  this.props.appstate!= undefined && this.props.appstate.products!= undefined && this.props.appstate.products.loaded == true?<div />:<div className={styles.fullOverlay}></div> */}
          
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  console.log('state ' + state);
  return {appstate: state, detail: state.detail}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, detailActions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
