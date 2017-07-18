import React, {Component} from 'react';
import {CategoryItem, FilterToolbox} from '../../components';
import * as categoryActions from '../../redux/modules/category';
import {connect} from 'react-redux';
var querystring = require('querystring');

var qss = require('querystrings')

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
/*
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
*/
export class Categories extends Component {
   componentWillMount() {
    if(this!= undefined)
    {
         // this.store.dispatch(refreshSection(id, cat));
    }
      var searchtype = qs('searchtype');
  var searchtable = qs('categories');
    var searchvalue = qs('searchOptions');

var sr = qss.parse(searchvalue);
     const parsedresult = querystring.parse(searchvalue);
    try

    {
       this.props.dispatch(categoryActions.getProducts(searchtable, parsedresult));

    }
    catch(ex)
    {
    }
       
  }
  renderCategoryLists(results,that,searchtable)
  {
     var style1 = {
backgroundColor:'ghostwhite',
paddingBottom: '2px'
    };
          var style2 = {
backgroundColor:'floralwhite',
paddingBottom: '2px'
    };
    var categoryItems=[];
      var array =[];
      var i=0;
    if(results)
    {
   categoryItems  = results.map(function(key) {
    var stprop =(i%2==0)?style1:style2;
    i++;
    return (<div style={stprop}><CategoryItem products={key} category={searchtable} dispatch={that.props.dispatch}/></div>)

})
return categoryItems;
    }   
    for(var i=0;i<array.length;i++)
    {
      
      categoryItems.push(<div style={stprop}><CategoryItem products={array[i]} category={searchtable} dispatch={that.props.dispatch}/></div>);
    }
    return categoryItems;
  }


  render() {
    var i=0;
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
        {this.renderCategoryLists(results,that,searchtable)}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Categories);
