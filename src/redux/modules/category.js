const LOAD = 'redux-example/widgets/LOAD';
const LOAD_SUCCESS = 'redux-example/widgets/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/widgets/LOAD_FAIL';
const EDIT_START = 'redux-example/widgets/EDIT_START';
const EDIT_STOP = 'redux-example/widgets/EDIT_STOP';
const SAVE = 'redux-example/widgets/SAVE';
const SAVE_SUCCESS = 'redux-example/widgets/SAVE_SUCCESS';
const SAVE_FAIL = 'redux-example/widgets/SAVE_FAIL';
import {List, Map} from 'immutable';

import config from '../../config';
var querystring = require('querystring');
//import fetch from 'better-fetch';

const initialState = {
  count: 0
};


export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'LOAD':
      return {
        ...state,
        loading: true,
        current: action.result.id,
      };
    case 'CATEGORIES':
      return {
        ...state,
        loading: true,
        loaded: true,
        categorysearch: action.result,
        error: null
      };
    case 'FETCH_CATEGORY':
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
    case 'SET_CATEGORY_RESULTS':
      ;
      const newItems = action.result;
      return {
        ...state,
        loading: false,
        loaded: true,
        getCategoryResult: newItems,
      }
    /*
     case 'ADD_TO_CART':
     console.log("added ADD");
     var cart = state.cart;
     if( cart == undefined)
     {
     cart=[];
     }
     cart.push(action.result);
     // if (state.cart.indexOf(action.result._id) !== -1) {
     //}
     return {...state,
     cart :cart }
     case 'REMOVE_TO_CART':
     console.log("removed ADD");
     return {
     // ...state.cart.pop()
     // ...state.cart.filter(product._id => action.result.prd._id !=== product._id)
     }
     */
    default:
      return state;
    // here is my problem
    // return setEntries(...state,action.result);

    //  default:
    //  return state;
  }
}
export function getProducts(searchtable, searchOptions) {
  try {
  console.log("getProducts category page called:"+JSON.stringify(searchOptions));
    var latitude;
    var longitude;
    var searchvalue = "";
    var parsed = querystring.parse(searchvalue);
    if(parsed!= undefined && parsed!="" && parsed.coordinates!=undefined)
    {
      searchvalue = parsed;
      latitude = searchvalue.coordinates[1];
      longitude = searchvalue.coordinates[0];
    }

    
    var payload = {};
    payload.sectionName = "search";
    payload.lat = latitude;
    payload.lon = longitude;
    payload.findtable = searchtable;
    payload.searchOptions = searchOptions;
    return dispatch => {
      fetch(config.svc + '/getProducts', {
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
        .then(function (data) {
          var searchindex = "";
          if (searchtable == "Hotel"||searchtable == "hotels") {
            searchindex = "hotels"
          }
          if (searchtable == "Place"|| searchtable == "places") {
            searchindex = "places"
          }
          if (searchtable == "Package"||searchtable=="packages") {
            searchindex = "packages"
          }
          var response = data[searchindex];
          var CategoryList = Map(response.reduce(function (previous, current) {
            previous[current._id] = current;
            return previous;
          }, {}));

          dispatch({type: 'SET_CATEGORY_RESULTS', result: CategoryList});
          //  dispatch({ type: 'SET_DEPENDANT', result: map });
        }).catch(function (error) {
        console.log('request failed', error)
      })
    }
  }
  catch (ex) {
  }

}

export function load1() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/test') // params not used, just shown as demonstration
  };
}
export function isLoaded(globalState) {
  promise: ({store: {dispatch, getState}}) => {
    if (!globalState.products.loaded) {
      dispatch({type: 'LOAD'});
      return false;
    }
    else {
      return true;
    }
  }
}

export function setEntries(state, entries) {
  const list = List(entries);
  return state.set('entries', list);
}

function qs(key) {
  var vars = [], hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('/') + 1).split('/');
  for (var i = 0; i < hashes.length; i++) {
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
      const {productId} = action
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

