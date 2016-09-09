import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IndexLink, Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Helmet from 'react-helmet';
import { isLoaded as isInfoLoaded, load as loadInfo , loadFooter } from '../redux/modules/info';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from '../redux/modules/auth';
import { InfoBar, Badge } from '../components';

import * as detailActions from '../redux/modules/detail';

import Footer from '../containers';

import { routeActions, push } from 'react-router-redux';
import config from '../../config';
import AppBar from 'material-ui/AppBar';
import { asyncConnect } from 'redux-async-connect';

import Grid from 'react-bootstrap/lib/Grid';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import CarouselItem from 'react-bootstrap/lib/CarouselItem';
import Carousel from 'react-bootstrap/lib/Carousel';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import Thumbnail from 'react-bootstrap/lib/Thumbnail';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {cyan500} from 'material-ui/styles/colors';
import LinearProgress from 'material-ui/LinearProgress';

import injectTapEventPlugin from 'react-tap-event-plugin';

//import SnowStorm from 'react-snowstorm';

import IconMenu from 'material-ui/IconMenu/IconMenu';
import MenuItem from 'material-ui/MenuItem/MenuItem';

import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';


import DeleteIcon from 'react-material-icons/icons/action/shopping-cart';

import FlatButton from 'material-ui/FlatButton';



injectTapEventPlugin();

const AppbarStyles = () => getMuiTheme({
  palette: {
    primary1Color: '#3c948b',
     textColor: '#313131',
   // primary2Color:"#2173B3",
   // primary3Color:"#A9D2EB",
    accent1Color:"#F44336",
   // accent2Color:"#ED2B2B",
   // accent3Color:"#F58C8C"
  }
});





@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

    if (!isInfoLoaded(getState())) {
//      promises.push(dispatch(loadFooter()));
    }
    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }

    return Promise.all(promises);
  }
}])
@connect(
  state => ({user: state.auth.user}),
  {logout, pushState: push})
export default class App extends Component {
  
 constructor(props) {
    super(props);
    this.state = {
      value: 3,
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

  handleTouch(param)
  {
    ;
   var nexturl = param.currentTarget.attributes["data-url"].value;
    this.props.pushState(nexturl);
}

componentDidMount()
{
 //  this.setState({'document':[1]});//to enable snowing
}

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState('/loginSuccess');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }
  }
   _handleAccountMenu(e){
        console.log(e.target);
    }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    debugger;
     var cartcount ;
    if(this.props.appstate!= null && this.props.appstate.cart!= null && this.props.appstate.cart.items!= null)
  cartcount = this.props.appstate.cart.items.length;
    const {user} = this.props;
    const styles = require('./App.scss');
     var buttonStyle = {
    backgroundColor: 'transparent',
    color: 'white'
  };

    return (
      <MuiThemeProvider muiTheme={AppbarStyles()}>
      <div className={styles.app}>
        <Helmet {...config.app.head}/>
 <div>
 

            </div>
        <Navbar fixedTop className={styles.insightsBar} id="fxd">
          <Navbar.Header>
            <Navbar.Brand>
              <IndexLink to="/" activeStyle={{color: '#343434'}}>
                <div className={styles.brand}/>
                <span>{config.app.title}</span>
              </IndexLink>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>

          <Navbar.Collapse eventKey={0}>
           
          </Navbar.Collapse>
        </Navbar>
        
<div>
         
      </div>
     <div>
     <Row>
     <Col md={3}>
     </Col>
     <Col md={9} className="mininav">
<nav className="minnav">
  <ul>
    <li> 
    <Link to={'/products/'} activeClassName="active">Home</Link>
    </li>
    <li>
      <a href="products.html">I Travel for.. <span class="caret"></span></a>
      <div>
        <ul>
          <li>
              <Link to={'/categories:packages/searchtype:category/search:Beach'} activeClassName="active">Sight Seeing</Link>
              </li>
               <li>
              <Link to={'/products/'} activeClassName="active">Adventure</Link>
              </li>
               <li>
              <Link to={'/products/'} activeClassName="active">Culture</Link>
              </li>
               <li>
              <Link to={'/products/'} activeClassName="active">Trekking</Link>
              </li>
              <li>
              <Link to={'/categories:packages/searchtype:category/search:Honeymoon'} activeClassName="active">Honeymoon</Link>
              </li>
        </ul>
      </div>
    </li>
    <li> <Link to={'/products/'} activeClassName="active">Bookings</Link></li>
     <li>
     <div>
       <Badge />
     <Link to={'/cart'} activeClassName="active">Cart</Link>
     </div>
     </li>
     <li>cart
   
     </li>
    <li><a href="help.html">Help</a></li>
    <li>
    {this.cartcount!= null && this.props.appstate!= null && this.props.appstate.cart!= null && this.props.appstate.cart.items.map(function(x)
               {    
                   return( 
                    <Badge
      badgeContent={10}
      secondary={true}
      badgeStyle={{top: 12, right: 12}}
    >
      <IconButton tooltip="Notifications">
        <DeleteIcon />
      </IconButton>
    </Badge>
    );
                 }
  )}
    </li>
  </ul>
</nav>
     
     </Col>
     </Row>
    
     </div>
        <br />
        <br />
        <br />
        <div className={styles.appContent}>
        <div className="container">
          {this.props.children}
          </div>
        </div>
      <InfoBar />
      </div>
       </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  debugger;
  console.log('state '+state);
 
  return { appstate: state, detail: state.detail }
}

function mapDispatchToProps(dispatch) {
  debugger;
  return bindActionCreators(Object.assign({}, detailActions), dispatch)
}

//export default connect(mapStateToProps, mapDispatchToProps)(App);
