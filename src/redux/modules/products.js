const LOAD = 'redux-example/widgets/LOAD';
const LOAD_SUCCESS = 'redux-example/widgets/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/widgets/LOAD_FAIL';
const EDIT_START = 'redux-example/widgets/EDIT_START';
const EDIT_STOP = 'redux-example/widgets/EDIT_STOP';
const SAVE = 'redux-example/widgets/SAVE';
const SAVE_SUCCESS = 'redux-example/widgets/SAVE_SUCCESS';
const SAVE_FAIL = 'redux-example/widgets/SAVE_FAIL';
import {List, Map} from 'immutable';

import  'isomorphic-fetch';
 import config from '../../config';
const initialState = {
  count: 0
};


export default function reducer(state = initialState, action = {}) {
 switch (action.type) {
    case 'LOAD':
      return {
        ...state,
        loading: true
      };
       case 'DETAIL':
      return {
        ...state,
        loading: true,
        loaded: true,
        current: action.result.id,
        detail:typeof state.products== (null|| "undefined")?initialState: state.products.get(action.result.id),
        error: null
      };
       case 'CATEGORIES':
      return {
        ...state,
        loading: true,
        loaded: true,
        categorysearch: action.result,
         error: null
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };
      case 'SET_ENTRIES':
      const item = action.result.places;
      return {
        ...state,
         loading: false,
        loaded: true,
        products: item,
          offers: action.result.offers,
          seo:action.result.seo
      }
        case 'SET_SEARCH_RESULTS':
      const newItems = action.result;
      return {
        ...state,
         loading: false,
        loaded: true,
        searchresults: newItems
      }
         case 'SET_ALL_ENTRIES':
         {
      const newItems1 = action.result.offers;
      return {
        ...state,
         loading: false,
        loaded: true,
        hotels: action.result.hotels,
        packages:action.result.packages,
      //  events:action.result.events,
      }
    }
       case 'ADD_TO_CART':
        console.log("added ADD");
       if( state.cart == undefined)
       {
        state.cart=[];
       }
       state.cart.push(action.result.prd);
        return {...state,
            loading: false,
        loaded: true
        }
    //  }
   //   return {...state, action.result };
    case 'REMOVE_TO_CART':
        console.log("removed ADD");
       return {
       // ...state.cart.pop()
       // ...state.cart.filter(product._id => action.result.prd._id !=== product._id)
      }
        // here is my problem
   // return setEntries(...state,action.result);

    default:
      return state;
  }
}
export function load() {
    return dispatch =>{
    fetch(config.svc+'/test', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(checkStatus)
  .then(parseJSON)
  .then(function(data) {
 /*   var Offersmap = Map(data.offers.reduce(function(previous, current) {
    previous[ current._id ] = current;
    return previous;
}, {}));
*/

var Placesmap = Map(data.places.reduce(function(previous, current) {
    previous[ current._id ] = current;
    return previous;
}, {}));
var map={};
map.places=Placesmap;
map.offers=data.packages;
map.useroffers=data.useroffers;
     dispatch({ type: 'SET_ENTRIES', result: map });
    dispatch(loadAllData("home"));
  //  console.log('request succeeded with JSON response', list)
  }).catch(function(error) {
    console.log('request failed', error);
       dispatch(loadAllData("home"));
  })
  }
}

export function search(sectionName,searchcriteria) {
  var payload={};
  payload.sectionName=sectionName;
   payload.findtable = searchcriteria.findtable;
  payload.searchby = searchcriteria.searchby;
  payload.searchvalue = searchcriteria.searchvalue;
    return dispatch =>{
    fetch(config.svc+'/getProducts', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
       body: JSON.stringify({
        payload
  })
    }).then(checkStatus)
  .then(parseJSON)
  .then(function(data) {

     dispatch({ type: 'SET_SEARCH_RESULTS', result: data });
  //  console.log('request succeeded with JSON response', list)
  }).catch(function(error) {
    console.log('request failed', error)
  })
  }
}

export function loadAllData(sectionName) {
  var payload={};
  payload.sectionName=sectionName;
    return dispatch =>{
    fetch(config.svc+'/getProducts', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
       body: JSON.stringify({
        payload
  })
    }).then(checkStatus)
  .then(parseJSON)
  .then(function(data) {

     dispatch({ type: 'SET_ALL_ENTRIES', result: data });
  //  console.log('request succeeded with JSON response', list)
  }).catch(function(error) {
    console.log('request failed', error)
  })
  }
}

export function load1() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/test') // params not used, just shown as demonstration
  };
}
export function isLoaded(globalState) {
   if(globalState!= undefined && globalState.products!= undefined && globalState.products.loaded)
   {
    return true;
   }
   else
   {
    return false;
   }
}

export function NavigateToDetail(globalState,id) {
    promise: ({store: {dispatch, getState}}) => {
    if (!globalState.products.loaded) {
      dispatch({ type: 'LOAD'});
        data.props.dispatch(push('/detail/id:'+placeid));
      return false;
    }
    else
    {
 return true;
    }
  }
}

export function viewdetail(state) {
  var s = this;
   var result = qs('id');
     var list = state.get(result);
  return (dispatch) => {
    dispatch({ // call dispatch with promise action
      type: 'DETAIL',
      payload: {
        promise: new Promise((resolve, reject) => {
         dispatch({ type: 'DETAIL', result: {id:list}})
         .then(response => response.json())
            .then(json => {

            //  dispatch(updatePath('/'));
             // resolve(json);
            })
            .catch(error => {
             // reject(error);
            });
        })
      }
    });
  };
}

export function AddToCart(fn) {
   //return state.set('current', list);

    return dispatch =>{
   //return state.set('current', list);
   return dispatch({type:'ADD_TO_CART', result:{prd:fn}});
   }
   }
  //    promise: ({store: {dispatch, getState}}) => {
//return  dispatch({ type: 'DETAIL', result: {}});
export function viewdetail1(state) {
  var s = this;
   var result = qs('id');

  return dispatch =>{
  var list = state.get(result);
   //return state.set('current', list);
    return dispatch({ type: 'DETAIL', result: {id:list}});
   }
  //    promise: ({store: {dispatch, getState}}) => {
//return  dispatch({ type: 'DETAIL', result: {}});
}


export function setEntries(state, entries) {
  const list = List(entries);
  return state.set('entries', list);
}


/*


export function loadProducts(userData) {
  return dispatch =>
    fetch('localhost:8000/getProducts', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
       email: ''//userData.email'',
       // password: userData.password,
      }),
    })
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        console.log(response);
        dispatch(setEntries(response));
      } else {
        const error = new Error(response.statusText);
        error.response = response;
        dispatch(loginError(error));
        throw error;
      }
    })
    .catch(error => { console.log('request failed', error); });
}
*/

function qs(key) {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('/') + 1).split('/');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split(':');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars[key];
}

function byId(state = {}, action) {
  switch (action.type) {
    case 'RECEIVE_PRODUCTS':
      return Object.assign({},
        state,
        action.products.reduce((obj, product) => {
          obj[product.id] = product
          return obj
        }, {})
      )
    default:
      const { productId } = action
      if (productId) {
        return Object.assign({}, state, {
          [productId]: products(state[productId], action)
        })
      }
      return state
  }
}

 function getProduct(state, id) {
  return state.byId[id]
}

function parseJSON(response) {
  return response.json()
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

