import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {isLoaded as isAuthLoaded, load as loadAuth} from './redux/modules/auth';
// import { viewdetail as detail, refreshSection as refresh} from './redux/modules/products';
import { qs } from './utils/validation';
import {
  App,
  Categories,
  Chat,
  Home,
  // Widgets,
  About,
  Login,
  LoginSuccess,
  Survey,
  Products,
  PlaceUploader,
  Detail,
  Cart,
  Votings,
  NotFound,
  PackageBuilder,
  MyProfile,
  Admin,
} from './containers';

const querystring = require('querystring');

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const {auth: {user}} = store.getState();
      if (!user) {
        replace('/');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  function loadDetails(nextState, replace) {
    const prodid = qs('id');
    const category = qs('category');
    const Appstate = store.getState();
    const detailproduct = Appstate.products[category].get(prodid);
    if (detailproduct == (undefined || null)) {

    }
    store.dispatch({type: 'SET_DETAIL', result: detailproduct});
    // if(isProductExistInStore(prodid,Appstate,category))
    {
      //  showDetailsPage(prodid,category);
    }
    //  refresh(prodid,category);
    // store.dispatch({type:'DETAIL', result:{id:prodid,category:category}});
    replace();
    // }
  }

  function showDetailsPage(id, category) {
    store.dispatch({type: 'SET_DETAIL', result: detailproduct});
  }


  function loadCategories(nextState, replace) {
    const category = qs('categories');
    const searchtype = qs('searchtype');
    const value = qs('search');
    const parsedresult = querystring.parse(value);
    store.dispatch({
      type: 'CATEGORIES', result: {
        searchon: category,
        searchby: searchtype,
        search: parsedresult
      }
    });
  }

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Products}/>

      { /* Routes requiring login */ }
      <Route onEnter={requireLogin}>
        <Route path="chat" component={Chat}/>
        <Route path="loginSuccess" component={LoginSuccess}/>
      </Route>

      { /* Routes */ }
      <Route path="/about" component={About}/>
      <Route path="/categories:id/searchtype:id/search:id" component={Categories} onEnter={loadCategories}/>
      <Route path="/login" component={Login}/>
      <Route path="/survey" component={Survey}/>
      <Route path="/contests" component={Votings}/>
      <Route path="/widgets" component={Home}/>
      <Route path="/products" component={Products}/>
      <Route path="/upload" component={PlaceUploader}/>
      <Route path="/detail/id:productid/category:category" component={Detail} onEnter={loadDetails}/>
      <Route path="/cart" component={Cart}/>
      <Route path="/packagebuilder" component={PackageBuilder}/>
      <Route path="/admin" component={Admin}/>
      <Route path="/myprofile" component={MyProfile}/>
      //onEnter={loadDetails}

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404}/>
    </Route>
  );
};

const onRouteEnter = async(nextState, replaceState, done) => {
  try {
    await fetchComponentData({
      dispatch: store.dispatch,
      components: nextState.routes.map(route => route.component),
      params: Object.assign({}, nextState.params),
      location: nextState.location,
      deferred: false,
    });
  } catch (err) {
    if (!__PROD__) {
      // window.console.log(err);
    }
  }
  done();

  try {
    fetchComponentData({
      dispatch: store.dispatch,
      components: nextState.routes.map(route => route.component),
      params: Object.assign({}, nextState.params),
      location: nextState.location,
    });
  } catch (err) {
    if (!__PROD__) {
      window.console.log(err);
    }
  }
};
