import React, { Component } from 'react';
import { Link } from 'react-router';
import { CategoryItem, FilterToolbox } from '../../components';
import config from '../../config';
import Helmet from 'react-helmet';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Grid from 'react-bootstrap/lib/Grid';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import BreadcrumbItem from 'react-bootstrap/lib/BreadcrumbItem';
import Breadcrumb from 'react-bootstrap/lib/Breadcrumb';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem from 'react-bootstrap/lib/NavItem';
import Nav from 'react-bootstrap/lib/Nav';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import Thumbnail from 'react-bootstrap/lib/Thumbnail';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';

import * as categoryActions from '../../redux/modules/category';
import {isLoaded, load as load, viewdetail} from '../../redux/modules/products';
import { asyncConnect } from 'redux-async-connect';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
  console.log('state '+state);
 
  return { products: state.category.getCategoryResult, detail: state.detail }
}
function qs(key) {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('/') + 1).split('/');
    for(var i = 0; i < hashes.length; i++)
    {
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
      var searchtable = qs('categories');
      var searchtype= qs('searchtype');
   var searchvalue = qs('search')
    return  dispatch (categoryActions.getProducts(searchtable,searchtype,searchvalue));
    //if (!isLoaded(getState())) {
    //  return dispatch(load());
   // }
  }
}])

export class Categories extends Component {
  componentDidMount(){
}
  render() {
    debugger;
var that = this;
    var results;
    if(this.props!= null && this.props.products!= null )
    results = this.props.products;
    return (
      <div className="container">
         <FilterToolbox />
         {results!= undefined && results.map(function(item)

{
  return(<div>
      <CategoryItem products ={item} dispatch={that.props.dispatch}/>
      <hr />
    </div>)  

})
       }
         
        
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
