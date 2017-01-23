import React, {Component} from 'react';
import {CategoryItem, FilterToolbox} from '../../components';
import * as categoryActions from '../../redux/modules/category';
import {asyncConnect} from 'redux-async-connect';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

function mapStateToProps(state) {
  console.log('state ' + state);
  return {products: state.category.getCategoryResult, searchoptions: state.category.categorysearch}
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
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, categoryActions), dispatch)
}

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    var currentState = getState();
    var searchState = currentState.category.categorysearch;
    var searchtable = searchState.searchon;
    var searchtype = searchState.searchby;
    var searchvalue = searchState.search;
    return dispatch(categoryActions.getProducts(searchtable, searchtype, searchvalue));
    //if (!isLoaded(getState())) {
    //  return dispatch(load());
    // }
  }
}])

export class Categories extends Component {
  componentDidMount() {
  }

  render() {
   let searchtable;
      if(this.props.searchoptions!= null)
      {
      if(this.props.searchoptions.searchon=="Hotel")
       searchtable =   "hotels";
        if(this.props.searchoptions.searchon=="Package")
       searchtable =   "packages";
      
       if(this.props.searchoptions.searchon=="Event")
       searchtable =   "events";
      
       if(this.props.searchoptions.searchon=="Place")
       searchtable =   "products";
      }
    var that = this;
    var results;
    if (this.props != null && this.props.products != null)
      results = this.props.products;
    return (
      <div className="container">
        <FilterToolbox />
        {results != undefined && results.map(function (item) {
          return (<div>
            <CategoryItem products={item} category={searchtable} dispatch={that.props.dispatch}/>
            <hr />
          </div>)

        })
        }


      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
