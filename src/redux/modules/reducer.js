import {combineReducers} from 'redux';
import multireducer from 'multireducer';
import {routerReducer} from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import auth from './auth';
import products from './products';
import detail from './detail';
import blog from './blog';
import cart from './cart';
import category from './category';
import counter from './counter';
import info from './info';
// import widgets from './widgets';
import checkout from './checkout';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  products,
  detail,
  category,
  cart,
	blog,
 // multireducer: multireducer({
 //   counter1: counter,
 //   counter2: counter,
 //   counter3: counter
 // }),
  info,
  // widgets,
  checkout
});
