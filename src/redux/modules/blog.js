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
		case 'LOAD_POSTS':
			return {
				...state,
				loading: true
			};
		case 'SET_ALL_POSTS': {
			const allPosts = action.result;
			return {
				...state,
				loading: false,
				loaded: true,
				getPostsResult:allPosts
			}
		}
		case 'SET_CURRENT_POST': {
			const post = action.result;
			return {
				...state,
				loading: false,
				loaded: true,
				currentPost:post
			}
		}

		default:
			return state;
	}
}
export function loadAllPosts() {
	return dispatch => {
		fetch("http://localhost:5000" + '/', {
			method: 'get',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		}).then(checkStatus)
			.then(parseJSON)
			.then(function (data) {
				dispatch({type: 'SET_ALL_POSTS', result: data});
			}).catch(function (error) {
			console.log('request failed', error);
			dispatch(loadAllData("home"));
		})
	}
}
function mapSearchResultForPackage(data)
{
	data.packages[0].latitude = data.packages[0].loc.coordinates[1];
	data.packages[0].longitude = data.packages[0].loc.coordinates[0];
	return data;
}

function mapSearchResultForPlace(data)
{
	data.places[0].latitude = data.places[0].loc.coordinates[1];
	data.places[0].longitude = data.places[0].loc.coordinates[0];
	return data;
}

export function search(sectionName, searchcriteria) {
	console.log("search called:"+JSON.stringify(searchcriteria));
	var payload = {};
	payload.sectionName = sectionName;
	payload.findtable = searchcriteria.findtable;
	payload.searchby = searchcriteria.searchby;
	payload.searchvalue = searchcriteria.searchvalue;
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
				var responsedata ={};
				if(data.searchOn=='places')
					responsedata = mapSearchResultForPlace(data);

				if(data.searchOn=='packages')
				{
					responsedata = mapSearchResultForPackage(data);
				}
				dispatch({type: 'SET_SEARCH_RESULTS', result: responsedata});
				//  console.log('request succeeded with JSON response', list)
			}).catch(function (error) {
			console.log('request failed', error)
		})
	}
}



export function refreshSection(id, category) {// {
	console.log("refreshSection called:"+category);
	var payload = {};
	payload.sectionName = "refresh";//sectionName;
	payload.findtable = category; //searchcriteria.findtable;
	payload.searchby = "_id";// searchcriteria.searchby;
	payload.searchvalue = id;// searchcriteria.searchvalue;
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
				var resultsMap = Map(data[data.searchOn].reduce(function (previous, current) {
					previous[current._id] = current;
					return previous;
				}, {}));
				var res = {};
				res.map = resultsMap;
				res.searchOn = data.searchOn;
				dispatch({type: 'SET_REFRESHED_ENTRIES', result: res});
				//  console.log('request succeeded with JSON response', list)
			}).catch(function (error) {
			console.log('request failed', error)
		})
	}
}


export function loadAllData(sectionName) {
	console.log("loadAllData called:"+sectionName);
	var payload = {};
	payload.sectionName = sectionName;
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

				let Placesmap;

				if(data.places!= undefined)
					Placesmap = Map(data.places.reduce(function (previous, current) {
						previous[current._id] = current;
						return previous;
					}, {}));

				var pkgmap = Map(data.packages.reduce(function (previous, current) {
					previous[current._id] = current;
					return previous;
				}, {}));
				var hotelmap = Map(data.hotels.reduce(function (previous, current) {
					previous[current._id] = current;
					return previous;
				}, {}));

				var eventsmap = Map(data.events.reduce(function (previous, current) {
					previous[current._id] = current;
					return previous;
				}, {}));

				var map = {};
				map.places = Placesmap;
				map.packages = pkgmap;
				map.hotels = hotelmap;
				map.events = eventsmap;
				map.useroffers = data.useroffers;
				dispatch({type: 'SET_ALL_ENTRIES', result: map});
				//  console.log('request succeeded with JSON response', list)
			}).catch(function (error) {
			console.log('request failed', error)
		})
	}
}
export function isProductExistInStore(globalState, postid) {
	if(globalState!= undefined && globalState.blog!= undefined && globalState.blog.getPostsResult!= undefined)
	{
		let postN =  globalState.blog.getPostsResult.posts;
		let postsMap = Map(globalState.blog.getPostsResult.posts.reduce(function (previous, current) {
			previous[current.slug] = current;
			return previous;
		}, {}));
		return postsMap.get(postid);
	}
	else
	{
		return undefined;
	}

}
export function isProductAlreadyLoaded(getProductsResult, prodid, category) {
	if(category=="products")
	{
		category = "places";

		var  Placesmap = Map(getProductsResult[category].reduce(function (previous, current) {
			previous[current._id] = current;
			return previous;
		}, {}));
	}
	if(getProductsResult!= undefined && getProductsResult[category] != undefined)
	{
		var product = Placesmap.get(prodid);
		return product;
	}
	else
	{
		return undefined;
	}

}
export function isLoaded(globalState) {
	if (globalState != undefined && globalState.products != undefined && globalState.products.loaded) {
		return true;
	}
	else {
		return false;
	}
}

export function NavigateToDetail(globalState, id) {
	promise: ({store: {dispatch, getState}}) => {
		if (!globalState.products.loaded) {
			dispatch({type: 'LOAD'});
			data.props.dispatch(push('/detail/id:' + placeid));
			return false;
		}
		else {
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
					dispatch({type: 'DETAIL', result: {id: list}})
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

	return dispatch => {
		//return state.set('current', list);
		return dispatch({type: 'ADD_TO_CART', result: {prd: fn}});
	}
}
//    promise: ({store: {dispatch, getState}}) => {
//return  dispatch({ type: 'DETAIL', result: {}});
export function viewdetail1(state) {
	var s = this;
	var result = qs('id');

	return dispatch => {
		var list = state.get(result);
		//return state.set('current', list);
		return dispatch({type: 'DETAIL', result: {id: list}});
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

