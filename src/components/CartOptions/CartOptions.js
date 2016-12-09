import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import Well from 'react-bootstrap/lib/Well';
import React, { Component } from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import { TypeAhead,TravelMap ,CartGrid } from '../../components';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';

import areIntlLocalesSupported from 'intl-locales-supported';

import { push } from 'react-router-redux';

var querystring = require('querystring');


export default class CartOptions extends React.Component
{

  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
    this.onChange = this.onChange.bind(this);
    var that = this;
    this.state={
      eventKey:"table",
      tempprod:["products"],
    };
  }
  serialize = function(obj) {
    var str = [];
    for(var p in obj){
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    }
    return str.join("&");
  }
  onChange(e)
  {
    e.preventDefault();
    this.state[e.currentTarget.attributes["data-ctrlid"].value] = e.currentTarget.value;
  }

  handleSelect= function(key) {
    this.setState({key});
  }

  viewDetails(data,fn,st)
  {
    var searchtable = this.state.key;
    var searchtype =this.refs["searched_id"].props.resultKey;
    var searchvalue ="";
    let result = querystring.stringify(this.refs["searched_id"].state.searchText.resultKey);
    data.props.dispatch(push('/categories:'+searchtable+ '/searchtype:'+searchtype+'/search:'+result));
  }


  render() {
    var that = this;
    const styles = require('./CartOptions.scss');
    let DateTimeFormat;
    var cartItems = this.props.items;
    if (areIntlLocalesSupported(['fr'])) {
      DateTimeFormat = global.Intl.DateTimeFormat;
    } else {
      const IntlPolyfill = require('intl');
      DateTimeFormat = IntlPolyfill.DateTimeFormat;
      require('intl/locale-data/jsonp/fr');
    }
    const style = {
      margin: 12,
    };
    return (
      <Well className={styles.searchPanel}>
        <Row>
          <Col md={12}>
            <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example">
              <Tab eventKey="table" title="Products">
              </Tab>
              <Tab eventKey="map" title="Maps & Routes">
              </Tab>
              <Tab eventKey="calender" title="Calender Itenary">
              </Tab>
            </Tabs>
            <Row>
                {this.state.key=="table" && this.state.tempprod.map(function(x)
                {
                  return( <CartGrid items={cartItems}/>)
                })
                }
            </Row>
            <Row>
                {this.state.key=="map" && this.state.tempprod.map(function(x)
                {

                    return <TravelMap items={cartItems}/>
                })
                }
              </Row>
          </Col>
        </Row>
      </Well>
    );
  }
}