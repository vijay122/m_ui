const LOAD = 'redux-example/auth/LOAD';
const LOAD_SUCCESS = 'LOAD_SUCCESS';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOAD_FAIL = 'redux-example/auth/LOAD_FAIL';
const LOGIN = 'redux-example/auth/LOGIN';
const LOGIN_FAIL = 'redux-example/auth/LOGIN_FAIL';
const LOGOUT = 'redux-example/auth/LOGOUT';
const LOGOUT_SUCCESS = 'redux-example/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'redux-example/auth/LOGOUT_FAIL';

import config from '../../config';
import {GetHttpHeaders} from "../../utils/HttpUtils";

import restClient from '../../utils/RestClient';

const initialState = {
  loaded: false
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
        user: action.result,
        token:action.result.token
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        user: action.result,
        loggedIn : true,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: action.error
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        user: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function load() {
  return true;
   return {
   types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
   promise: (client) => client.get('/loadAuth')
   };
}
export function register(user) {
  const payload = {};
  payload.phone_number = user.username;
  payload.supervisor_id = user.supervisor_id;
  payload.name = user.name;
  payload.company = user.companyname;
  payload.role = user.role;
  payload.status = user.status;
  console.log('config: ' + config.svc);
  return dispatch => {
    fetch(config.svc + '/register', {
      method: 'post',
      headers: GetHttpHeaders(),
      body: JSON.stringify({
        payload
      })
    }).then(checkStatus)
      .then(parseJSON)
      .then(function (data) {
      }).catch(function (error) {
      console.log('request failed', error)
    })
  }

}

export function loginUser(phonenumber, password) {
  var payload = {};
  payload.phone_number = phonenumber;
  payload.password = password;
  console.log("config: " + config.svc);
  return dispatch => {
    let url = config.svc + '/login';
    //restClient.post(url,payload)
    
    fetch(config.svc + '/login', {
      method: 'post',
      headers: GetHttpHeaders(),
      body: JSON.stringify({
        payload
      })
    })
.then(checkStatus)
      .then(parseJSON)
      .then(function (data) {
        dispatch({type: 'LOGIN_SUCCESS', result: data});
        localStorage.setItem('jwtToken', data.token);
        //  console.log('request succeeded with JSON response', list)
      }).catch(function (error) {
      console.log('request failed', error)
    })
  }
}

export function disableUser(disableUserId) {
  var payload = {};
  payload.disableUserId = disableUserId;
  console.log("config: " + config.svc);
  return dispatch => {
    fetch(config.svc + '/disableUser', {
      method: 'post',
      headers: GetHttpHeaders(),
      body: JSON.stringify({
        payload
      })
    }).then(checkStatus)
      .then(parseJSON)
      .then(function (data) {
        dispatch({type: 'DISABLE_SUCCESS', result: data});
        //  console.log('request succeeded with JSON response', list)
      }).catch(function (error) {
      console.log('request failed', error)
    })
  }
}

export function login(name) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/login', {
      data: {
        name: name
      }
    })
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => client.get('/logout')
  };
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