import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IndexLink, Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Helmet from 'react-helmet';
import { isLoaded as isInfoLoaded, load as loadInfo } from '../../redux/modules/info';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from '../../redux/modules/auth';
import { load as load, isLoaded } from '../../redux/modules/products';
import { InfoBar, Badge } from '../../components';
import * as detailActions from '../../redux/modules/detail';
import { routeActions, push } from 'react-router-redux';
import config from '../../config';
import { asyncConnect } from 'redux-async-connect';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'react-material-icons/icons/action/shopping-cart';

injectTapEventPlugin();

const AppbarStyles = () => getMuiTheme({
  palette: {
    primary1Color: '#457DBB',
     textColor: '#313131',
   // primary2Color:"#2173B3",
   // primary3Color:"#A9D2EB",
    accent1Color:"#ED2B2B",
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

    if (!isInfoLoaded(getState())) {
//      promises.push(dispatch(loadFooter()));
    }
    if (!isAuthLoaded(getState())) {
    //  promises.push(dispatch(loadAuth()));
    }

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
   var nexturl = param.currentTarget.attributes["data-url"].value;
    this.props.pushState(nexturl);
}

componentDidMount()
{
  this.setState({'document':[1]});//to enable snowing
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
   _handleAccountMenu(e){
        console.log(e.target);
    }

    getSeoContents()
    {
     var product = this.props.detail.detail;
            var seo ={};
     if( product)
     {

seo.title =product.name+" tourism "+ product.name+" resorts "+product.name+" hotels "+ product.name +" trip deals "+ product.city+ " cheap travels " + product.state +" budget tours";
seo.meta ={};
var metaArray =[];
var met = {};
met.name ="description";
met.content=product.description;
metaArray.push(met);
seo.meta  = metaArray;
     }
     else
     {
            //get State
seo.title ="";
seo.meta ={};
var metaArray =[];
var met = {};
met.name ="";
met.content="";
metaArray.push(met);
seo.meta  = metaArray;
     }
      return seo;
    }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    var pageContents = this.getSeoContents();
    if(pageContents == undefined )
    {
        pageContents ={};
        pageContents.title ="Livelytrips";
       var meta ={};

        meta.name ="Localtrips";
        meta.content ="joo";
        var st =[];
        st.push(meta);
      pageContents.meta=st;

    }
    var seoitems = {};
     var cartcount =0;
     var isAdmin=false;
          var isEditAllowed = false;
          if (this.props.user != undefined) {
            isAdmin = this.props.user.role=="admin";
     isEditAllowed = this.props.user.role=="dataoperator";
          }
     var isAdminTabAllowed = isAdmin || isEditAllowed;
    if(this.props.appstate!= null && this.props.appstate.products!= null && this.props.appstate.products.products!= null)
    {
      seoitems = this.props.appstate.products.products;
    }
    if(this.props.appstate!= null && this.props.appstate.cart!= null && this.props.appstate.cart.items!= null)
  cartcount = this.props.appstate.cart.items.length;
    const {user} = this.props;
    const styles = require('./App.scss');
        var userdataloaded=[];
    var logintext ="Login";
    if(this!= undefined && this.props!= undefined && this.props.user!= null )
    {
      if(this.props.user.name!= null)
      {
              logintext = this.props.user.name;
            userdataloaded[0]=true;
      }

      else if(this.props.user._id!= null)
      {
        logintext = this.props.user._id;
                userdataloaded[0]=true;
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

          <Navbar.Collapse>
           <Nav navbar pullRight>

              <LinkContainer to="/login">
                <NavItem eventKey={5}>{logintext}</NavItem>
              </LinkContainer>
            </Nav>
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
      <a>I Travel for.. <span className="caret"></span></a>
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

     <Link to={'/cart'} activeClassName="active">Cart<span className="new badge ltBadge">{cartcount}</span></Link>
     </li>
{userdataloaded!= undefined&& userdataloaded.length>0 && isAdminTabAllowed && userdataloaded.map(function(x)
  {
      return(
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
    <li><a href="help.html">Help</a></li>
    <li>
    {this.cartcount!= null && this.props.appstate!= null && this.props.appstate.cart!= null && this.props.appstate.cart.items.map(function(x)
               {
                   return(
                    <Badge
      badgeContent={10}
      secondary={true}
      badgeStyle={{top: 12, right: 12}}>
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
        <div className={styles.pageContainer}>
          {this.props.children}
          </div>
        </div>
      <InfoBar linkItems ={seoitems}/>
      </div>
       </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  console.log('state '+state);

  return { appstate: state, detail: state.detail }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, detailActions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
