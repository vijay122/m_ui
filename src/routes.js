import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {isLoaded as isAuthLoaded, load as loadAuth} from './redux/modules/auth';
 import { viewdetail as detail, refreshSection as refresh} from './redux/modules/products';
import { isProductExistInStore} from './redux/modules/blog';
import {qs} from './utils/validation';
import {
  App,
  Categories,
  Chat,
	Blog,
	BlogDetail,
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
  AddBlogPost,
  Admin,
  JobPostings,
  DynamicUpload,
} from './containers';
import fetch from 'better-fetch';

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
	function loadBlogDetails(nextState, replace) {
		const prodid = qs('post');
		const Appstate = store.getState();
		let detailproduct = {};
		if(Appstate!= undefined && Appstate.blog!= undefined && Appstate.blog)
		{
			detailproduct = isProductExistInStore(Appstate,prodid);
		}
		if(detailproduct && detailproduct.title!= undefined)
		{
			store.dispatch({type: 'SET_CURRENT_POST', result: detailproduct});
		}
		//  refresh(prodid,category);
		// store.dispatch({type:'DETAIL', result:{id:prodid,category:category}});
		replace();
		// }
	}
  function loadDetails(nextState, replace) {
    const prodid = qs('id');
    const category = qs('category');
    const Appstate = store.getState();
    let detailproduct = {};
    if(Appstate!= undefined && Appstate.products!= undefined && Appstate.products[category]!= undefined)
    {
        detailproduct = Appstate.products[category].get(prodid);
    }
   // store.dispatch({type: 'SET_DETAIL', result: detailproduct});
     if(detailproduct && detailproduct.name!= undefined)
    {
        store.dispatch({type: 'SET_DETAIL', result: detailproduct});
    }
    else
    {
      refresh(prodid,category);
    }
    //  refresh(prodid,category);
    // store.dispatch({type:'DETAIL', result:{id:prodid,category:category}});
    replace();
    // }
  }

  function showDetailsPage(id, category) {
    store.dispatch({type: 'SET_DETAIL', result: detailproduct});
  }

/*
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
  */

   function loadCategories(nextState, replace) {
    const category = qs('categories');
    const searchtype = qs('searchtype');
    const value = qs('searchOptions');
    const parsedresult = querystring.parse(value);
    store.dispatch({
      type: 'CATEGORIES', result: {
        searchon: category,
        searchOptions: value,
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
      <Route path="/newblog" component={AddBlogPost}/>
		<Route path="/posts/:x" component={Blog}/>
		<Route path="/blog/post:id" component={BlogDetail} onEnter={loadBlogDetails}/>
      <Route path="/categories:id/searchtype:id/search:id" component={Categories} onEnter={loadCategories}/>
       <Route path="/categories:id/search:searchOptions" component={Categories} onEnter={loadCategories}/>
      <Route path="/login" component={Login}/>
      <Route path="/contact" component={Survey}/>
        <Route path="/join-us" component={JobPostings}/>
      <Route path="/contests" component={Votings}/>
      <Route path="/products" component={Products}/>
      <Route path="/upload" component={PlaceUploader}/>
      <Route path="/detail/id:productid/category:category" component={Detail} onEnter={loadDetails}/>
      <Route path="/cart" component={Cart}/>
      <Route path="/packagebuilder" component={PackageBuilder}/>
      <Route path="/admin" component={Admin}/>
      <Route path="/myprofile" component={MyProfile}/>
      <Route path="/dynamicUpload" component={DynamicUpload}/>
      //onEnter={loadDetails}

      { /* Catch all route */ }

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
