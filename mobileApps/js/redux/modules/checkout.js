import config from '../../config';

const initialState = {
  count: 0
};


export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "SUBMIT":
      return {
        ...state,
        loading: true
      };
    case "SUBMIT_SUCCESS":
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      };
    case "SUBMIT_FAIL":
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };
    // return setEntries(...state,action.result);

    default:
      return state;
  }
}

export function submitOrder(cart) {
  var payload = {};
  payload.products = cart;
  return dispatch =>
    fetch(config.svc + '/submitOrder', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        payload
      })
    })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          console.log(response);
          //  dispatch(setEntries(response));
        } else {
          const error = new Error(response.statusText);
          error.response = response;
          //dispatch(loginError(error));
          throw error;
        }
      })
      .catch(error => {
        console.log('request failed', error);
      });
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

