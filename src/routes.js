import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from './redux/modules/auth';
import { viewdetail as detail} from './redux/modules/products';
import {
    App,
    Categories,
    Chat,
    Home,
    Widgets,
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
  } from './containers';

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
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

   const loadDetails3 = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replace('/');
      }
      cb();
    }
    var prodid=qs('id');
      store.dispatch({type:'DETAIL', result:{id:prodid}});
      return true;
  };

  function loadDetails(nextState, replace) {
     var prodid=qs('id');
     store.dispatch({type:'DETAIL', result:{id:prodid}});
    replace();
 // }
}

function loadCategories(nextState, replace)
{
  debugger;
   var category=qs('categories');
   var searchtype = qs('searchtype');
   var value = qs('search');
   store.dispatch({type:'CATEGORIES', result:{
    SEARCHBY:category,
    VALUE:value
   }});
}

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home}/>

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
      <Route path="/detail/id:productid" component={Detail}  onEnter={loadDetails} />
       <Route path="/cart" component={Cart}/>
        <Route path="/packagebuilder" component={PackageBuilder}/>
      //onEnter={loadDetails} 

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};

const onRouteEnter = async (nextState, replaceState, done) => {
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
        ;
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

  function qs(key) {
    var vars = [], hash;
     var hashes; // = window.location.href.slice(window.location.href.indexOf('/') + 1).split('/');
    if( typeof window!= "undefined")
    {
      hashes = window.location.href.slice(window.location.href.indexOf('/') + 1).split('/');
     
    }
    else
    {
      hashes = 'id:57413ffe7a1d3a001111b3ec';
    }
   
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split(':');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars[key];
}
