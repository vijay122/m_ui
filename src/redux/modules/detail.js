const LOAD = 'redux-example/widgets/LOAD';
const LOAD_SUCCESS = 'redux-example/widgets/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/widgets/LOAD_FAIL';
const EDIT_START = 'redux-example/widgets/EDIT_START';
const EDIT_STOP = 'redux-example/widgets/EDIT_STOP';
const SAVE = 'redux-example/widgets/SAVE';
const SAVE_SUCCESS = 'redux-example/widgets/SAVE_SUCCESS';
const SAVE_FAIL = 'redux-example/widgets/SAVE_FAIL';
import {List, Map} from 'immutable';
import {GetHttpHeaders} from "../../utils/HttpUtils";

import config from '../../config';
import fetch from 'better-fetch';

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
    case 'SET_DETAIL':
      return {
        ...state,
        detail: action.result,
      };
    case 'LOAD_DEPENDANT':
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
    case 'SET_DEPENDANT':
      const newItems = action.result;
      return {
        ...state,
        loading: false,
        loaded: true,
        getProductsResult: newItems,
      }
    case 'VIEW_MORE':
      console.log("View More");
      return {
        // ...state.cart.pop()
        // ...state.cart.filter(product._id => action.result.prd._id !=== product._id)
      }
    case 'REMOVE_TO_CART':
      console.log("removed ADD");
      return {
        // ...state.cart.pop()
        // ...state.cart.filter(product._id => action.result.prd._id !=== product._id)
      }
    case 'UPDATE_NEARBY':
      return {
        ...state,
        nearby: action.result
      }
    case 'ADDITIONAL_ITEMS':
      return {
        ...state,
        additionalServices: action.result
      }



    // here is my problem
    // return setEntries(...state,action.result);

    default:
      return state;
  }
}

Array.prototype.unique = function () {
  var a = this.concat();
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j])
        a.splice(j--, 1);
    }
  }

  return a;
};

export function viewMore(product, type) {
  return dispatch => {
    fetch(config.svc + '/viewmore', {
      method: 'post',
     headers: GetHttpHeaders(),
      body: JSON.stringify({
        table: 'places',
        product: product
      })
    }).then(checkStatus)
      .then(parseJSON)
      .then(function (data) {

        dispatch({type: 'UPDATE_NEARBY', result: data});
        //  console.log('request succeeded with JSON response', list)
      }).catch(function (error) {
      console.log('request failed', error)
    })
  }
}
export function getProducts(product) {
   console.log("getProducts detail page called:"+JSON.stringify(product));
  var payload = {};
  payload.sectionName = "detail";
  payload.lat = product.loc!= undefined ?product.loc.coordinates[1]:'';
  payload.lon = product.loc!= undefined ?product.loc.coordinates[0]:'';
  payload.max = "100";
  return dispatch => {
    fetch(config.svc + '/getProducts', {
      method: 'post',
    headers: GetHttpHeaders(),
      body: JSON.stringify({
        payload
      })
    }).then(checkStatus)
      .then(parseJSON)
      .then(function (data) {
        var Packagesmap, Eventsmap, Hotelsmap, Placemap = {};
        if (data.places != undefined && data.places.length > 0) {

          Placemap = Map(data.places.reduce(function (previous, current) {
            previous[current._id] = current;
            return previous;
          }, {}));
        }
        if (data.packages != undefined && data.packages.length > 0) {

          Packagesmap = Map(data.packages.reduce(function (previous, current) {
            previous[current._id] = current;
            return previous;
          }, {}));
        }
        if (data.events != undefined && data.events.length > 0) {
          Eventsmap = Map(data.events.reduce(function (previous, current) {
            previous[current._id] = current;
            return previous;
          }, {}));
        }
        if (data.hotels != undefined && data.hotels.length > 0) {
          Hotelsmap = Map(data.hotels.reduce(function (previous, current) {
            previous[current._id] = current;
            return previous;
          }, {}));
        }
        var map = {};
//map.place=data.place;
        map.packages = Packagesmap;
        map.events = Eventsmap;
        map.hotels = Hotelsmap;
        map.places = data.places;
        dispatch({type: 'SET_DEPENDANT', result: map});
      }).catch(function (error) {
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

export function callBack(callbackinfo) {
  return dispatch => {
    fetch(config.svc + '/getCallBack', {
      method: 'post',
     headers: GetHttpHeaders(),
      body: JSON.stringify({
      payload: callbackinfo
      })
    }).then(checkStatus)
      .then(parseJSON)
      .then(function (data) {

        dispatch({type: 'CALLBACK_NOTIFIED', result: data});
        //  console.log('request succeeded with JSON response', list)
      }).catch(function (error) {
      console.log('request failed', error)
    })
  }
}

export function additionalServices(additionalinfo) {
  return dispatch => {
    fetch(config.svc + '/getAdditionalServices', {
      method: 'post',
     headers: GetHttpHeaders(),
      body: JSON.stringify({
      payload: additionalinfo
      })
    }).then(checkStatus)
      .then(parseJSON)
      .then(function (data) {

        dispatch({type: 'ADDITIONAL_ITEMS', result: data});
        //  console.log('request succeeded with JSON response', list)
      }).catch(function (error) {
      console.log('request failed', error)
    })
  }
}

