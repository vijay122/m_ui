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

const initialState = {
  count: 0
};


export default function reducer(state = initialState, action = {}) {
 switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
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
      ;
      const newItems = action.result;
      return {
        ...state,
        products: newItems,
      }
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
   //////////   body: JSON.stringify({
     //  email: ''//userData.email'',
       // password: userData.password,
     // }),
    }).then(checkStatus)
  .then(parseJSON)
  .then(function(data) {
    ;
    const list = List(data);
     dispatch({ type: 'SET_ENTRIES', result: data });
  //  dispatch(setEntries(list));
    console.log('request succeeded with JSON response', data)
  }).catch(function(error) {
    console.log('request failed', error)
  })
  }
}

export function save() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post('/test') // params not used, just shown as demonstration
  };
}
export function isLoaded(globalState) {
 // return globalState.widgets && globalState.widgets.loaded;
 ;
 return false;
}



export function saveProduct(product) {
  var input = JSON.stringify(product);
  return dispatch =>
    fetch(config.svc+'/Save', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: input,
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

