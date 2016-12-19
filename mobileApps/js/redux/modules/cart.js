const LOAD = 'redux-example/widgets/LOAD';
const LOAD_SUCCESS = 'redux-example/widgets/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/widgets/LOAD_FAIL';
const EDIT_START = 'redux-example/widgets/EDIT_START';
const EDIT_STOP = 'redux-example/widgets/EDIT_STOP';
const SAVE = 'redux-example/widgets/SAVE';
const SAVE_SUCCESS = 'redux-example/widgets/SAVE_SUCCESS';
const SAVE_FAIL = 'redux-example/widgets/SAVE_FAIL';
import {List, Map} from 'immutable';


const initialState = {
  addedIds: [],
  quantityById: {}
}

function addedIds(state = initialState.addedIds, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      if (state.indexOf(action.result._id) !== -1) {
        return state
      }
      return [...state, action.result._id]
    default:
      return state
  }
}

function quantityById(state = initialState.quantityById, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      const {productId} = action.result._id;
      var cart = state.cart;
      if (cart == undefined) {
        cart = [];
      }
      cart.push(action.result);
      return {
        ...state,
        cart
      }
    default:
      return state
  }
}

export default function cart(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const {productId} = action.result._id
      var cart = state.items;
      if (cart == undefined) {
        cart = [];
      }
      cart.push(action.result);
      return {
        ...state,
        items: cart
      }
    }
    case 'CHECKOUT_REQUEST':
      return initialState
    case 'CHECKOUT_FAILURE':
      return action.cart
    default: {
      return state;
    }
  }
}

export function getQuantity(state, productId) {
  return state.quantityById[productId] || 0
}

export function getAddedIds(state) {
  return state.addedIds
}


export function getTotal(state) {
  return getAddedIds(state.cart).reduce((total, id) =>
    total + getProduct(state.products, id).price * getQuantity(state.cart, id),
    0
  ).toFixed(2)
}

export function getCartProducts(state) {
  return getAddedIds(state.cart).map(id => Object.assign(
    {},
    getProduct(state.products, id),
    {
      quantity: getQuantity(state.cart, id)
    }
  ))
}